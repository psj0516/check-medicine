import Category from "./Category";

const Form = ({ categories, selectCat, selected, onSubmit, inputChange, medication, cycleChange, cycle, amountChange, amount }) => {
  return (
    <div className="form-container">
      <div className="add-list">&#43;&nbsp;새로운 복약 일정을 등록하세요.</div>
      <div className="form-box">
        <Category categories={categories} selectCat={selectCat} selected={selected} />
        <form onSubmit={onSubmit}>
          <div className="form-element">
            <label>이름</label>
            <input onChange={inputChange} type="text" value={medication} maxLength="6" placeholder="입력하세요" />
          </div>
          <div className="form-element">
            <span>1일 복용량</span>
            <div>
              <div className="radio-wrap">
                <input type="radio" onChange={cycleChange} name="cycle" value="1" id="1" defaultChecked />
                <label htmlFor="1">
                  <span>1회</span>
                </label>
              </div>
              <div className="radio-wrap">
                <input type="radio" onChange={cycleChange} name="cycle" value="2" id="2" />
                <label htmlFor="2">
                  <span>2회</span>
                </label>
              </div>
              <div className="radio-wrap">
                <input type="radio" onChange={cycleChange} name="cycle" value="3" id="3" />
                <label htmlFor="3">
                  <span>3회</span>
                </label>
              </div>
            </div>
          </div>
          <div className="form-element">
            <label>
              기간<span className="info">(최대 30일)</span>
            </label>
            <div>
              <input type="number" onChange={amountChange} value={amount} max="30" />
              <span>일분</span>
            </div>
          </div>
          <div className="form-element">
            <button>등록</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
