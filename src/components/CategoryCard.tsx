import React from "react";

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
      className="cursor-pointer bg-white border p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl group"
    >
      <div className="overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-lg transform transition duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-center mt-4 text-xl font-bold text-gray-800 group-hover:text-blue-500">
        {title}
      </h3>
    </div>
  );
};

export default CategoryCard;
