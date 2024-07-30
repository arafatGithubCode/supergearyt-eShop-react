import "react-multi-carousel/lib/styles.css";
import BannerCategories from "./ui/BannerCategories";
import HomeBanner from "./ui/HomeBanner";
import Highlights from "./ui/Highlights";
import Categories from "./ui/Categories";
import ProductList from "./ui/ProductList";
import DiscountedBanner from "./ui/DiscountedBanner";
import Blog from "./ui/Blog";
import { Toaster } from "react-hot-toast";

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
        {/* blog */}
        <Blog />
        <Toaster
          position="bottom-right"
          reverseOrder={true}
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
            },
          }}
        />
      </main>
    </>
  );
}

export default App;
