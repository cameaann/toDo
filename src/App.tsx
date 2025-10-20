import "./App.css";
import { useEffect, useState } from "react";
import todoItems from "./todoItems.json";
import ToDoList from "./components/ToDoList";
import { type toDoListProps } from "./components/ToDoList";
import ThemeContext from "./ThemeContext";
import Header from "./components/Header";

function App() {
  const listItems = localStorage.getItem("toDoList");
  const [toDoList] = useState<toDoListProps["toDoList"]>(
    listItems ? JSON.parse(listItems) : todoItems.list
  );
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme ?? "light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <div className={"wrap-container " + theme}>
          <div className="container">
            <Header toggleTheme={toggleTheme} />
            <ToDoList toDoList={toDoList} />
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
