import { Container, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { asyncLogin } from "../store/user";
import { useDispatch, useSelector } from "react-redux"; // 가져온 asyncLogin 사용하려면 필요하다
import { useNavigate } from "react-router-dom";

const H1 = styled.h1`
  font-size: 3rem;
  margin-top: 30px;
`;

const Login = () => {
  const [user, setUser] = useState({ id: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const info = useSelector((state) => {
    return state.user;
  });

  // 보기용, 나중에 지워야한다
  useEffect(() => {
    console.log(info);
  }, [info]);

  const submit = () => {
    console.log(user); // 입력한 id, password 확인가능, 나중에 지울것
    dispatch(asyncLogin(user));
    navigate("/"); // 새로고침과 똑같다
  };

  return (
    <Container>
      <H1>로그인</H1>
      <Form.Control
        type="text"
        placeholder="아이디"
        style={{ marginBottom: "10px" }}
        value={user.id}
        onChange={(e) => setUser((prev) => ({ ...prev, id: e.target.value }))}
      />
      <Form.Control
        type="password"
        placeholder="비밀번호"
        value={user.password}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <Button
        variant="dark"
        style={{ width: "100%", marginTop: "10px" }}
        onClick={submit}
      >
        로그인
      </Button>
    </Container>
  );
};
export default Login;
