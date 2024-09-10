import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoryState {
  selectedCategory: string;
}
const initialState: CategoryState = {
  selectedCategory: "",
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    clearCategory(state) {
      state.selectedCategory = ""; // Reset category when needed
    },
  },
});

export const { setCategory, clearCategory } = categorySlice.actions;
export default categorySlice.reducer;
