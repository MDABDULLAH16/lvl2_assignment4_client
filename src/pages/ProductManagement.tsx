import ProductTable from "@/components/product/ProductTable";
import { TProduct } from "@/components/Types/ProductTypes";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllProductQuery } from "@/redux/api/api";

const ProductManagement = () => {
  const { data: product } = useGetAllProductQuery(undefined);

  if (!product || !product.data) {
    return <p>Loading...</p>;
  }

  const products: TProduct[] = product.data; // Ensure products are of type TProduct

  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead className="">Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Edit</TableHead>
        </TableRow>
      </TableHeader>

      {products.map((item: TProduct) => (
        <ProductTable key={item._id} item={item} />
      ))}
    </Table>
  );
};

export default ProductManagement;
