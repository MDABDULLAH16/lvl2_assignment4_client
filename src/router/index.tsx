import App from "@/App";
import AboutUs from "@/pages/AboutUs";
import AddNewProduct from "@/pages/AddNewProduct";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ProductDetails from "@/pages/ProductDetails";
import ProductManage from "@/pages/ProductManagement";
import Products from "@/pages/Products";
import SignUp from "@/pages/SignUp";
import ProductUpdate from "@/pages/UpdateProduct";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/product-management",
        element: <ProductManage />,
      },
      {
        path: "/product-details",
        element: <ProductDetails />,
      },
      {
        path: "/product-details/:_id",
        element: <ProductDetails />,
      },
      {
        path: "/update-product/:_id",
        element: <ProductUpdate />,
      },
      {
        path: "/add-product",
        element: <AddNewProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
export default router;
