import { Link } from "react-router-dom";

export type TProductProps = {
  _id: string;
  name: string;
  price: number;
  category: string; // Assuming it's a string now
  description: string;
  stock: number;
  images: string;
};

const Card = ({ _id, name, images, price, description }: TProductProps) => {
  console.log(_id);

  return (
    <div className="card bg-base-100 max-w-96 mx-auto shadow-xl">
      <figure className="px-5 pt-5">
        <img src={images} alt={name} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <p className="text-xl font-semibold">${price}</p>
        <div className="card-actions">
          <Link
            to={`/product-details/${_id}`}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white  py-2 px-3 rounded-lg shadow-inner focus:outline-none transition ease-in-out duration-150"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
