import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  price: 0,
  category: [],
  description: "",
  stock: 0,
  images: "",
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});
