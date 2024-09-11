/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductQuery } from "@/redux/api/api";

const PhotoAlbum = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">
          Loading Product Gallery...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center bg-red-50">
        <div className="text-2xl font-semibold text-red-600">
          Error: Failed to load Image Gallery
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-text shadow-lg p-4 rounded-lg">
        Explore Our Stunning Product Gallery
      </h1>
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
        {products?.data?.slice(0, 15).map((product: any) => (
          <div
            key={product._id}
            className="mb-4 break-inside-avoid transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
          >
            <img
              className="w-full h-auto object-cover rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl"
              alt={product.name}
              src={product.images} // Image source
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoAlbum;
