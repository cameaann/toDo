import { useContext, useEffect, useState } from "react";
import { type TTask } from "../utils";
import ToDoItem from "./ToDoItem";
import ToDoForm from "./todoForm";
import ThemeContext from "../ThemeContext";
import Filter from "./Filter";


export type toDoListProps = {
  toDoList: TTask[];
};

const ToDoList = ({ toDoList }: toDoListProps) => {
  const [listItems, setListItems] = useState<TTask[]>(toDoList || []);
  const [filter, setFilter] = useState<string>("all");

  const theme = useContext(ThemeContext);

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
