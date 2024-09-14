import React, { useEffect, useState } from "react";
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [alreadyInCartMessage, setAlreadyInCartMessage] = useState(false); // State for "already in cart" message
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
  const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items from state

  const handleAddToCart = () => {
    if (productDetails) {
      // Check if the product is already in the cart
      const isInCart = cartItems.some(
        (item) => item._id === productDetails._id
      );

      if (isInCart) {
        // Show "already in cart" message
        setAlreadyInCartMessage(true);
        setTimeout(() => setAlreadyInCartMessage(false), 2000); // Clear message after 3 seconds
      } else {
        // Add to cart if not already in cart
        dispatch(addToCart(productDetails));
        setShowSuccessModal(true);
      }
    }
  };

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        // navigate("/cart");

        // Navigate to the cart page after 3 seconds
      }, 3000); // Show modal for 3 seconds

      // Clean up the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

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

          {/* Display the "already in cart" message */}
          {alreadyInCartMessage && (
            <p className="text-red-500 mt-2">{alreadyInCartMessage}</p>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md transform transition-all duration-500 ease-in-out scale-0 opacity-0 animate-scale-up-fade-in">
            <h2 className="text-2xl font-semibold text-green-600">Success!</h2>
            <p className="text-gray-700 mt-4">
              Your product has been added to the cart successfully.
            </p>
          </div>
        </div>
      )}
      {alreadyInCartMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md transform transition-all duration-500 ease-in-out scale-0 opacity-0 animate-scale-up-fade-in">
            <h2 className="text-2xl font-semibold text-green-600">Hey!</h2>
            <p className="text-gray-700 mt-4">
              Your product has been Already added to the cart successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
