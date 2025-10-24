import { useContext, useState, useRef, useEffect } from "react";
import ThemeContext from "../ThemeContext";
import Cross from "../assets/icon-cross.svg";
import { type TTask } from "../utils";
import { useDraggable } from "@dnd-kit/core";
import { useDebounce } from "../useDebounce";


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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(toDo.text);
  const ref = useRef<HTMLTextAreaElement>(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: toDo.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const setEdit = (mode: boolean, text: string) => {
    setEditMode(mode);
    setEditedText(text);
  };

  const unsetEditMode = () => {
    console.log("OnBlur");
    setEditMode(false);
    setEditedText("");
  }

  const debounceSave = useDebounce(() => {
    toDo.text = editedText;
    saveChanges(toDo);
  }, 500);

  const editToDo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setEditedText(value);
    debounceSave();
  };

  const handleInput = () => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

    useEffect(() => {
    if (editMode) handleInput();
  }, [editMode]);

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
            className={"item " + theme}
            type="checkbox"
            name={toDo.text}
            checked={toDo.status === "done"}
            onChange={() => toggleStatus(toDo.id)}
          />
          <div className="content">
            {editMode ? (
              <textarea
                id={toDo.id}
                ref={ref}
                className={
                  toDo.status === "done"
                    ? "edit-input completed " + theme
                    : "edit-input " + theme
                }
                value={editedText}
                onChange={(e) => editToDo(e)}
                onBlur={() => unsetEditMode()}
              ></textarea>
            ) : (
              <label
                className={toDo.status === "done" ? "completed" : ""}
                onClick={() => setEdit(true, toDo.text)}
              >
                {toDo.text}
              </label>
            )}
          </div>
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
