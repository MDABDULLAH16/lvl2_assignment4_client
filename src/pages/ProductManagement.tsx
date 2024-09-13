import ProductTable from "@/components/product/ProductTable";
import { TProduct } from "@/components/Types/ProductTypes";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllProductQuery } from "@/redux/api/api";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  const {
    data: product,
    isLoading,
    refetch,
  } = useGetAllProductQuery(undefined);
  // Automatically refetch products when the page is visited
  useEffect(() => {
    refetch();
  }, [refetch]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        <span className="ml-3 text-lg text-gray-600">Loading products...</span>
      </div>
    );
  }

  if (!product || !product.data) {
    return (
      <div className="text-red-500 text-center mt-4">
        Failed to load products
      </div>
    );
  }
  const products: TProduct[] = product.data;

  return (
    <div className="overflow-x-auto">
      <Table className="table-auto w-full shadow-lg rounded-lg bg-white transition-transform duration-500 hover:shadow-2xl">
        <TableHeader className=" bg-gray-300">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">
              <Link
                to="/add-product"
                className="btn  btn-primary bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 my-2 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Add New Product
              </Link>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item: TProduct) => (
            <ProductTable key={item._id} item={item} refetch={refetch} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductManagement;
