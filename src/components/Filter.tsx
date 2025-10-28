import { useContext } from "react";
import ThemeContext from "../ThemeContext";

type filterProps = {
  setFilter: (filter: string) => void;
  filter: string;
};

const Filter = ({filter, setFilter}: filterProps) => {
	const theme = useContext(ThemeContext);
	const cssClass = (val: string) => "filterButton " + theme + (filter === val ? " active" : "");
  return (
    <div className="center">
      <button className={cssClass("all")} onClick={() => setFilter("all")}>
        All
      </button>
      <button
        className={cssClass("active")}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={cssClass("completed")}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
};
export default Filter;
