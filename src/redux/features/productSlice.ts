/* eslint-disable @typescript-eslint/no-explicit-any */
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
  products: TProduct[]; // Explicitly define the 'products' property
  [x: string]: any; // Allow additional properties of any type if needed
};

const initialState: TInitialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductDetails(_state, action: PayloadAction<TInitialState>) {
      return action.payload;
    },
    clearProductDetails() {
      return initialState;
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { setProductDetails, clearProductDetails, deleteProduct } =
  productSlice.actions;
export default productSlice.reducer;
