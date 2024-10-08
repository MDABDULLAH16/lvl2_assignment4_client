import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fitgearhubsever.vercel.app/api",
  }),
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
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products/create-product", // Endpoint to create a product
        method: "POST",
        body: newProduct, // Send the new product data in the body
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ _id, updatedProduct }) => ({
        url: `/products/${_id}`, // Use product ID to specify which product to update
        method: "PATCH",
        body: updatedProduct, // Send the updated product data in the body
      }),
    }),
    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: `/products/${_id}`, // Use product ID to specify which product to delete
        method: "DELETE",
      }),
    }),
    signUp: builder.mutation({
      query: (userInfo) => ({
        url: "/user/sign-up",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllProductQuery,
  useGetAllUserQuery,
  useGetSingleProductQuery,
  useSearchByProductNameQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useSignUpMutation,
  useDeleteProductMutation, // Mutation hook for deleting product
} = baseApi;
