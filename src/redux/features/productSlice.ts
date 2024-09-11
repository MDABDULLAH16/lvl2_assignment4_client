/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  images: string;
  benefits: string;
}

const initialState: ProductState = {
  name: "",
  price: 0,
  category: "",
  description: "",
  stock: 0,
  images: "",
  benefits: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductDetails(state, action: PayloadAction<ProductState>) {
      return action.payload;
    },
    clearProductDetails(state) {
      return initialState;
    },
  },
});

export const { setProductDetails, clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
