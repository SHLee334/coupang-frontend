import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

// 인증이 필요없는 RESTful API 가져올때 기본 루트
const instance = axios.create({
  baseURL: "http://localhost:8080/api/public",
});

// 인증이 필요한 RESTful API 가져올때 기본 루트
const authorize = axios.create({
  baseURL: "http://localhost:8080/api/",
});

authorize.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// [POST] http://localhost:8080/api/review
// 인증 필요, RequestBody 데이터 보내야 하는 상황
export const addReview = async (data) => {
  // data : 사용자한테 받는 값
  return await authorize.post("review", data); // 쉼표 뒤에 넣어주면 RequestBody로 간다
};

// [GET] http://localhost:8080/api/public/product/10/review
// 인증 불필요, 경로에 상품 코드 보내야 하는 상황
export const getReviews = async (code) => {
  return await instance.get("product/" + code + "/review");
};

// @DeleteMapping("/review/{code}") > 이에 해당하는 기능! 메서드명 : delReview
// 인증 필요 O
export const delReview = async (code) => {
  return await authorize.delete("review/" + code);
};

// @PutMapping("/review"), 인증 필요 O, RequestBody로 데이터 값 받음
export const updateReview = async (data) => {
  return await authorize.put("review", data);
};
