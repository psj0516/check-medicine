import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitMedical, faCheck, faCapsules, faTablets, faPills, faMortarPestle, faPrescriptionBottleMedical } from "@fortawesome/free-solid-svg-icons";

const Header = ({ userName, editingUser, editToggle, editUser, medList }) => {
  const [total, setTotal] = useState(0);
  const [pres, setPres] = useState(0);
  const [otc, setOtc] = useState(0);
  const [nut, setNut] = useState(0);
  const [ori, setOri] = useState(0);
  const [etc, setEtc] = useState(0);

  useEffect(() => {
    classify(medList);
  }, [medList]);

  const classify = (medList) => {
    setTotal(medList.length);
    setPres(medList.filter((item) => "처방약" === item.category).length);
    setOtc(medList.filter((item) => "일반약" === item.category).length);
    setNut(medList.filter((item) => "영양제" === item.category).length);
    setOri(medList.filter((item) => "한약" === item.category).length);
    setEtc(medList.filter((item) => "기타" === item.category).length);
  };

  return (
    <div className="header">
      <div className="user-name">
        {editingUser ? (
          <div className="name-box">
            <span className="bold" onClick={editToggle}>
              {userName}
            </span>
            <span>님의 목록</span>
          </div>
        ) : (
          <div className="name-box">
            <form onSubmit={editUser}>
              <input type="text" name="user" maxLength="8" defaultValue={userName} />
              <button>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="user-info">
        <FontAwesomeIcon icon={faKitMedical} size="3x" color="#f0972d" className="icon" />
        <div className="user-total">
          <span>총&nbsp;</span> <span className="bold">{total}건</span> <span>의 예정</span>
        </div>
      </div>
      <div className="user-list">
        <div className="med-class">
          <div className="med-icon">
            <FontAwesomeIcon icon={faPills} color="#5DB6DE" />
          </div>
          <div className="med-title">
            <span>처방약</span>
          </div>
          <div className="med-amount">
            <span>{pres}건</span>
          </div>
        </div>
        <div className="med-class">
          <div className="med-icon">
            <FontAwesomeIcon icon={faCapsules} color="#F0972D" />
          </div>
          <div className="med-title">
            <span>일반약</span>
          </div>
          <div className="med-amount">
            <span>{otc}건</span>
          </div>
        </div>
        <div className="med-class">
          <div className="med-icon">
            <FontAwesomeIcon icon={faPrescriptionBottleMedical} color="#004F72" />
          </div>
          <div className="med-title">
            <span>영양제</span>
          </div>
          <div className="med-amount">
            <span>{nut}건</span>
          </div>
        </div>
        <div className="med-class">
          <div className="med-icon">
            <FontAwesomeIcon icon={faMortarPestle} color="#944B00" />
          </div>
          <div className="med-title">
            <span>한약</span>
          </div>
          <div className="med-amount">
            <span>{ori}건</span>
          </div>
        </div>
        <div className="med-class">
          <div className="med-icon">
            <FontAwesomeIcon icon={faTablets} color="#5DB6DE" />
          </div>
          <div className="med-title">
            <span>기타</span>
          </div>
          <div className="med-amount">
            <span>{etc}건</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
