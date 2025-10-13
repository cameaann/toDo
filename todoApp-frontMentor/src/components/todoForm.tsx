import {
  useContext,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { type ToDo } from "./ToDoItem";
import ThemeContext from "../ThemeContext";

type ToDoFormProps = {
  addItem: (item: ToDo) => void;
};

const ToDoForm = ({ addItem }: ToDoFormProps) => {
  const theme = useContext(ThemeContext);
  const [toDo, setToDo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setToDo(value);
  };
  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && toDo.trim() !== "") {
      const item: ToDo = { id: Date.now(), text: toDo, status: "pending" };
      addItem(item);
      setToDo("");
    }
  };
  return (
    <form>
      <input
        className={"todoInput " + theme}
        value={toDo}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        placeholder="Create a new todo"
      />
    </form>
  );
};

export default ToDoForm;
