/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TProduct = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  images: string;
  benefits: string;
};

type TInitialState = {
  products: TProduct[];
};

const initialState: TInitialState = {
  products: [],
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
    deleteProduct(state, action) {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { setProductDetails, clearProductDetails } = productSlice.actions;
export default productSlice.reducer;
