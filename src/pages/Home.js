import { Fragment, useRef, useState } from "react";
import Category from "components/Category";
import Menu from "components/Menu";

const Home = () => {
  const [medication, setMedication] = useState("");
  const [medications, setMedications] = useState([{
    id:0, category: "일반약", text:"감기약", cycle: "1일 1회 복용", checked: false
  }]);
  const [category, setCategory] = useState("");

  const categories = [
    { id: 1, title: "처방약" },
    { id: 2, title: "일반약" },
    { id: 3, title: "영양제" },
    { id: 4, title: "한약" },
    { id: 5, title: "기타" },
  ];

  const nextid = useRef(1);

  const selectCat =(catTitle)=> {
    setCategory(catTitle);
  }

  const onChange = (event) => {
    setMedication(event.target.value);
  };

  const addMedi = (event) => {
    event.preventDefault();
    if (medication === "") {
      return;
    }
    const newlist = {
      id: nextid.current,
      category: category,
      text: medication,
      cycle: "1일 1회 복용",
      checked: false
    }
    setMedications((currentArray) => [newlist, ...currentArray]);
    setMedication("");
    nextid.current +=1;
  };

  return (
    <Fragment>
      <Menu />
      <h1>복용 목록 ({medications.length})</h1>
      <form onSubmit={addMedi}>
        <Category categories={categories} onSelect={selectCat} selected={category}/>
        <input
          onChange={onChange}
          type="text"
          value={medication}
          placeholder="입력하세요"
        />
        <button>추가</button>
        <hr />
        <ul>
          {medications.map((item) => (
            <li key={item.id}>{item.category} {item.text} {item.cycle}</li>
          ))}
        </ul>
      </form>
    </Fragment>
  );
};

export default Home;
