import axios from "axios";

// 로그인 가져오기
export const login = async (data) => {
  return await axios.post("http://localhost:8080/login", data);
};
