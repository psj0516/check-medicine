import { Fragment, useEffect, useRef, useState } from "react";
import Category from "components/Category";
import Menu from "components/Menu";
import "moment/locale/ko";
import Modal from "components/Modal";
import Form from "components/Form";
import ItemList from "components/ItemList";
import Alert from "components/Alert";

const Home = () => {
  // 예시 데이터 세팅
  const setnextdate = new Date();
  setnextdate.setDate(setnextdate.getDate() + 1);
  const nextdate = setnextdate.toLocaleDateString();
  const [medications, setMedications] = useState([
    {
      id: 0,
      category: "일반약",
      text: "감기약",
      cycle: "1일 1회 복용",
      amount: "10일간",
      date: nextdate,
      checked: false,
      group: 0,
    },
  ]);

  const [medication, setMedication] = useState("");
  const [category, setCategory] = useState("");
  const [cycle, setCycle] = useState(1);
  const [amount, setAmout] = useState(1);
  const [todayList, setTodayList] = useState([]);
  const [nextList, setNextList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [altTitle, setAltTitle] = useState("");
  const [removeOne, setRemoveOne] = useState(0);
  const [removeAll, setRemoveAll] = useState(0);

  // 카테고리 종류
  const categories = [
    { id: 1, title: "처방약" },
    { id: 2, title: "일반약" },
    { id: 3, title: "영양제" },
    { id: 4, title: "한약" },
    { id: 5, title: "기타" },
  ];

  // 각 목록의 id와 group 기본값 세팅
  const nextid = useRef(1);
  const groupid = useRef(0);

  /*
   * 목록 추가 관련 기능
   * selectCat: 선택한 카테고리 값 설정
   * inputChange: 약 이름 설정
   * cycleChange: 복용 주기 설정
   * amountChange: 복용 기간 설정
   * openAlert: 미입력 항목 경고창 띄우기
   * closeAlert: 경고창 닫기
   * addMedi: 약 복용 주기와 기간 관련 설정
   * addList: 복욕 목록 추가
   */

  const selectCat = (catTitle) => {
    setCategory(catTitle);
  };

  const inputChange = (event) => {
    setMedication(event.target.value);
  };

  const cycleChange = (event) => {
    setCycle(event.target.value);
  };

  const amountChange = (event) => {
    setAmout(event.target.value);
  };

  const openAlert = (title) => {
    setAlertOpen(true);
    setAltTitle(title);
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };

  const addMedi = (event) => {
    event.preventDefault();
    if (medication === "") {
      openAlert("약 이름");
      return;
    } else if (category === "") {
      openAlert("약 종류");
      return;
    }

    const datenow = new Date();
    const groupnow = groupid.current + 1;

    for (let i = 0; i < cycle * amount; i++) {
      const id = nextid.current + i;
      let day = "";
      if (i >= cycle && i % cycle === 0) {
        datenow.setDate(datenow.getDate() + 1);
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
      group: groupnow,
    };
    setMedications((currentArray) => [newlist, ...currentArray]);
  };

  /*
   * 필터링 관련 기능
   * filterList: 전체 리스트를 오늘자 목록과 그 이후 목록(상위 10건)으로 필터링
   * useEffect를 이용하여 전체 리스트(medications)에 변동이 있을 때마다 필터링
   */
  const filterList = () => {
    const todaydate = new Date().toLocaleDateString();

    const today = medications.filter((medication) => medication.date === todaydate);
    setTodayList(today);
    const allnext = medications.filter((medication) => medication.date != todaydate && medication.date > todaydate);
    const orderedDate = allnext.sort((a, b) => new Date(a.date) - new Date(b.date));
    const next = orderedDate.slice(0, 10);
    setNextList(next);
  };

  useEffect(() => {
    filterList();
  }, [medications]);

  // 복용 완료/미완료 toggle
  const changeCheck = (id) => {
    const index = medications.findIndex((item) => item.id === id);
    const selectedItem = medications[index];
    const newMedications = [...medications];

    newMedications[index] = {
      ...selectedItem,
      checked: !selectedItem.checked,
    };

    setMedications(newMedications);
  };

  /* 삭제 관련 기능
   * selectRemove: 삭제 관련 모달 띄우기
   * removeItem: 단일 아이템 삭제
   * removeAll: 관련 아이템 전체 삭제
   * closeModal: 모달창 닫기
   */

  const selectRemove = (id, group) => {
    setModalOpen(true);
    setRemoveOne(id);
    setRemoveAll(group);
  };

  const removeItem = () => {
    const newMedications = medications.filter((item) => item.id !== removeOne);
    setMedications(newMedications);
    setRemoveOne(0);
    setRemoveAll(0);
    setModalOpen(false);
  };

  const removeAllItem = () => {
    const newMedications = medications.filter((item) => item.group !== removeAll);
    setMedications(newMedications);
    setRemoveOne(0);
    setRemoveAll(0);
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Fragment>
      <Menu />
      <h1>복용 목록 ({medications.length})</h1>
      <Category categories={categories} onSelect={selectCat} selected={category} />
      <Form
        onSubmit={addMedi}
        inputChange={inputChange}
        medication={medication}
        cycleChange={cycleChange}
        cycle={cycle}
        amountChange={amountChange}
        amount={amount}
      />
      <hr />
      <ItemList todayList={todayList} nextList={nextList} changeCheck={changeCheck} selectRemove={selectRemove} />
      <Modal open={modalOpen} close={closeModal} removeItem={removeItem} removeAllItem={removeAllItem} />
      <Alert open={alertOpen} close={closeAlert} title={altTitle} />
    </Fragment>
  );
};

export default Home;
