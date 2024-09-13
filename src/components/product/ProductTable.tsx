import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { TProduct } from "../Types/ProductTypes";
import { useDeleteProductMutation } from "@/redux/api/api";
import { Link } from "react-router-dom";

type ProductTableProps = {
  item: TProduct;
  refetch: () => void;
};

const ProductTable = ({ item, refetch }: ProductTableProps) => {
  const [deleteProduct] = useDeleteProductMutation(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(item._id).unwrap(); // Delete the product
      console.log(`Product ${item.name} deleted successfully.`);
      setIsModalOpen(false);
      refetch();
      // Close the modal after deletion
    } catch (err) {
      console.error("Failed to delete the product: ", err);
    }
  };

  return (
    <>
      <TableRow className="border-b hover:bg-gray-100 transition-colors duration-300">
        <TableCell className="font-medium py-4 px-6 text-gray-700">
          {item.name}
        </TableCell>
        <TableCell className="py-4 px-6 text-gray-600">
          ${item.price.toFixed(2)}
        </TableCell>
        <TableCell className="py-4 px-6 text-gray-600">
          {item.category}
        </TableCell>
        <TableCell className="py-4 px-6 text-right">
          <div className="space-x-4">
            <Link
              to={`/update-product/${item._id}`}
              className="btn btn-info bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Update
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-error bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Delete
            </button>
          </div>
        </TableCell>
      </TableRow>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div
          id="popup-modal"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-lg">
            <button
              type="button"
              className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-2"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 1"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Are you sure you want to delete this product?
              </h3>
              <button
                onClick={handleDelete}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
