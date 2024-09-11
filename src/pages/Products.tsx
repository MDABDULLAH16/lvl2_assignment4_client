import React, { useState, useEffect } from "react";
import {
  useGetAllProductQuery,
  useSearchByProductNameQuery,
} from "@/redux/api/api";
import Card, { TProductProps } from "@/components/home/Card";
import { useLocation } from "react-router-dom";

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category");

  // Fetch all products
  const {
    data: allProducts,
    isLoading: allProductsLoading,
    isError: allProductsError,
  } = useGetAllProductQuery(undefined);

  // Fetch search results if search term is provided
  const {
    data: searchResults,
    isLoading: searchLoading,
    isError: searchError,
  } = useSearchByProductNameQuery(searchTerm || "");

  // Combine search results with all products
  const products = searchTerm ? searchResults?.data : allProducts?.data;

  useEffect(() => {
    if (allProducts?.data) {
      const uniqueCategories = [
        ...new Set(
          allProducts.data.map((product: TProductProps) => product.category)
        ),
      ];
      setCategories(uniqueCategories);
    }

    // Set the default selected category from URL query parameter
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [allProducts, categoryFromUrl]);

  const sortProducts = (productsToSort: TProductProps[]) => {
    if (sortOrder === "asc") {
      return productsToSort.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      return productsToSort.sort((a, b) => b.price - a.price);
    }
    return productsToSort;
  };

  const filteredProducts = products?.filter((product: TProductProps) =>
    selectedCategory ? product.category === selectedCategory : true
  );

  const sortedProducts = sortProducts(filteredProducts || []);

  const clearFilters = () => {
    setSelectedCategory(null);
    setSortOrder(null);
    setSearchTerm("");
  };

  if (allProductsLoading || searchLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        <span className="ml-3 text-lg text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (allProductsError || searchError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Failed to load products
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* Search, Filter, and Sorting Controls */}
      <div className="mb-4 flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
        {/* Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products by name"
          className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />

        {/* Category Filter Dropdown */}
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Sorting Options */}
        <select
          value={sortOrder || ""}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        {/* Clear Filter Button */}
        <button
          onClick={clearFilters}
          className="p-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
        >
          Clear Filters
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 m-4 gap-8 animate-fade-in">
        {sortedProducts?.map(
          (product: JSX.IntrinsicAttributes & TProductProps) => (
            <div
              key={product.name}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <Card key={product.name} {...product} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Products;
