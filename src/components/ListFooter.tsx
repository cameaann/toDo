import { useContext } from "react";
import ThemeContext from "../ThemeContext";
import Filter from "./Filter";

type footerProps = {
  itemsLeft?: number;
  setFilter: (filter: string) => void;
  filter: string;
  clearCompleted: () => void;
};

const ListFooter = ({
  itemsLeft,
  filter,
  setFilter,
  clearCompleted,
}: footerProps) => {
  const theme = useContext(ThemeContext);

  return (
    <li className="todo filter">
      <span className={theme}>{itemsLeft} items left</span>
      <div className="desktop-filter">
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      <button
        className={"filterButton clear " + theme}
        onClick={() => clearCompleted()}
      >
        Clear completed
      </button>
    </li>
  );
};

export default ListFooter;
