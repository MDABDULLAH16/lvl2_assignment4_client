import HeroSection from "@/components/home/HeroSection";

import Categories from "@/components/home/Categories ";
import FeatureProduct from "@/components/home/FeatureProduct";
import Benefits from "@/components/home/Benefits";
import PhotoAlbum from "@/components/home/PhotoAlbum";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Categories></Categories>
      <FeatureProduct></FeatureProduct>
      <Benefits></Benefits>
      <PhotoAlbum></PhotoAlbum>
    </div>
  );
};

export default Home;
