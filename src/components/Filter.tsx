import { useContext } from "react";
import ThemeContext from "../ThemeContext";

type filterProps = {
  itemsLeft?: number;
  setFilter: (filter: string) => void;
  filter: string;
  clearCompleted: () => void;
};

const Filter = ({ itemsLeft, filter, setFilter, clearCompleted }: filterProps) => {

  const theme = useContext(ThemeContext);

  const cssClass = (val: string) => "filterButton " + theme + (filter === val ? " active" : "");

  console.log("class", cssClass('all'));
  return (
    <li className="todo filter">
      <span className={theme}>{itemsLeft} items left</span>
      <div>
        <button className={cssClass("all")} onClick={() => setFilter("all")}>
          All
        </button>
        <button className={cssClass("active")} onClick={() => setFilter("active")}>
          Active
        </button>
        <button className={cssClass("completed")} onClick={() => setFilter("completed")}>
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
