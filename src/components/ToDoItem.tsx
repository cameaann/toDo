import { useContext } from "react";
import ThemeContext from "../ThemeContext";
import Cross from "../assets/icon-cross.svg";
import { type TTask } from "../utils";
import { useDraggable } from "@dnd-kit/core";
import ToDoItemContent from "./ToDoItemContent";

type ToDoItemProps = {
  toDo: TTask;
  toggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  saveChanges: (toDo: TTask) => void;
};

const ToDoItem = ({
  toDo,
  toggleStatus,
  onDelete,
  saveChanges,
}: ToDoItemProps) => {
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
      <div
        ref={setNodeRef}
        style={style}
        className={"todo line " + theme}
        key={toDo.id}
        data-task-id={toDo.id}
      >
        <div {...listeners} {...attributes} className="drag-handle">
          <input
            className={"item " + theme}
            type="checkbox"
            name={toDo.text}
            checked={toDo.status === "done"}
            aria-label={"check " + toDo.text}
            onChange={() => toggleStatus(toDo.id)}
          />
          <ToDoItemContent toDo={toDo} saveChanges={saveChanges} />
        </div>

        <button
          id={toDo.id}
          className="deleteBtn"
          onClick={() => onDelete(toDo.id)}
        >
          <img className="cross" src={Cross} />
        </button>
      </div>
    </>
  );
};

export default ToDoItem;
