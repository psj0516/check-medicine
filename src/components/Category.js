import "./Category.css";

const Category = ({ categories, onSelect, selected }) => {
  return (
    <div className="cat-container">
      {categories.map((category) => (
        <div className={`category ${selected===category.title? "active" : false}`} key={category.id} onClick={() => onSelect(category.title)}>
          {category.title}
        </div>
      ))}
    </div>
  );
};

export default Category;
