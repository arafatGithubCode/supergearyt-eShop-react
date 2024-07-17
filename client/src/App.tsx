import "react-multi-carousel/lib/styles.css";
import BannerCategories from "./ui/BannerCategories";
import HomeBanner from "./ui/HomeBanner";
import Highlights from "./ui/Highlights";
import Categories from "./ui/Categories";
import ProductList from "./ui/ProductList";
import DiscountedBanner from "./ui/DiscountedBanner";

function App() {
  return (
    <>
      <main>
        <BannerCategories />
        <HomeBanner />
        <Highlights />
        <Categories />
        {/* product list */}
        <ProductList />
        {/* discounted banner */}
        <DiscountedBanner />
      </main>
    </>
  );
}

export default App;
