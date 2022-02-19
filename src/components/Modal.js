import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ open, close, removeItem, removeAllItem }) => {
  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
          <FontAwesomeIcon icon={faCircleMinus} /> 예정 삭제
            <button className="close" onClick={close}>
              X
            </button>
          </header>
          <main>
            삭제 옵션을 선택하세요
            <br />
            <br />
            개별 삭제: 선택한 예정만 삭제합니다.
            <br />
            일괄 삭제: 선택한 예정과 관련된 모든 예정이 삭제됩니다.
          </main>
          <footer className="remove-footer">
            <button onClick={removeItem}>개별 삭제</button>
            <button onClick={removeAllItem}>일괄 삭제</button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
