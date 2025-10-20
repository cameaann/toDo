import { useContext, useEffect, useState } from "react";
import { type TTask } from "../utils";
import ToDoItem from "./ToDoItem";
import ToDoForm from "./todoForm";
import ThemeContext from "../ThemeContext";
import Filter from "./Filter";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { triggerPostMoveFlash } from "@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash";
import { flushSync } from "react-dom";
import { isTaskData } from "../utils";

export type toDoListProps = {
  toDoList: TTask[];
};

const ToDoList = ({ toDoList }: toDoListProps) => {
  const [listItems, setListItems] = useState<TTask[]>(toDoList || []);
  const [filter, setFilter] = useState<string>("all");

  const theme = useContext(ThemeContext);

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return isTaskData(source.data);
      },
      onDrop({ location, source }) {
        console.debug("monitor onDrop", { location, source });
        const target = location.current.dropTargets[0];
        if (!target) return;

        const sourceData = source.data;
        const targetData = target.data;

        if (!isTaskData(sourceData) || !isTaskData(targetData)) return;

        const indexOfSource = listItems.findIndex(
          (item) => item.id === sourceData.taskId
        );
        const indexOfTarget = listItems.findIndex(
          (item) => item.id === targetData.taskId
        );

        if (indexOfSource < 0 || indexOfTarget < 0) return;

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        flushSync(() => {
          setListItems(
            reorderWithEdge({
              list: listItems,
              startIndex: indexOfSource,
              indexOfTarget,
              closestEdgeOfTarget,
              axis: "vertical",
            })
          );
        });

        const element = document.querySelector(
          `[data-task-id='${sourceData.taskId}']`
        );
        if (element instanceof HTMLElement) {
          triggerPostMoveFlash(element);
        }
      },
    });
  }, [listItems]);

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(listItems));
  }, [listItems]);

  const addToDo = (item: TTask) => {
    setListItems((prev) => [...prev, item]);
  };

  const handleDelete = (id: string) => {
    const modifiedList = listItems.filter((item) => item.id !== id);
    setListItems(modifiedList);
  };

  const toggleStatus = (id: string) => {
    const modifiedList = listItems.map((item) => {
      if (item.id === id) {
        item.status = item.status === "done" ? "todo" : "done";
      }
      return item;
    });
    setListItems(modifiedList);
  };

  const filterItems = (status: string) => {
    switch (status) {
      case "all":
        return listItems;
      case "completed":
        return listItems.filter((item) => item.status === "done");
      case "active":
        return listItems.filter(
          (item) => item.status === "in-progress" || item.status === "todo"
        );
      default:
        return listItems;
    }
  };

  const itemsLeft = listItems.filter(
    (item) => item.status === "todo" || item.status === "in-progress"
  ).length;

  const filteredItems = filterItems(filter);

  const clearCompleted = () => {
    const modifiedList = listItems.filter((item) => item.status !== "done");
    setListItems(modifiedList);
  };

  return (
    <>
      <ToDoForm addItem={addToDo} />
      <ul className={"todoList " + theme}>
        {filteredItems.map((item) => (
          <ToDoItem
            key={item.id}
            toDo={item}
            onDelete={handleDelete}
            toggleStatus={toggleStatus}
          />
        ))}
        <Filter
          filter={filter}
          setFilter={setFilter}
          itemsLeft={itemsLeft}
          clearCompleted={clearCompleted}
        />
      </ul>
    </>
  );
};

export default ToDoList;
