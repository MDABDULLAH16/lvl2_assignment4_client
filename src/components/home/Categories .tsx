import React from "react";
import { useGetAllProductQuery } from "@/redux/api/api";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "@/redux/features/categorySlice";

// Define the structure of the product data
interface Product {
  category: string;
  images: string; // Single image URL as a string
}

const Categories: React.FC = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductQuery(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading categories...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center bg-red-50">
        <div className="text-2xl font-semibold text-red-600">
          Error: Failed to load categories
        </div>
      </div>
    );
  }

  // Helper function to get a random product's image from the array of images in each category
  const getRandomImage = (images: string[]) => {
    return images[Math.floor(Math.random() * images.length)];
  };

  // Group products by category and collect their image URLs
  const categoryImages: [string, string[]][] = products?.data
    ? Array.from(
        products.data.reduce((acc: Map<string, string[]>, product: Product) => {
          if (!acc.has(product.category)) {
            acc.set(product.category, [product.images]); // Start with the first product's image
          } else {
            acc.get(product.category)?.push(product.images); // Add subsequent product images if the category already exists
          }
          return acc;
        }, new Map<string, string[]>())
      )
    : [];

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category)); // Set the selected category in the Redux store
    navigate(`/products?category=${encodeURIComponent(category)}`); // Navigate to the Products page with the selected category as a query parameter
  };

  return (
    <div className="min-h-screen mb-0 bg-gradient-to-b from-gray-50 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-md py-6 mb-4">
        <div className="container mx-auto px-4">
          <h1 className="text-center md:font-extrabold md:text-4xl mt-2 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 tracking-wide">
            Choice Your Favorite Category
          </h1>
        </div>
      </header>

      {/* Category Section */}
      <section className="container mx-auto px-4 py-4">
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
          {categoryImages.length > 0 ? (
            categoryImages.map(([category, images], index) => (
              <CategoryCard
                key={index}
                title={category}
                image={getRandomImage(images)} // Get a random image for this category
                onClick={() => handleCategoryClick(category)}
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-700">
              No categories available
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Categories;
