import { useContext, useState, useCallback, useRef, useEffect } from "react";
import ThemeContext from "../ThemeContext";
import { useDebounce } from "../useDebounce";
import type { TTask } from "../utils";

type ToDoItemContentProps = {
  toDo: TTask;
  saveChanges: (toDo: TTask) => void;
};

const ToDoItemContent = ({ toDo, saveChanges }: ToDoItemContentProps) => {
  const theme = useContext(ThemeContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(toDo.text);
  const ref = useRef<HTMLTextAreaElement>(null);
  const setEdit = (mode: boolean, text: string) => {
    setEditMode(mode);
    setEditedText(text);
  };

  const unsetEditMode = useCallback(() => {
    toDo.text = editedText;
    saveChanges(toDo);
    setEditMode(false);
    setEditedText(toDo.text);
  }, [editedText, saveChanges, toDo]);

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
      ref.current.style.height = "0px";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (editMode) {
      handleInput();
        if (ref.current) ref.current.focus();
    }
  }, [editMode, editedText]);

  return (
    <div className="content">
      {editMode ? (
        <textarea
          id={toDo.id}
          rows={1}
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
  );
};

export default ToDoItemContent;
