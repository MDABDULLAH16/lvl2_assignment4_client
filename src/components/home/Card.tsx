export type TProductProps = {
  name: string;
  price: number;
  category: string; // Assuming it's a string now
  description: string;
  stock: number;
  images: string;
};

const Card = ({ name, images, price, description }: TProductProps) => {
  return (
    <div className="card bg-base-100 max-w-96 mx-auto shadow-xl">
      <figure className="px-5 pt-5">
        <img src={images} alt={name} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <p>${price}</p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
