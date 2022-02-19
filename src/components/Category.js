import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Category = ({ categories, selectCat, selected }) => {
  return (
    <div className="cat-container">
      {categories.map((category) => (
        <div className={`category ${selected === category.title ? "active" : false}`} key={category.id} onClick={() => selectCat(category.title)}>
          <div className="icon">{<FontAwesomeIcon icon={category.icon} />}</div>
          <div className="title">{category.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Category;
