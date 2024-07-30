import { useEffect, useState } from "react";
import { store } from "../lib/store";
import { IProductProps } from "../types";
import toast from "react-hot-toast";
import { FaRegEye, FaRegStar, FaStar } from "react-icons/fa";

const ProductCardSideNav = ({ product }: { product: IProductProps }) => {
  const { addToFavorite, favoriteProduct } = store();
  const [existingProduct, setExistingProduct] = useState<IProductProps | null>(
    null
  );

  useEffect(() => {
    const availableProduct = favoriteProduct.find(
      (item) => item._id === product._id
    );

    setExistingProduct(availableProduct || null);
  }, [favoriteProduct, product]);

  const handleFavorite = () => {
    if (product) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? `${product?.name.substring(0, 10)} removed from favorite!`
            : `${product?.name.substring(0, 10)} added to favorite!`
        );
      });
    }
  };
  return (
    <div className="absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
      <span
        onClick={handleFavorite}
        className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200"
      >
        {existingProduct ? <FaStar /> : <FaRegStar />}
      </span>
      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
        <FaRegEye />
      </span>
    </div>
  );
};

export default ProductCardSideNav;
