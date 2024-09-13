import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, removeFromCart } from "@/redux/features/cartSlice";

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log("cartItems", cartItems);

  const dispatch = useDispatch();

  const handleIncreaseQuantity = (itemId: string) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item) {
      dispatch(addToCart(item));
    }
  };

  const handleDecreaseQuantity = (itemId: string) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item && item.quantity > 1) {
      dispatch(addToCart({ ...item, quantity: -1 })); // Decrease quantity
    } else {
      dispatch(removeFromCart(itemId)); // Remove item if quantity reaches 1
    }
  };

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold">Your cart is empty.</h1>
        <p className="mt-4 text-gray-600">
          Add items to the cart to see them here.
        </p>
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
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <button
                  onClick={() => handleDecreaseQuantity(item._id)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-l-lg"
                >
                  -
                </button>
                <p className="px-4 py-2 bg-gray-100">{item.quantity}</p>
                <button
                  onClick={() => handleIncreaseQuantity(item._id)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-r-lg"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="text-right">
          <h2 className="text-2xl font-semibold">
            Total: ${getTotalPrice().toFixed(2)}
          </h2>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
