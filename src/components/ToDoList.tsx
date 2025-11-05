import { useContext, useEffect, useState } from "react";
import { type TTask } from "../utils";
import ToDoItem from "./ToDoItem";
import ToDoForm from "./todoForm";
import ThemeContext from "../ThemeContext";
import {
  DndContext,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ListFooter from "./ListFooter";
import Filter from "./Filter";

export type toDoListProps = {
  toDoList: TTask[];
};

const ToDoList = ({ toDoList }: toDoListProps) => {
  const [listItems, setListItems] = useState<TTask[]>(toDoList || []);
  const [filter, setFilter] = useState<string>("all");

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Drag only starts after moving 5px
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // wait 150ms before drag starts
        tolerance: 5, // move 5px before it's considered a drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over === null) return;

    if (active.id !== over.id) {
      setListItems((prev) => {
        const oldIndex = prev.findIndex((t) => t.id === active.id);
        const newIndex = prev.findIndex((t) => t.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
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

  const saveChanges = (updatedItem: TTask) => {
    const modifiedList = listItems.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    setListItems(modifiedList);
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={filteredItems}
          strategy={verticalListSortingStrategy}
        >
          <ToDoForm addItem={addToDo} />
          <div className="todoListWrap">
            <ul className={"todoList " + theme}>
              {filteredItems.map((item) => (
                <ToDoItem
                  key={item.id}
                  toDo={item}
                  onDelete={handleDelete}
                  toggleStatus={toggleStatus}
                  saveChanges={saveChanges}
                />
              ))}
            </ul>
            <ListFooter
              filter={filter}
              setFilter={setFilter}
              itemsLeft={itemsLeft}
              clearCompleted={clearCompleted}
            />
          </div>

          <div className={`mobile-filter ${theme}`}>
            <Filter filter={filter} setFilter={setFilter} />
          </div>
          <p className="hint-message">Drag and drop to reoder list</p>

        </SortableContext>
      </DndContext>
    </>
  );
};

export default ToDoList;
