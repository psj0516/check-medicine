import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Menu from "components/Menu";
import Parser from "html-react-parser";

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [checkResult, setCheckresult] = useState(true);
  const [searchResult, setSearchResult] = useState("약 이름을 검색하세요.");

  const onChage = (event) => {
    setSearch(event.target.value);
  };
  const getMedicines = async (event) => {
    try {
      event.preventDefault();
      const key = process.env.REACT_APP_API_KEY;
      const response = await axios.get(
        `/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?ServiceKey=${key}&itemName=${search}&numOfRows=10&type=json`
      );
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
    <Fragment>
      <Menu />
      <div>Medicine</div>
      <form onSubmit={getMedicines}>
        <input
          value={search}
          type="text"
          placeholder="약 이름을 입력하세요."
          onChange={onChage}
        />
        <button>검색</button>
      </form>
      <div>
        {checkResult ? (
          <div>{searchResult}</div>
        ) : (
          <div>
            {medicines?.map((medicine) => (
              <ul key={medicine.itemSeq}>
                <li>{medicine.itemName}</li>
                <li>{Parser(medicine.useMethodQesitm)}</li>
              </ul>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Medicine;
