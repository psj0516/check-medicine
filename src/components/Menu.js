import { Fragment } from "react";
import { useLocation } from "react-router-dom";

const Menu = () => {
  const pathName = useLocation().pathname;

  return (
    <Fragment>
      <nav className="menu">
        <ul>
          <li className={pathName === "/home" ? "active menu-home" : "menu-home"} onClick={() => (window.location.href = "/home")}>
            <span>나의 목록</span>
          </li>
          <li className={pathName === "/medicine" ? "active menu-med" : "menu-med"} onClick={() => (window.location.href = "/medicine")}>
            <span>의약품 정보</span>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Menu;
