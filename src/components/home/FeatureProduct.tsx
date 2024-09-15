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
    <div className="bg-gray-100 py-4">
      <div className="container bg-gray-100 mx-auto px-6">
        {/* Section Heading */}

        {/* <div className="container mx-auto px-4">
            <h1 className="text-center mt-0 md:font-extrabold md:text-4xl text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 tracking-wide">
              Featured Products
            </h1>
          </div> */}
        <h1 className="md:text-5xl lg:text-5xl md:font-extrabold lg:font-extrabold text-center md:mb-12  mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-text shadow-lg p-4 rounded-lg">
          Featured Product
        </h1>

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
