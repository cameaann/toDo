import { useContext } from "react";
import ThemeContext from "../ThemeContext";
import Cross from "../assets/icon-cross.svg";

export type ToDo = {
  id: number | string;
  text: string;
  status: "pending" | "completed";
};
type ToDoItemProps = {
  toDo: ToDo;
  toggleStatus: (id: number | string) => void;
  onDelete: (id: number | string) => void;
};

const ToDoItem = ({ toDo, toggleStatus, onDelete }: ToDoItemProps) => {
  const theme = useContext(ThemeContext);
  console.log(toDo);
  return (
    <li className={"todo " + theme} key={toDo.id}>
      <div>
        <input
          type="checkbox"
          checked={toDo.status === "completed"}
          onChange={() => toggleStatus(toDo.id)}
        />
        <span className={toDo.status === "completed" ? "completed" : ""}>
          {toDo.text}
        </span>
      </div>

      <button className="deleteBtn" onClick={() => onDelete(toDo.id)}>
        <img className="cross" src={Cross} />
      </button>
    </li>
  );
};

export default ToDoItem;
