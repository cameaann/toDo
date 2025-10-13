import { useContext, useEffect, useState } from "react";
import type { ToDo } from "./ToDoItem";
import ToDoItem from "./ToDoItem";
import ToDoForm from "./todoForm";
import ThemeContext from "../ThemeContext";
import Filter from "./Filter";

export type toDoListProps = {
  toDoList: ToDo[];
};

const ToDoList = ({ toDoList }: toDoListProps) => {
  const [listItems, setListItems] = useState<ToDo[]>(toDoList || []);
  const [filter, setFilter] = useState<string>("all");

  const theme = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(listItems));
  }, [listItems]);

  const addToDo = (item: ToDo) => {
    setListItems((prev) => [...prev, item]);
  };

  const handleDelete = (id: string | number) => {
    const modifiedList = listItems.filter((item) => item.id !== id);
    setListItems(modifiedList);
  };

  const toggleStatus = (id: string | number) => {
    const modifiedList = listItems.map((item) => {
      if (item.id === id) {
        item.status = item.status === "completed" ? "pending" : "completed";
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
        return listItems.filter((item) => item.status === "completed");
      case "active":
        return listItems.filter((item) => item.status === "pending");
      default:
        return listItems;
    }
  };

  const itemsLeft = listItems.filter((item) => item.status === "pending").length;

  const filteredItems = filterItems(filter);

  const clearCompleted = () => {
    const modifiedList = listItems.filter((item) => item.status !== "completed");
    setListItems(modifiedList);
  }

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
       <Filter setFilter={setFilter} itemsLeft={itemsLeft} clearCompleted={clearCompleted} />
      </ul>
    </>
  );
};

export default ToDoList;
