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
      <header className="header">
        <h1>Todo</h1>
        <button className="switchBtn" aria-label="Switch theme" onClick={toggleTheme}>
          <img src={switchIcon} alt={theme === "light" ? "moon" : "sun"} />
        </button>
      </header>
    </>
  );
};

export default Header;
