import { useContext, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ThemeContext from "../ThemeContext";
import Cross from "../assets/icon-cross.svg";
import { isTaskData, type TTask } from "../utils";
import {
  attachClosestEdge,
  extractClosestEdge,
  type Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import invariant from "tiny-invariant";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { pointerOutsideOfPreview } from "@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview";

type TaskState =
  | {
      type: "idle";
    }
  | {
      type: "preview";
      container: HTMLElement;
    }
  | {
      type: "is-dragging";
    }
  | {
      type: "is-dragging-over";
      closestEdge: Edge | null;
    };

type ToDoItemProps = {
  toDo: TTask;
  toggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
};
const idle: TaskState = { type: "idle" };

const ToDoItem = ({ toDo, toggleStatus, onDelete }: ToDoItemProps) => {
  const theme = useContext(ThemeContext);
  const ref = useRef<HTMLLIElement | null>(null);
  const [state, setState] = useState<TaskState>(idle);

  useEffect(() => {
    const element = ref.current;
    invariant(element);
    return combine(
      draggable({
        element,
        getInitialData() {
          return { taskId: toDo.id, [Symbol.for("task")]: true };
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: "16px",
              y: "8px",
            }),
            render({ container }) {
              setState({ type: "preview", container });
            },
          });
        },

        onDragStart() {
          setState({ type: "is-dragging" });
        },
        onDrop() {
          setState(idle);
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          if (source.element === element) return false;
          return isTaskData(source.data);
        },
        getData({ input }) {
          const data = { taskId: toDo.id, [Symbol.for("task")]: true };
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ["top", "bottom"],
          });
        },
        getIsSticky() {
          return true;
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState({ type: "is-dragging-over", closestEdge });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);

          setState((current) => {
            if (
              current.type === "is-dragging-over" &&
              current.closestEdge === closestEdge
            ) {
              return current;
            }
            return { type: "is-dragging-over", closestEdge };
          });
        },
        onDragLeave() {
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      })
    );
  }, [toDo]);

  return (
    <>
      <li ref={ref} className={"todo " + theme} key={toDo.id} data-task-id={toDo.id}>
        <div>
          <input
            className={theme}
            type="checkbox"
            id={toDo.id.toString()}
            name={toDo.text}
            checked={toDo.status === "done"}
            onChange={() => toggleStatus(toDo.id)}
          />
        <label htmlFor={toDo.id.toString()} className={toDo.status === "done" ? "completed" : ""}>
            {toDo.text}
          </label>
        </div>

        <button className="deleteBtn" onClick={() => onDelete(toDo.id)}>
          <img className="cross" src={Cross} />
        </button>
      </li>

      {state.type === "preview"
        ? createPortal(<DragPreview task={toDo} />, state.container)
        : null}
    </>
  );
};

function DragPreview({ task }: { task: TTask }) {
  return <div className="border-solid rounded p-2 bg-white">{task.text}</div>;
}

export default ToDoItem;
