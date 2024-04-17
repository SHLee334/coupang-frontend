import { useEffect, useState } from "react";
import { getProduct } from "../api/product";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addReview, getReviews } from "../api/review";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

const Detail = () => {
  const Div = styled.div`
    .product-info {
      display: flex;
      margin-right: 20px;

      img {
        width: 50%;
        margin-right: 20px;
      }

      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .review-add {
        margin-top: 20px;

        input {
          margin-bottom: 10px;
        }
        textarea {
          resize: none;
          margin-bottom: 10px;
        }
      }
    }
  `;

  const { code } = useParams(); // 주소값에 code 가져온다
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const info = useSelector((state) => {
    return state.user;
  });

  const productAPI = async () => {
    const response = await getProduct(code);
    setProduct(response.data);
  };
  useEffect(() => {
    productAPI();
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);

  const reviewSubmit = async () => {
    // 이건 form 태그를 사용하지 않고 보낼때
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("prodCode", code);
    formData.append("reviTitle");
    formData.append("reviDesc");
    formData.append("files");
    await addReview(formData);
  };

  return (
    <section>
      <Div key={product.prodCode}>
        <div className="product-info">
          <img
            src={product.prodPhoto?.replace("D:", "http://localhost:8081")}
          />
          <div>
            <h2>{product.prodName}</h2>
            <p>{product.price}</p>
          </div>
        </div>
        <div className="review-add">
          <Form.Control type="file" multiple accept="image/*" />
          <Form.Control type="text" placeholder="제목 작성" />
          <Form.Control as="textarea" placeholder="글 작성" />
          <Button onClick={reviewSubmit}>리뷰 작성</Button>
        </div>
      </Div>
    </section>
  );
};
export default Detail;
