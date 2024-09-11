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

  const handleShowMore = () => {
    navigate("/products");
  };

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto">
        {/* Featured Products Grid */}
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
          {featuredProducts.map((product: TProductProps) => (
            <FeaturedCard {...product} key={product.description} />
          ))}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
