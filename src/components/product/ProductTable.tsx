import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TProduct } from "../Types/ProductTypes";
type ProductTableProps = {
  item: TProduct; // Expecting item to be of type TProduct
};
const ProductTable = ({ item }: ProductTableProps) => {
  return (
    <TableBody>
      <TableRow className=" mx-6">
        <TableCell className="font-medium">{item.name}</TableCell>
        <TableCell>{item.price}</TableCell>
        <TableCell>{item.category}</TableCell>
        <TableCell className="text-right">
          <p className="space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300">
              Delete
            </button>
          </p>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default ProductTable;
