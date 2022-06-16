import Annoucement from "../components/Annoucment/Annoucement";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import Products from "../components/Products/Products";
import Slider from "../components/Slider/Slider";

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Annoucement />
      <Slider />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
