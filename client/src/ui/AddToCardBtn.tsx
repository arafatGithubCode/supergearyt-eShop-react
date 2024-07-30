import { useEffect, useState } from "react";
import { IProductProps } from "../types";
import { store } from "../lib/store";
import PriceTag from "./PriceTag";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { FaMinus, FaPlus } from "react-icons/fa";

type TProps = {
  className?: string;
  title?: string;
  product: IProductProps;
  showPrice?: boolean;
};
const AddToCardBtn = ({
  product,
  showPrice = true,
  className,
  title,
}: TProps) => {
  const [existingProduct, setExistingProduct] = useState<IProductProps | null>(
    null
  );

  const { addToCart, cartProduct, decreaseQuantity } = store();

  useEffect(() => {
    const availableItem = cartProduct.find(
      (item) => item?._id === product?._id
    );

    setExistingProduct(availableItem || null);
  }, [cartProduct, product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success(`${product?.name.substring(0, 10)} added successfully!`);
    } else {
      toast.error("This product doesn't exist!");
    }
  };

  const handleDeleteProduct = () => {
    if (existingProduct) {
      if (existingProduct?.quantity > 1) {
        decreaseQuantity(existingProduct?._id);
        toast.success(
          `${product?.name.substring(0, 10)} decrease successfully!`
        );
      } else {
        toast.error("You can't decrease less then 1");
      }
    } else {
      console.log("error to decrease product");
    }
  };

  const newClassName = twMerge(
    "bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white hover:scale-105 duration-200 cursor-pointer",
    className
  );

  const getRegularPrice = () => {
    if (existingProduct) {
      if (product) {
        return product?.regularPrice * existingProduct?.quantity;
      }
    } else {
      return product?.regularPrice;
    }
  };

  const getDiscountedPrice = () => {
    if (existingProduct) {
      if (product) {
        return product?.discountedPrice * existingProduct.quantity;
      }
    } else {
      return product?.discountedPrice;
    }
  };

  return (
    <>
      {showPrice && (
        <div>
          <PriceTag
            regularPrice={getRegularPrice()}
            discountedPrice={getDiscountedPrice()}
          />
        </div>
      )}

      {existingProduct ? (
        <div className="flex items-center justify-center self-center">
          <button
            onClick={handleDeleteProduct}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaMinus />
          </button>
          <p className="text-base font-semibold w-10 text-center">
            {existingProduct?.quantity}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button className={newClassName} onClick={handleAddToCart}>
          {title ? title : "Add to Cart"}
        </button>
      )}
    </>
  );
};

export default AddToCardBtn;
