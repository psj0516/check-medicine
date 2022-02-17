const ItemList = ({ todayList, nextList, changeCheck, selectRemove }) => {
  return (
    <div>
      오늘
      <ul>
        {todayList.map((item) => (
          <li key={item.id} onClick={() => changeCheck(item.id)}>
            {item.checked ? "ㅇㅇ" : "ㄴㄴ"}
            {item.category} {item.text} {item.cycle} {item.amount} {item.date}
            <span
              onClick={(e) => {
                e.stopPropagation();
                selectRemove(item.id, item.group);
              }}
            >
              삭제
            </span>
          </li>
        ))}
      </ul>
      예정 (10건)
      <ul>
        {nextList.map((item) => (
          <li key={item.id} onClick={() => changeCheck(item.id)}>
            {item.checked ? "ㅇㅇ" : "ㄴㄴ"}
            {item.category} {item.text} {item.cycle} {item.amount} {item.date}
            <span
              onClick={(e) => {
                e.stopPropagation();
                selectRemove(item.id, item.group);
              }}
            >
              삭제
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
