import React from "react";

import { useGetAllProductQuery } from "@/redux/api/api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Card from "@/components/Card";

// Define the type for the Product
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string;
}

// Define the response structure for useGetAllProductQuery
interface ProductResponse {
  data: Product[];
}

const Products: React.FC = () => {
  // Type the query hook response properly
  const { data: products }: { data?: ProductResponse } =
    useGetAllProductQuery(undefined);

  // Get the selected category from the Redux store
  const selectedCategory = useSelector(
    (state: RootState) => state?.category?.selectedCategory
  );

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products?.data.filter((product) => product.category === selectedCategory)
    : products?.data;

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-1 space-y-4">
      {filteredProducts?.map((product) => (
        <Card key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Products;
