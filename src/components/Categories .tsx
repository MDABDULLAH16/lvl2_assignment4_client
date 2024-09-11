import { useGetAllProductQuery } from "@/redux/api/api";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "@/redux/features/categorySlice";

interface Product {
  category: string;
  images: string; // Array of image URLs for the product
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
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-2xl font-semibold text-red-600">
          Error: Failed to load categories
        </div>
      </div>
    );
  }

  const categories = products?.data
    ? (Array.from(
        products?.data.reduce((acc: Map<string, string>, product: Product) => {
          if (!acc.has(product?.category)) {
            acc.set(product?.category, product?.images[0]); // Use the first image of the first product in each category
          }
          return acc;
        }, new Map<string, string>())
      ) as [string, string][]) // Explicitly cast to tuple [category, image] array
    : [];

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category)); // Set the selected category in the Redux store
    navigate("/products"); // Navigate to the Products page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-md py-6 mb-4">
        <div className="container mx-auto px-4">
          <h1 className="text-center font-extrabold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 tracking-wide">
            Choose Your Category
          </h1>
        </div>
      </header>

      {/* Category Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1">
          {categories.length > 0 ? (
            categories.map(([category, images], index) => (
              <CategoryCard
                key={index}
                title={category}
                image={images}
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
