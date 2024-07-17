import "react-multi-carousel/lib/styles.css";
import BannerCategories from "./ui/BannerCategories";
import HomeBanner from "./ui/HomeBanner";
import Highlights from "./ui/Highlights";

function App() {
  return (
    <>
      <main>
        <BannerCategories />
        <HomeBanner />
        <Highlights />
      </main>
    </>
  );
}

export default App;
