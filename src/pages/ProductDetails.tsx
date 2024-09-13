import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetSingleProductQuery } from "@/redux/api/api";
import {
  clearProductDetails,
  setProductDetails,
} from "@/redux/features/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice"; // Import addToCart action

const ProductDetail: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useAppDispatch();
  const { data: products, isLoading, isError } = useGetSingleProductQuery(_id!);
  const product = products?.data;

  useEffect(() => {
    if (product) {
      dispatch(setProductDetails(product));
    }

    return () => {
      dispatch(clearProductDetails());
    };
  }, [product, dispatch]);

  const productDetails = useSelector((state: RootState) => state.product);
  // console.log("detais", productDetails);

  const handleAddToCart = () => {
    if (productDetails) {
      dispatch(
        addToCart(
          //   {
          //   _id: productDetails._id,
          //   name: productDetails.name,
          //   price: productDetails.price,
          //   image: productDetails.images, // Assuming there's an image field
          // }
          productDetails
        )
      );
      alert(`${productDetails.name} has been added to your cart!`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Failed to load product details.
      </div>
    );
  }

  if (!productDetails) {
    return <div>No product found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={productDetails.images}
            alt={productDetails.name}
            className="rounded-lg shadow-lg max-h-96 w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {productDetails.name}
          </h1>
          <p className="text-xl font-semibold text-gray-700 mb-4">
            ${productDetails.price}
          </p>

          <p className="text-sm text-gray-600 mb-2">
            Stock: <span className="font-medium">{productDetails.stock}</span>
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Category:{" "}
            <span className="font-medium">{productDetails.category}</span>
          </p>

          <p className="text-gray-700 text-md mt-4">
            {productDetails.description}
          </p>

          <ul className="mt-4 list-disc list-inside text-gray-600">
            {productDetails.benefits?.split(",").map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
