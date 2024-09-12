import { TableCell, TableRow } from "@/components/ui/table";
import { TProduct } from "../Types/ProductTypes";
import { useDeleteProductMutation } from "@/redux/api/api"; // Import the mutation hook

type ProductTableProps = {
  item: TProduct;
  refetch: () => void; // Accept refetch function as a prop
};

const ProductTable = ({ item, refetch }: ProductTableProps) => {
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation(); // Use the delete mutation hook

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      try {
        await deleteProduct(item._id).unwrap(); // Call the delete mutation with the product ID
        alert(`${item.name} deleted successfully!`);
        refetch(); // Refetch products after successful deletion
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <TableRow className="border-b hover:bg-gray-100 transition-colors duration-300">
      <TableCell className="font-medium py-4 px-6 text-gray-700">
        {item.name}
      </TableCell>
      <TableCell className="py-4 px-6 text-gray-600">
        ${item.price.toFixed(2)}
      </TableCell>
      <TableCell className="py-4 px-6 text-gray-600">{item.category}</TableCell>
      <TableCell className="py-4 px-6 text-right">
        <div className="space-x-4">
          <button className="btn btn-info bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting} // Disable the button if the delete request is in progress
            className={`btn btn-error bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300 ${
              isDeleting && "opacity-50 cursor-not-allowed"
            }`}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProductTable;
