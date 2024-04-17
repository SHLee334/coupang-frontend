import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/public/",
});

export const getCategories = async () => {
  return await instance.get("category");
};

export const getProducts = async (page) => {
  return await instance.get("product?page=" + page);
};

export const getProduct = async (code) => {
  return await instance.get("product/" + code);
};
