import React, { useState } from "react";
import {
  useGetAllProductQuery,
  useSearchByProductNameQuery,
} from "@/redux/api/api";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Card, { TProductProps } from "@/components/home/Card";
import { JSX } from "react/jsx-runtime";

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all products if no search term is entered
  const {
    data: allProducts,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetAllProductQuery(undefined);

  // Fetch products by name when a search term is provided
  const {
    data: searchedProducts,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useSearchByProductNameQuery(searchTerm, {
    skip: !searchTerm, // Skip querying if searchTerm is empty
  });

  // Get the selected category from the Redux store
  const selectedCategory = useSelector(
    (state: RootState) => state?.category?.selectedCategory
  );

  // Filter products based on the selected category and search results
  const products = searchTerm ? searchedProducts?.data : allProducts?.data;

  const filteredProducts = selectedCategory
    ? products?.filter(
        (product: { category: string }) => product.category === selectedCategory
      )
    : products;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Loading and Error handling
  if (isLoadingAll || isLoadingSearch) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        <span className="ml-3 text-lg text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (isErrorAll || isErrorSearch) {
    return (
      <div className="text-red-500 text-center mt-4">
        Failed to load products
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by product name"
          className="border p-2 w-full md:w-1/2 lg:w-1/3"
        />
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-1 space-y-4">
        {filteredProducts?.map(
          (product: JSX.IntrinsicAttributes & TProductProps) => (
            <Card key={product._id} {...product} />
          )
        )}
      </div>
    </div>
  );
};

export default Products;
