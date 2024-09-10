import { ReactNode } from "react";
type TTodoContainerProps = {
  children: ReactNode;
};
const Container = ({ children }: TTodoContainerProps) => {
  return <div className="h-screen w-full max-w-5xl mx-auto ">{children}</div>;
};

export default Container;
