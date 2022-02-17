import { Fragment, useEffect, useRef, useState } from "react";
import Category from "components/Category";
import Menu from "components/Menu";
import "moment/locale/ko";
import Modal from "components/Modal";

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
      date: "2022. 2. 19.",
      checked: false,
      group: 0
    },
  ]);
  const [category, setCategory] = useState("");
  const [cycle, setCycle] = useState(1);
  const [amount, setAmout] = useState(1);
  const [todayList, setTodayList] = useState([]);
  const [nexList, setNextList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [removeOne, setRemoveOne] = useState(0);
  const [removeAll, setRemoveAll] = useState(0);

  const categories = [
    { id: 1, title: "처방약" },
    { id: 2, title: "일반약" },
    { id: 3, title: "영양제" },
    { id: 4, title: "한약" },
    { id: 5, title: "기타" },
  ];

  const nextid = useRef(1);
  const groupid = useRef(0);

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
    const groupnow = groupid.current + 1

    for (let i = 0; i < cycle * amount; i++) {
      const id= nextid.current + i
      let day="";
      if (i>=cycle && (i)%cycle === 0) {
        datenow.setDate(datenow.getDate() + 1)
      }
      day = datenow.toLocaleDateString();
      addList(id, day, groupnow);
    }
    setMedication("");
    setCycle(1);
    setAmout(1);
    datenow.setDate(new Date());
    nextid.current += cycle * amount;
    groupid.current += 1;
  };

  const addList = (id, day, groupnow) => {
    const newlist = {
      id: id,
      category: category,
      text: medication,
      cycle: `1일 ${cycle}회 복용`,
      amount: `총 ${amount} 일간`,
      date: day,
      checked: false,
      group: groupnow
    };
    setMedications((currentArray) => [newlist, ...currentArray]);
  };

  const filterList =()=>{
    const today = medications.filter((medication)=>medication.date === todaydate);
    setTodayList(today);
    const allnext = medications.filter((medication)=>medication.date != todaydate);
    const orderedDate = allnext.sort((a, b) => new Date(a.date) - new Date(b.date))
    const next = orderedDate.slice(0,10);
    setNextList(next);

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

  const changeCheck =(id)=> {
    const index = medications.findIndex(item => item.id === id);
    const selectedItem = medications[index];
    const newMedications = [...medications];

    newMedications[index] = {
      ...selectedItem,
      checked: !selectedItem.checked
    }

    setMedications(newMedications);
  }

  const selectRemove=(id, group)=>{
    setModalOpen(true);
    setRemoveOne(id);
    setRemoveAll(group);
  }

  const removeItem=()=>{
    //단일삭제
    const newMedications = medications.filter(item => item.id !== removeOne);
    setMedications(newMedications);
    setRemoveOne(0);
    setRemoveAll(0);
    setModalOpen(false)
  }

  const removeAllItem=()=> {
    //전체삭제
    const newMedications = medications.filter(item => item.group !== removeAll);
    setMedications(newMedications);
    setRemoveOne(0);
    setRemoveAll(0);
    setModalOpen(false)
  }

  const closeModal=()=>{
    setModalOpen(false)
  }

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
          <li key={item.id} onClick={()=>changeCheck(item.id)}>
            {item.checked ? "ㅇㅇ" : "ㄴㄴ"}
            {item.category} {item.text} {item.cycle} {item.amount} {item.date} <span onClick={(e)=>{
              e.stopPropagation(); selectRemove(item.id, item.group)}}>삭제</span>
          </li>
        ))}
      </ul>
      오늘
      <ul>
        {todayList.map((item) => (
          <li key={item.id} onClick={()=>changeCheck(item.id)}>
            {item.checked ? "ㅇㅇ" : "ㄴㄴ"}
            {item.category} {item.text} {item.cycle} {item.amount} {item.date}
          </li>
        ))}
      </ul>
      이후
      <ul>
        {nexList.map((item) => (
          <li key={item.id} onClick={()=>changeCheck(item.id)}>
            {item.checked ? "ㅇㅇ" : "ㄴㄴ"}
            {item.category} {item.text} {item.cycle} {item.amount} {item.date}
          </li>
        ))}
      </ul>
      <Modal open={modalOpen} close={closeModal} removeItem={removeItem} removeAllItem={removeAllItem}/>
    </Fragment>
  );
};

export default Home;
