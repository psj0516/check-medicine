const Header = ({ userName, editingUser, editToggle, editUser}) => {
  return (
    <div>
      {editingUser ? (
        <span onClick={editToggle}>{userName}</span>
      ) : (
        <form onSubmit={editUser}>
          <input type="text" name="user" maxLength='10' defaultValue={userName} />
          <button>수정</button>
        </form>
      )}
      님의 복용 목록
    </div>
  );
};

export default Header;
