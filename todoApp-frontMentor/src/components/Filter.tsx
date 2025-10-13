import { useContext } from "react";
import ThemeContext from "../ThemeContext";

type filterProps = {
  itemsLeft?: number;
  setFilter: (filter: string) => void;
  clearCompleted: () => void;
};

const Filter = ({ itemsLeft, setFilter, clearCompleted }: filterProps) => {
  const theme = useContext(ThemeContext);
  return (
    <li className="todo filter">
      <span className={theme}>{itemsLeft} items left</span>
      <div>
        <button className={"filterButton " + theme} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={"filterButton " + theme} onClick={() => setFilter("active")}>
          Active
        </button>
        <button className={"filterButton " + theme} onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>
      <button className={"filterButton " + theme} onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </li>
  );
};

export default Filter;
