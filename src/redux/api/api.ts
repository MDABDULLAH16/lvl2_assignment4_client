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
        url: `/products/${_id}`, // Construct the URL using the product ID
        method: "GET",
      }),
    }),
    searchByProductName: builder.query({
      query: (name) => ({
        url: `/products`,
        method: "GET",
        params: { name }, // Pass name as a query parameter
      }),
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useSearchByProductNameQuery,
} = baseApi;
