import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/user";

export const asyncLogin = createAsyncThunk("user/login", async (data) => {
  const response = await login(data);
  return response.data;
});

const user = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    userSave: (state, action) => {
      return action.payload;
    },
    userLogout: (state, action) => {
      return {}; // initialState를 비워버린다
    },
  },
  extraReducers: (builder) => {
    // 로그인 성공했을때
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      const result = action.payload;
      localStorage.setItem("token", result.token); // 토큰값 담아줌
      localStorage.setItem("user", JSON.stringify(result)); // 유저정보 통째로 담아줌
      return result; // return 하면 state로 자동으로 들어간다
    });
  },
});

export default user;
export const { userSave, userLogout } = user.actions;
