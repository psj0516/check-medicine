import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const Alert = ({ open, close, title }) => {
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
          <FontAwesomeIcon icon={faTriangleExclamation} /> 경고!
            <button className="close" onClick={close}>
              X
            </button>
          </header>
          <main>{title} 을(를) 입력하세요.</main>
          <footer className="alert-footer">
            <button onClick={close}>확인</button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Alert;
