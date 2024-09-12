import React, { useState } from "react";
import { useCreateProductMutation } from "@/redux/api/api";

const AddNewProduct = () => {
  const [createProduct, { isLoading, isSuccess, error }] =
    useCreateProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    price: Number(0),
    category: "",
    description: "",
    stock: Number(0),
    images: "",
    benefits: "",
  });

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

    // Convert price and stock to numbers before submitting
    const dataToSubmit = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      await createProduct(dataToSubmit).unwrap(); // Calls the createProduct mutation with the converted data
      alert("Product created successfully!");
      setFormData({
        name: "",
        price: 0,
        category: "",
        description: "",
        stock: 0,
        images: "",
        benefits: "",
      });
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center text-gray-700">
        Add New Product
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
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Add Product"}
          </button>
          {isSuccess && (
            <p className="text-green-500 mt-4">Product created successfully!</p>
          )}
          {error && (
            <p className="text-red-500 mt-4">
              Failed to create product. Please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
