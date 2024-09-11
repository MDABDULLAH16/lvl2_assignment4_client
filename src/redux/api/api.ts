import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query({
      query: (_id) => ({
        url: `/products/${_id}`,
        method: "GET",
      }),
    }),
    searchByProductName: builder.query({
      query: (name) => ({
        url: `/products`,
        method: "GET",
        params: { name },
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ _id, updatedProduct }) => ({
        url: `/products/${_id}`, // Use product ID to specify which product to update
        method: "PATCH",
        body: updatedProduct, // Send the updated product data in the body
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useSearchByProductNameQuery,
  useUpdateProductMutation, // Mutation hook for updating product
} = baseApi;
