import { useDroppable } from "@dnd-kit/core";

const Droppable = (props: { children: React.ReactNode; id: string }) => {
  const {setNodeRef} = useDroppable({
    id: props.id,
  });

  return (
    <div className="todo-wrapper" ref={setNodeRef}>
      {props.children}
    </div>
  );
}

export default Droppable;
