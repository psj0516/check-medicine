import { Fragment, useEffect, useRef, useState } from "react";
import Category from "components/Category";
import Menu from "components/Menu";
import "moment/locale/ko";

const Home = () => {
  const todaydate = new Date().toLocaleDateString();
  const [medication, setMedication] = useState("");
  const [medications, setMedications] = useState([
    {
      id: 0,
      category: "일반약",
      text: "감기약",
      cycle: "1일 1회 복용",
      amount: "10일간",
      date: "2022. 2. 19",
      checked: false,
    },
  ]);
  const [category, setCategory] = useState("");
  const [cycle, setCycle] = useState(1);
  const [amount, setAmout] = useState(1);
  const [todayList, setTodayList] = useState([]);
  const [nexList, setNextList] = useState([]);

  const categories = [
    { id: 1, title: "처방약" },
    { id: 2, title: "일반약" },
    { id: 3, title: "영양제" },
    { id: 4, title: "한약" },
    { id: 5, title: "기타" },
  ];

  const nextid = useRef(1);

  const selectCat = (catTitle) => {
    setCategory(catTitle);
  };

  const onChange = (event) => {
    setMedication(event.target.value);
  };


  const addMedi = (event) => {
    event.preventDefault();
    if (medication === "") {
      return;
    }
    const datenow = new Date();

    for (let i = 0; i < cycle * amount; i++) {
      const id= nextid.current + i
      let day="";
      if (i>=cycle && (i)%cycle === 0) {
        console.log(i);
        datenow.setDate(datenow.getDate() + 1)
      }
      day = datenow.toLocaleDateString();
      addList(id, day);
    }
    setMedication("");
    setCycle(1);
    setAmout(1);
    datenow.setDate(new Date());
    nextid.current += cycle * amount;
  };

  const addList = (id, day) => {
    const newlist = {
      id: id,
      category: category,
      text: medication,
      cycle: `1일 ${cycle}회 복용`,
      amount: `총 ${amount} 일간`,
      date: day,
      checked: false,
    };
    setMedications((currentArray) => [newlist, ...currentArray]);
  };

  const filterList =()=>{
    const today = medications.filter((medication)=>medication.date === todaydate);
    setTodayList(today);
    const next = medications.filter((medication)=>medication.date != todaydate);
    setNextList(next);
    console.log(next);
  }

  useEffect(()=>{
    filterList();
  }, [medications])

  const cycleChange = (event) => {
    setCycle(event.target.value);
  };

  const changeAmount = (event) => {
    setAmout(event.target.value);
  };

  return (
    <Fragment>
      <Menu />
      <h1>복용 목록 ({medications.length})</h1>
      <form onSubmit={addMedi}>
        <Category
          categories={categories}
          onSelect={selectCat}
          selected={category}
        />
        이름
        <input
          onChange={onChange}
          type="text"
          value={medication}
          placeholder="입력하세요"
        />
        1일 복용량
        <select onChange={cycleChange} value={cycle}>
          <option value="1">1회</option>
          <option value="2">2회</option>
          <option value="3">3회</option>
        </select>
        복용기간 (3일분 = 3 입력)
        <input type="number" onChange={changeAmount} value={amount} />
        <button>추가</button>
      </form>
      <hr />
      전체목록
      <ul>
        {medications.map((item) => (
          <li key={item.id}>
            {item.category} {item.text} {item.cycle} {item.amount} {item.date}
          </li>
        ))}
      </ul>
      오늘
      <ul>
        {todayList.map((item) => (
          <li key={item.id}>
            {item.category} {item.text} {item.cycle} {item.amount} {item.date}
          </li>
        ))}
      </ul>
      이후
      <ul>
        {nexList.map((item) => (
          <li key={item.id}>
            {item.category} {item.text} {item.cycle} {item.amount} {item.date}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Home;
