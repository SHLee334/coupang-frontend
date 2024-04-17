import { configureStore } from "@reduxjs/toolkit";
import user from "./user";

const store = configureStore({
  reducer: { user: user.reducer }, // store의 user.js에서 값 받아온다
});
export default store;
