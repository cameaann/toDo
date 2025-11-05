import {
  useContext,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { type TTask } from "../utils";
import ThemeContext from "../ThemeContext";
import { nanoid } from 'nanoid';

type ToDoFormProps = {
  addItem: (item: TTask) => void;
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
      const item: TTask = {
        id: nanoid(),
        text: toDo,
        status: "todo",
      };
      addItem(item);
      setToDo("");
    }
  };
  return (
    <form>
      <input
        type="text"
        className={"todoInput " + theme}
        id="createTask"
        value={toDo}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        placeholder="Create a new todo"
      />
    </form>
  );
};

export default ToDoForm;
