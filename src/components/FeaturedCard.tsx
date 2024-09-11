import React from "react";
import { TProductProps } from "./Card";

const FeaturedCard: React.FC<TProductProps> = ({
  name,
  images,
  category,
  price,
  description,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
      <figure className="relative w-full h-48">
        <img src={images} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 bg-yellow-400 text-white text-xs font-bold py-1 px-2 rounded">
          NEW
        </div>
      </figure>
      <div className="p-4">
        <h2 className="font-bold text-xl text-gray-800 mb-2">{name}</h2>
        <p className="text-gray-600 mb-4 truncate">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-blue-500">${price}</span>
          <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-lg">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
