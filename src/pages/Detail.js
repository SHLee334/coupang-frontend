import { useEffect, useState } from "react";
import { getProduct } from "../api/product";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addReview, getReviews, delReview, updateReview } from "../api/review";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

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
    button {
      width: 100%;
    }
  }

  .review-contents {
    margin-top: 30px;
    .review-content {
      margin-top: 15px;
      img {
        width: 200px;
      }
      .btn-container {
        display: flex;
        justify-content: flex-end;

        button {
          margin-left: 5px;
        }
      }
    }
  }
`;

const Detail = () => {
  const { code } = useParams(); // 주소값에 code 가져온다
  const [product, setProduct] = useState({});
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [edit, setEdit] = useState(null);

  const info = useSelector((state) => {
    return state.user;
  });

  const productAPI = async () => {
    const response = await getProduct(code);
    setProduct(response.data);
  };

  const reviewsAPI = async () => {
    const response = await getReviews(code);
    setReviews(response.data);
  };

  useEffect(() => {
    productAPI();
    reviewsAPI();
    if (Object.keys(info).length === 0) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(info);
    }
  }, []);

  // 리뷰 작성
  const reviewSubmit = async () => {
    // 이건 form 태그를 사용하지 않고 보낼때
    const formData = new FormData();
    formData.append("id", user.id);
    formData.append("prodCode", code);
    formData.append("reviTitle", title);
    formData.append("reviDesc", desc);
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });

    await addReview(formData);
    setImages([]); // 얘는 문제 있다, CSS로 스타일링하면 비어지기 때문에, 이건 브라우저 보안상 문제 때문
    setTitle("");
    setDesc("");
    reviewsAPI(); // 리뷰 작성 후 재호출 (바로 보이게)
  };

  const imageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const onDelete = async (code) => {
    await delReview(code);
    reviewsAPI();
  };

  const onUpdate = async (review) => {
    await setEdit(review);
  };

  const deleteImage = (code) => {
    setEdit((prev) => {
      const images = prev.images.filter((image) => image.reviImgCode !== code);
      return { ...prev, images: images };
    });
  };

  // 리뷰 수정 눌렀다가 취소할때
  const cancel = () => {
    setEdit(null);
  };

  // 리뷰 수정 완료 누를때
  const reviewUpdate = async () => {
    // FormData 방식으로 전달
    const formData = new FormData();
    // append로 필요한 값들 추가해야 하는 것!
    formData.append("id", user.id);
    formData.append("reviCode", edit.reviCode);
    formData.append("reviTitle", edit.reviTitle);
    formData.append("reviDesc", edit.reviDesc);
    formData.append("prodCode", code);
    edit.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image.reviUrl);
    });
    images.forEach((image, index) => {
      formData.append(`files[${index}]`, image);
    });
    // updateReview <-- formData 값 전달!
    await updateReview(formData);
    // images 비울것, edit 비울것
    setImages([]);
    setEdit(null);
    // review 다시 호출
    reviewsAPI();
  };

  return (
    <Div>
      <div className="product-info">
        <img src={product.prodPhoto?.replace("D:", "http://localhost:8081")} />
        <div>
          <h2>{product.prodName}</h2>
          <h3>{product.price}</h3>
        </div>
      </div>
      <div className="review-add">
        <Form.Control
          type="file"
          multiple
          accept="image/*"
          onChange={imageChange}
        />
        <Form.Control
          type="text"
          placeholder="제목 작성"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control
          as="textarea"
          placeholder="글 작성"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button variant="dark" onClick={reviewSubmit}>
          리뷰 작성
        </Button>
      </div>
      <div className="review-contents">
        {reviews.map((review) => (
          <div key={review.reviCode} className="review-content">
            {edit?.reviCode === review.reviCode ? (
              <>
                {edit.images.map((image) => (
                  <img
                    key={image.reviImgCode}
                    src={image.reviUrl.replace("D:", "http://localhost:8081")}
                    onClick={() => deleteImage(image.reviImgCode)}
                  />
                ))}
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={imageChange}
                />
                <Form.Control
                  type="text"
                  value={edit.reviTitle}
                  onChange={(e) =>
                    setEdit((prev) => ({ ...prev, reviTitle: e.target.value }))
                  }
                />
                <Form.Control
                  as="textarea"
                  value={edit.reviDesc}
                  onChange={(e) =>
                    setEdit((prev) => ({ ...prev, reviDesc: e.target.value }))
                  }
                />
                <div className="btn-container">
                  <Button variant="warning" onClick={reviewUpdate}>
                    완료
                  </Button>
                  <Button variant="danger" onClick={cancel}>
                    취소
                  </Button>
                </div>
              </>
            ) : (
              <>
                {review.images?.map((image) => (
                  <img
                    key={image.reviImgCode}
                    src={image.reviUrl.replace("D:", "http://localhost:8081")}
                  />
                ))}
                <h4>{review.reviTitle}</h4>
                <p>{review.reviDesc}</p>
                <div className="btn-container">
                  <Button variant="warning" onClick={() => onUpdate(review)}>
                    수정
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => onDelete(review.reviCode)}
                  >
                    삭제
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </Div>
  );
};
export default Detail;
