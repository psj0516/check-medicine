import { Fragment, useState } from "react";
import Menu from "../components/Menu";

const Home = () => {
  const [medication, setMedication] = useState("");
  const [medications, setMedications] = useState([]);

  const onChange=(event)=> setMedication(event.target.value);
  const addMedi = (event) => {
    event.preventDefault();
    if (medication === ""){
      return;
    }
    setMedications((currentArray) => [medication, ...currentArray]);
    setMedication("");
  }
  return (
    <Fragment>
      <Menu />
      <h1>복용 목록 ({medications.length})</h1>
      <form onSubmit={addMedi}>
        <input
          onChange={onChange}
          type="text"
          value={medication}
          placeholder="입력하세요"
        />
        <button>추가</button>
        <hr />
        <ul>
          {medications.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </form>
    </Fragment>
  );
};

export default Home;
