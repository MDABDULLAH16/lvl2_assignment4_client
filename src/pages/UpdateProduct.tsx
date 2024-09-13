import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/api/api";
import {
  clearProductDetails,
  setProductDetails,
} from "@/redux/features/productSlice";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductUpdate: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    stock: 0,
    images: "",
    benefits: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useAppDispatch();

  // Fetch single product data
  const { data: products, isLoading, isError } = useGetSingleProductQuery(_id!);
  const product = products?.data;

  // Define mutation hook for updating the product
  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess, isError: updateError },
  ] = useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        stock: product.stock,
        images: product.images,
        benefits: product.benefits,
      });

      dispatch(setProductDetails(product));
    }

    // Cleanup function to clear product details when component unmounts
    return () => {
      dispatch(clearProductDetails());
    };
  }, [product, dispatch]);

  const productDetails = useSelector((state: RootState) => state.product);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    // Call the update mutation with the product ID and updated product data
    await updateProduct({ _id, updatedProduct: dataToSubmit });
  };

  // Open modal when the product update is successful
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessModal(true);
    }
  }, [isSuccess]);

  // Close modal after a few seconds
  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000); // Show modal for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  if (isLoading || isUpdating) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (isError || updateError) {
    return (
      <div className="text-red-500 text-center mt-4">
        Failed to load or update product details.
      </div>
    );
  }

  if (!productDetails) {
    return <div>No product found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Update Product
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Product Name */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Price */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Category */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter product category"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Description */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            rows={2}
            required
          />
        </div>

        {/* Stock */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Images */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">
            Product Image URL
          </label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            required
          />
        </div>

        {/* Benefits */}
        <div className="relative">
          <label className="block text-gray-700 font-medium">Benefits</label>
          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            placeholder="Enter product benefits"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            rows={4}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md transform transition-all duration-500 ease-in-out scale-0 opacity-0 animate-scale-up-fade-in">
            <h2 className="text-2xl font-semibold text-green-600">Success!</h2>
            <p className="text-gray-700 mt-4">
              Your product has been Updated successfully.
            </p>
            {/* <button
              className="mt-6 bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition-transform duration-300 transform hover:scale-105"
              onClick={closeModal}
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductUpdate;
