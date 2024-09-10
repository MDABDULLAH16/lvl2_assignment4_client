import { useGetAllProductQuery } from "@/redux/api/api";
import CategoryCard from "./CategoryCard";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategory } from "@/redux/features/categorySlice";

// Define the structure of the product data
interface Product {
  category: string;
  images: string[]; // Array of image URLs for the product
}

const Categories: React.FC = () => {
  const { data: products } = useGetAllProductQuery(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get unique categories and their representative image (first product's image in each category)
  const categories = Array.from(
    products?.data.reduce((acc: Map<string, string>, product: Product) => {
      if (!acc.has(product.category)) {
        acc.set(product.category, product.images[0]); // Use the first image of the first product in each category
      }
      return acc;
    }, new Map<string, string>())
  ) as [string, string][]; // Explicitly type as tuple [category, image] array

  const handleCategoryClick = (category: string) => {
    dispatch(setCategory(category)); // Set the selected category in the Redux store
    navigate("/products"); // Navigate to the Products page
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map(([category, image], index) => (
        <CategoryCard
          key={index}
          title={category} // Category name
          image={image} // Category image
          onClick={() => handleCategoryClick(category)} // Handle category click
        />
      ))}
    </div>
  );
};

export default Categories;
