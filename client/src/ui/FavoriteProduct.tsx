import { MdClose } from "react-icons/md";
import { IProductProps } from "../types";
import { store } from "../lib/store";
import toast from "react-hot-toast";
import AddToCardBtn from "./AddToCardBtn";
import FormattedPrice from "./FormattedPrice";

const FavoriteProduct = ({ product }: { product: IProductProps }) => {
  const { removeFromFavorite } = store();

  return (
    <div className="flex py-6">
      <div className="min-w-0 flex-1 lg:flex lg:flex-col">
        <div className="lg:flex-1">
          <div className="sm:flex">
            <div>
              <h4 className="font-medium text-gray-900">{product?.name}</h4>
              <p className="mt-2 hidden text-sm text-gray-500 sm:block">
                {product?.description}
              </p>
              <p className="text-sm mt-1">
                Brand: <span className="font-medium">{product?.brand}</span>
              </p>
              <p className="text-sm mt-1">
                Category:{" "}
                <span className="font-medium">{product?.category}</span>
              </p>
            </div>
            <span
              onClick={() => {
                removeFromFavorite(product._id);
                toast.success(
                  `${product?.name.substring(0, 10)} removed from favorite list`
                );
              }}
            >
              <MdClose className="text-lg text-gray-600 hover:text-red-600 duration-200 cursor-pointer inline-block mt-4 sm:mt-0 scale-105" />
            </span>
          </div>
          <div className="flex items-center text-sm gap-6 font-medium py-4">
            <AddToCardBtn product={product} className="w-32" />
          </div>
        </div>
        <p className="">
          You are saving{" "}
          <span className="text-sm font-semibold text-green-500">
            {
              <FormattedPrice
                amount={product?.regularPrice - product?.discountedPrice}
              />
            }
          </span>{" "}
          upon purchase
        </p>
      </div>
      <div className="w-32 h-32 ml-4 flex-shrink-0 sm:w-48 sm:h-48 sm:order-first sm:m-0 sm:mr-6 border border-gray-200 rounded-md hover:border-skyText cursor-pointer group overflow-hidden duration-200">
        <img
          src={product?.images[0]}
          alt="product image"
          className="h-full w-full rounded-lg object-cover object-center group-hover:scale-110 duration-200"
        />
      </div>
    </div>
  );
};

export default FavoriteProduct;
