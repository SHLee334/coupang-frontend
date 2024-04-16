import "../asset/style.css";
import { FaBars } from "react-icons/fa6";
import CategoryItem from "./CategoryItem";
import { getCategories } from "../api/product";
import { useState, useEffect } from "react";

const Header = () => {
  const [categories, setCategories] = useState([]);

  const categoriesAPI = async () => {
    const response = await getCategories();
    console.log(response);
    setCategories(response.data);
  };
  useEffect(() => {
    categoriesAPI();
  }, []);
  return (
    <>
      <div className="tob-bar container">
        <div className="tob-bar-left">
          <a href="#">즐겨찾기</a>
          <a href="#">입점신청</a>
        </div>
        <div className="tob-bar-right">
          <a href="#">로그인</a>
          <a href="#">회원가입</a>
          <a href="#">고객센터</a>
        </div>
      </div>
      <header className="container">
        <div className="category-btn">
          <FaBars />
          <p>카테고리</p>
          <div className="category">
            <div className="category-list">
              {categories.map((category) => (
                <CategoryItem category={category} key={category.cateCode} /> // category={category} 상위에서 하위로 값 보내줌
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
