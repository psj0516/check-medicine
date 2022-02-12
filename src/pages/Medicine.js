import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Menu from "../components/Menu";
import Parser from "html-react-parser";

const Medicine = () => {
    const [loading, setLoading] = useState(true);
    const [medicines, setMedicines] = useState([]);
    const [search, setSearch] = useState("");
    const [datarow, setDatarow] = useState(0);

    const getMedicines = async() => {
        try {
            const key = process.env.REACT_APP_API_KEY;
            const response = await axios.get(`/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?ServiceKey=${key}&itemName=${search}&numOfRows=${datarow}&type=json`);
            const data = response.data.body.items;
            setMedicines(data);
        } catch (e) {
            console.log("에러: " + e)
        }
    }
    const searchMed=(event)=> {
        const keyword = event.target.value;
        setSearch(keyword);
        setDatarow(10);
    }
    useEffect(()=>{
        getMedicines();
    }, [search])
  return (
    <Fragment>
      <Menu />
      <div>Medicine</div>
      <input type="text" placeholder="약 이름을 입력하세요." onChange={searchMed} />
      {medicines?.map((medicine)=>(
          <div>
              <ul key={medicine.itemSeq}>
                  <li>{medicine.itemName}</li>
                  <li>{Parser(medicine.useMethodQesitm)}</li>
              </ul>
          </div>
      ))}
    </Fragment>
  );
};

export default Medicine;
