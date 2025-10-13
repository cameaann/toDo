import { useContext } from "react";
import IconMoon from "../assets/icon-moon.svg";
import IconSun from "../assets/icon-sun.svg";
import ThemeContext from "../ThemeContext";

type headerProps = {
  toggleTheme: () => void;
};

const Header = ({ toggleTheme }: headerProps) => {
  const theme = useContext(ThemeContext);
  const switchIcon = theme === "light" ? IconMoon : IconSun;
  return (
    <>
      <div className="header">
        <h1>Todo</h1>
        <button className="switchBtn" onClick={toggleTheme}>
          <img src={switchIcon} />
        </button>
      </div>
    </>
  );
};

export default Header;
