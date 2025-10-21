import { useContext, useRef } from "react";
import ThemeContext from "../ThemeContext";
import Cross from "../assets/icon-cross.svg";
import { type TTask } from "../utils";


type ToDoItemProps = {
  toDo: TTask;
  toggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
};


const ToDoItem = ({ toDo, toggleStatus, onDelete }: ToDoItemProps) => {
  const theme = useContext(ThemeContext);
  const ref = useRef<HTMLLIElement | null>(null);

  return (
    <>
      <li
        ref={ref}
        className={"todo line " + theme}
        key={toDo.id}
        data-task-id={toDo.id}
      >
        <div>
          <input
            className={theme}
            type="checkbox"
            id={toDo.id.toString()}
            name={toDo.text}
            checked={toDo.status === "done"}
            onChange={() => toggleStatus(toDo.id)}
          />
          <label
            htmlFor={toDo.id.toString()}
            className={toDo.status === "done" ? "completed" : ""}
          >
            {toDo.text}
          </label>
        </div>

        <button
          id={toDo.id}
          className="deleteBtn"
          onClick={() => onDelete(toDo.id)}
        >
          <img className="cross" src={Cross} />
        </button>

      </li>

    </>
  );
};

export default ToDoItem;
