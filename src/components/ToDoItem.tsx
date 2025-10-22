import { useContext } from "react";
import ThemeContext from "../ThemeContext";
import Cross from "../assets/icon-cross.svg";
import { type TTask } from "../utils";
import { useDraggable } from "@dnd-kit/core";

type ToDoItemProps = {
  toDo: TTask;
  toggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
};

const ToDoItem = ({ toDo, toggleStatus, onDelete }: ToDoItemProps) => {
  const theme = useContext(ThemeContext);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: toDo.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <>
      <li
        ref={setNodeRef}
        style={style}
        className={"todo line " + theme}
        key={toDo.id}
        data-task-id={toDo.id}
      >
        <div {...listeners} {...attributes} className="drag-handle">
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
