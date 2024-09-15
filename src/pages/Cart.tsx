import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, updateCartQuantity } from "@/redux/features/cartSlice";
import { useNavigate } from "react-router-dom"; // useNavigate replaces useHistory
import emptyCart from "../assets/empty-cart.png";

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate hook

  // Page Refresh Warning
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (cartItems.length > 0) {
        event.preventDefault();
        event.returnValue = ""; // Standard way to trigger the warning dialog
      }
    };

    // Add the event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartItems]);

  // Increase product quantity (ensure it doesn't exceed stock)
  const handleIncreaseQuantity = (itemId: string, stock: number) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item && item.quantity < stock) {
      dispatch(
        updateCartQuantity({ _id: item._id, quantity: item.quantity + 1 })
      );
    }
  };

  // Decrease product quantity or remove if it reaches 1
  const handleDecreaseQuantity = (itemId: string) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item && item.quantity > 1) {
      dispatch(
        updateCartQuantity({ _id: item._id, quantity: item.quantity - 1 })
      );
    } else {
      handleRemoveItem(itemId); // If quantity is 1, remove the item
    }
  };

  // Remove item with confirmation prompt
  const handleRemoveItem = (itemId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this item?"
    );
    if (confirmed) {
      dispatch(removeFromCart(itemId));
    }
  };

  // Calculate total price dynamically
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Navigate to checkout page if stock is available
  const handleCheckout = () => {
    const outOfStockItems = cartItems.filter((item) => item.stock <= 0);
    if (outOfStockItems.length === 0) {
      navigate("/checkout"); // Replaces history.push("/checkout")
    } else {
      alert("Some items are out of stock and cannot proceed to checkout.");
    }
  };

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
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.images}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
                <p className="text-gray-500">Stock: {item.stock}</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4  space-y-2 items-center ">
              <div className="flex md:mt-2 items-center">
                {/* Decrease Quantity */}
                <button
                  onClick={() => handleDecreaseQuantity(item._id)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-l-lg"
                >
                  -
                </button>

                {/* Quantity Display */}
                <p className="px-4 py-2 bg-gray-100">{item.quantity}</p>

                {/* Increase Quantity */}
                <button
                  onClick={() => handleIncreaseQuantity(item._id, item.stock)}
                  disabled={item.quantity >= item.stock} // Disable if quantity reaches stock
                  className={`px-3 py-1 bg-gray-200 text-gray-800 rounded-r-lg ${
                    item.quantity >= item.stock
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  +
                </button>
              </div>

              {/* Remove Item Button */}
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {/* Pricing Summary */}
        <div className="text-right">
          <h2 className="text-2xl font-semibold">
            Total: ${getTotalPrice().toFixed(2)}
          </h2>

          {/* Proceed to Checkout */}
          <button
            onClick={handleCheckout}
            className={`mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg ${
              cartItems.some((item) => item.stock <= 0)
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            disabled={cartItems.some((item) => item.stock <= 0)} // Disable if any item is out of stock
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
