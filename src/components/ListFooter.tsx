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
    <div className={"todo filter " + theme}>
      <span className={theme}>{itemsLeft} items left</span>
      <div className={"desktop-filter " + theme}>
        <Filter filter={filter} setFilter={setFilter} />
      </div>
      <button
        className={"filterButton clear " + theme}
        onClick={() => clearCompleted()}
      >
        Clear completed
      </button>
    </div>
  );
};

export default ListFooter;
