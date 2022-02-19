import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faSquareCheck, faTrashCan } from "@fortawesome/free-regular-svg-icons";

const List = ({ list, changeCheck, selectRemove, listday }) => {
  const length = list.length;
  return (
    <table>
      <tbody>
        {length === 0 ? (
          <tr>
            <td>일정이 없습니다.</td>
          </tr>
        ) : null}
        {list.map((item) => (
          <tr key={item.id} onClick={() => changeCheck(item.id)} className={item.checked ? "checked row" : "row"}>
            {listday === "today" ? <td>{item.checked ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}</td> : null}
            <td>{item.category}</td>
            <td className="name">{item.text}</td>
            <td>{item.cycle}</td>
            <td>{item.amount}</td>
            <td>{item.date.substr(5)}</td>
            <td>
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={(e) => {
                  e.stopPropagation();
                  selectRemove(item.id, item.group);
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ItemList = ({ todayList, nextList, changeCheck, selectRemove }) => {
  const today = new Date().toLocaleDateString();
  return (
    <div className="list-container">
      <div className="today-list">
        <div className="list-title">
          오늘 <span>{today}</span>{" "}
        </div>
        <List list={todayList} changeCheck={changeCheck} selectRemove={selectRemove} listday="today" />
      </div>
      <div className="next-list">
        <div className="list-title">
          예정 <span>(상위 10건)</span>
        </div>
        <List list={nextList} changeCheck={changeCheck} selectRemove={selectRemove} listday="next" />
      </div>
    </div>
  );
};

export default ItemList;
