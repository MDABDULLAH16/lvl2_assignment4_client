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

const ProductDetail: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useAppDispatch();
  const { data: products, isLoading, isError } = useGetSingleProductQuery(_id!);
  const product = products?.data;
  useEffect(() => {
    if (product) {
      dispatch(setProductDetails(product));
    }

    // Cleanup function to clear product details when component unmounts
    return () => {
      dispatch(clearProductDetails());
    };
  }, [product, dispatch]);

  const productDetails = useSelector((state: RootState) => state.product);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
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
    <div className="p-4">
      <img
        src={productDetails.images}
        alt={productDetails.name}
        className="w-full h-auto mt-4"
      />
      <h1 className="text-2xl font-bold">{productDetails.name}</h1>
      <p className="text-xl font-semibold mt-2">${productDetails.price}</p>
      <p className="text-md mt-2">Stock: {productDetails.stock}</p>
      <p className="text-md mt-2">Category: {productDetails.category}</p>
      <p className="text-lg mt-2">{productDetails.description}</p>
      <p className="text-lg mt-2">{productDetails.benefits}</p>
    </div>
  );
};

export default ProductDetail;
