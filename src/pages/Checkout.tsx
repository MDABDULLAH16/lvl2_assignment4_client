import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useUpdateProductMutation } from "@/redux/api/api"; // Import the updateProduct mutation
import { clearCart } from "@/redux/features/cartSlice";
import emptyCart from "../assets/empty-cart.png";
// Predefined fake user data (for demo purposes, simulating a logged-in user)
const fakeUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  address: "1234 Elm St, Springfield, IL",
};

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const CheckoutPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Pre-fill form with fake user data
  const [userDetails, setUserDetails] = useState<UserDetails>(fakeUserData);
  const [paymentMethod, setPaymentMethod] = useState<string>("COD"); // Default payment method: Cash on Delivery
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Use the updateProduct mutation
  const [updateProduct] = useUpdateProductMutation();

  // Handle input changes for the form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  // Check if the form is valid
  const isFormValid = () => {
    return (
      userDetails.name &&
      userDetails.email &&
      userDetails.phone &&
      userDetails.address &&
      paymentMethod
    );
  };

  // Handle form submission and show success modal
  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      alert("Please fill out all fields.");
      return;
    }

    console.log("Order placed with details:", {
      userDetails,
      cartItems,
      totalAmount,
      paymentMethod,
    });

    // Update stock for each product in the cart
    try {
      for (const item of cartItems) {
        const newStock = item.stock - item.quantity;

        // Call the updateProduct mutation
        await updateProduct({
          _id: item._id,
          updatedProduct: { stock: newStock },
        });
      }

      // Show success modal after updating stock
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("An error occurred while updating product stock.");
    }
  };

  // Handle showing modal for 3 seconds and then navigate to the cart page
  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/cart");
        dispatch(clearCart());
        // Navigate to the cart page after 3 seconds
      }, 3000); // Show modal for 3 seconds

      // Clean up the timer on component unmount
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, navigate, dispatch]);
  const handleContinueShopping = () => {
    navigate("/products"); // Update this to navigate to your product listing or home page
  };
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 bg-gradient-to-r from-blue-100 to-purple-100">
        {/* Empty Cart Illustration */}
        <img
          src={emptyCart}
          alt="Empty Cart"
          className="w-2/3 md:w-1/3 max-w-xs mb-6 animate-bounce-slow"
        />

        {/* Empty Cart Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Your Cart is <span className="text-[#FF5A66]">Empty</span>
        </h1>
        <p className="text-gray-600 mb-8 text-center max-w-md md:max-w-lg">
          Looks like you haven't added anything to your cart yet. Start shopping
          and find products you'll love.
        </p>

        {/* Continue Shopping Button */}
        <button
          onClick={handleContinueShopping}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-600 transition duration-300 transform hover:scale-105"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* User Details Form */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Delivery Address
          </label>
          <textarea
            id="address"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            placeholder="Delivery Address"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="cod"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
            className="mr-2"
          />
          <label htmlFor="cod" className="text-gray-700">
            Cash on Delivery
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="stripe"
            name="payment"
            value="Stripe"
            checked={paymentMethod === "Stripe"}
            onChange={() => setPaymentMethod("Stripe")}
            className="mr-2"
          />
          <label htmlFor="stripe" className="text-gray-700">
            Stripe
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-gray-200 mb-4">
          {cartItems.map((item) => (
            <li key={item._id} className="flex justify-between py-4">
              <div>
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
        <div className="text-right">
          <h3 className="text-xl font-semibold">
            Total: ${totalAmount.toFixed(2)}
          </h3>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className={`mt-6 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 ${
          !isFormValid() ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"
        }`}
        disabled={!isFormValid()} // Disable button if form is not valid
      >
        Place Order
      </button>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-semibold text-green-600">Success!</h2>
            <p className="text-gray-700 mt-4">
              Your order has been placed successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
