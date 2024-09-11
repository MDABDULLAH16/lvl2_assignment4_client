import React from "react";
import { useGetAllProductQuery } from "@/redux/api/api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Card, { TProductProps } from "@/components/home/Card";
import { JSX } from "react/jsx-runtime";

// Define the type for the Product
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string;
}

// Define the response structure for useGetAllProductQuery
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ProductResponse {
  data: Product[];
}

const Products: React.FC = () => {
  // Destructure query hook response
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductQuery(undefined);

  // Get the selected category from the Redux store
  const selectedCategory = useSelector(
    (state: RootState) => state?.category?.selectedCategory
  );

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products?.data.filter(
        (product: { category: string }) => product.category === selectedCategory
      )
    : products?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        <span className="ml-3 text-lg text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Failed to load products
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-1 space-y-4">
      {filteredProducts?.map(
        (product: JSX.IntrinsicAttributes & TProductProps) => (
          <Card key={product.category} {...product} />
        )
      )}
    </div>
  );
};

export default Products;
