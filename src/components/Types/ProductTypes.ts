export type TProduct = {
  _id?: string;
  name: string;
  price: number;
  category: string;
  description: string;
  stock: number;
  images: string;
  benefits: string;
};
export type TUserDetails = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin" | "user";
};
