const Form = ({ onSubmit, inputChange, medication, cycleChange, cycle, amountChange, amount }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        이름
        <input onChange={inputChange} type="text" value={medication} placeholder="입력하세요" />
        1일 복용량
        <select onChange={cycleChange} value={cycle}>
          <option value="1">1회</option>
          <option value="2">2회</option>
          <option value="3">3회</option>
        </select>
        복용기간 (3일분 = 3 입력)
        <input type="number" onChange={amountChange} value={amount} />
        <button>추가</button>
      </form>
    </div>
  );
};

export default Form;
