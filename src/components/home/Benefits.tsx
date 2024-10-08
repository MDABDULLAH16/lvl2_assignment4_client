import { useGetAllProductQuery } from "@/redux/api/api";
import { TProduct } from "../Types/ProductTypes";

const Benefits = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading Benefits...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center bg-red-50">
        <div className="text-2xl font-semibold text-red-600">
          Error: Failed to load Benefits
        </div>
      </div>
    );
  }
  // Get the first 6 products
  const displayedProducts = products?.data.slice(0, 6);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container bg-gray-100 mx-auto px-4">
        <h1 className="md:text-5xl lg:text-5xl md:font-extrabold lg:font-extrabold text-center md:mb-12  mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-text shadow-lg p-4 rounded-lg">
          Product Benefits
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProducts?.map((product: TProduct) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl group"
          >
            <img
              src={product.images}
              alt={product.name}
              className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="p-6 transition-opacity duration-300 ease-in-out group-hover:bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-green-700 font-medium">{product.benefits}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
