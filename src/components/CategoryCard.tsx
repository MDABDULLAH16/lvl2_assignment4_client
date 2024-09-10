import React from "react";

// Define props with title and image
interface CategoryCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border p-4 rounded-lg shadow hover:shadow-lg"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-center mt-2 text-lg font-bold">{title}</h3>
    </div>
  );
};

export default CategoryCard;
