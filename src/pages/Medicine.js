import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import Menu from "components/Menu";
import Parser from "html-react-parser";
import Footer from "components/Footer";

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [checkResult, setCheckresult] = useState(true);
  const [searchResult, setSearchResult] = useState("여기에 검색 결과가 표시됩니다.");

  const onChage = (event) => {
    setSearch(event.target.value);
  };
  const getMedicines = async (event) => {
    try {
      event.preventDefault();
      const key = process.env.REACT_APP_API_KEY;
      const response = await axios.get(`/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?ServiceKey=${key}&itemName=${search}&numOfRows=10&type=json`);
      const data = response.data.body.items;
      setMedicines(data);
      setSearch("");

      if (!data) {
        setSearchResult("검색 결과가 없습니다.");
        setCheckresult(true);
      } else {
        setCheckresult(false);
      }
    } catch (e) {
      console.log("에러: " + e);
    }
  };

  return (
    <div className="medicine-container">
      <Menu />
      <div>
        <div className="medicine-header">
          <div className="medicine-info">의약품 정보</div>
          <div className="medicine-search">
            <form onSubmit={getMedicines}>
              <div className="tooltip">
                <FontAwesomeIcon icon={faCircleQuestion} />
                <span className="tooltip-text">
                  식품의약품안전처에서 제공하는
                  <br /> 의약품개요정보(e약은요)에 따라 <br />
                  시중에 판매되는 의약품 정보를 제공합니다.
                </span>
              </div>
              <input value={search} type="text" placeholder="약 이름을 입력하세요." onChange={onChage} />
              <button>검색</button>
            </form>
          </div>
        </div>
        <div className="medicine-body">
          <div className="result-title">검색결과</div>
          {checkResult ? (
            <div className="search-result no-result">
              <div className="result-none">{searchResult}</div>
            </div>
          ) : (
            <div className="search-result">
              {medicines?.map((medicine) => (
                <div className="result" key={medicine.itemSeq}>
                  <div className="result-element">이름</div>
                  <div className="result-element">{medicine.itemName}</div>
                  <div className="result-element">복용방법</div>
                  <div className="result-element">{Parser(medicine.useMethodQesitm)}</div>
                  {medicine.atpnWarnQesitm ? (
                    <>
                      <div className="result-element">주의사항</div>
                      <div className="result-element">{Parser(medicine.atpnWarnQesitm)}</div>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Medicine;
