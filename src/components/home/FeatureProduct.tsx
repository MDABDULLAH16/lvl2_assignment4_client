import { useGetAllProductQuery } from "@/redux/api/api";
import FeaturedCard from "./FeaturedCard";
import { useNavigate } from "react-router-dom";
import { TProductProps } from "./Card";

const FeatureProduct: React.FC = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductQuery(undefined);
  const navigate = useNavigate();

  const shuffleArray = (array: TProductProps[]) => {
    const copy = [...array];
    return copy.sort(() => Math.random() - 0.5);
  };

  const featuredProducts = products?.data
    ? shuffleArray(products.data).slice(0, 3)
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading Products...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center bg-red-50">
        <div className="text-2xl font-semibold text-red-600">
          Error: Failed to load Featured Product
        </div>
      </div>
    );
  }

  const handleShowMore = () => {
    navigate("/products");
  };

  return (
    <div className="bg-gray-100 py-14">
      <div className="container mx-auto px-6">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Featured Products
        </h2>

        {/* Featured Products Grid */}
        <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2">
          {featuredProducts.map((product: TProductProps) => (
            <FeaturedCard {...product} key={product.description} />
          ))}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleShowMore}
            className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
