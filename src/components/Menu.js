import { Fragment } from "react";
import { useLocation } from "react-router-dom";

const Menu = () => {
  const pathName = useLocation().pathname;

  return (
    <Fragment>
      <nav className="menu">
        <ul>
          <li className={pathName === "/" ? "active menu-home" : "menu-home"} onClick={() => (window.location.href = "/")}>
            <span>Home</span>
          </li>
          <li className={pathName === "/medicine" ? "active menu-med" : "menu-med"} onClick={() => (window.location.href = "/medicine")}>
            <span>Medicine</span>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Menu;
