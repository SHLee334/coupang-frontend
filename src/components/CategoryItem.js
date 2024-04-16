import {
  FaCaretRight,
  FaShirt,
  FaPumpSoap,
  FaBaby,
  FaBowlFood,
  FaMugSaucer,
  FaBottleDroplet,
  FaCouch,
  FaCamera,
  FaBaseball,
  FaCar,
} from "react-icons/fa6";

const CategoryItem = ({ category }) => {
  return (
    <div className="category-item">
      {category.cateCode === 1 ? (
        <FaShirt />
      ) : category.cateCode === 2 ? (
        <FaPumpSoap />
      ) : category.cateCode === 3 ? (
        <FaBaby />
      ) : category.cateCode === 4 ? (
        <FaBowlFood />
      ) : category.cateCode === 5 ? (
        <FaMugSaucer />
      ) : category.cateCode === 6 ? (
        <FaBottleDroplet />
      ) : category.cateCode === 7 ? (
        <FaCouch />
      ) : category.cateCode === 8 ? (
        <FaCamera />
      ) : category.cateCode === 9 ? (
        <FaBaseball />
      ) : (
        <FaCar />
      )}
      <span>{category.cateName}</span>
      <FaCaretRight />
      <div className="category-sub-item">
        <ul>
          <li>
            <a href="#">여성패션</a>
          </li>
          <li>
            <a href="#">남성패션</a>
          </li>
          <li>
            <a href="#">남녀 공용 의류</a>
          </li>
          <li>
            <a href="#">유아동패션</a>
          </li>
        </ul>
        <img
          src="https://image8.coupangcdn.com/image/displayitem/displayitem_3cc22bda-73a2-4f9b-a7ea-c12d205adcb3.jpg"
          alt=""
        />
      </div>
    </div>
  );
};
export default CategoryItem;
