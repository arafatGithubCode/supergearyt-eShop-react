import { useState } from "react";
import { IProductProps } from "../types";
import { useNavigate } from "react-router-dom";
import { MdOutlineStarOutline } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import FormattedPrice from "./FormattedPrice";
import { FaStar } from "react-icons/fa";
import AddToCardBtn from "./AddToCardBtn";
import ProductCardSideNav from "./ProductCardSideNav";
import Carousel from "react-multi-carousel";
import { CustomRightCardArrow } from "./CustomRightArrow";
import { CustomLeftCardArrow } from "./CustomLeftArrow";

type TProps = {
  item: IProductProps;
  setSearchText?: (text: string) => void;
};

const responsive = {
  allDevices: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

const ProductCard = ({ item, setSearchText }: TProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const percentage =
    ((item?.regularPrice - item?.discountedPrice) / item?.regularPrice) * 100;

  const handleProduct = () => {
    navigate(`/product/${item?._id}`);
    setSearchText && setSearchText("");
  };

  return (
    <div className="border border-gray-200 rounded-lg p-1 overflow-hidden hover:border-black hoverEffect">
      <div className="w-full h-60 relative p-2 group">
        <span
          onClick={open}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="bg-black text-skyText absolute left-0 right-0 w-fit text-xs px-2 py-1 rounded-md font-semibold inline-block z-10 group hoverEffect hover:scale-105 mx-1"
        >
          {hover
            ? `click to see save amount`
            : `save ${percentage.toFixed(0)}%`}
        </span>

        <Carousel
          autoPlay
          responsive={responsive}
          autoPlaySpeed={2500}
          centerMode={false}
          infinite
          shouldResetAutoplay
          customRightArrow={<CustomRightCardArrow />}
          customLeftArrow={<CustomLeftCardArrow />}
        >
          {item?.images.reverse().map((url) => (
            <img
              src={url}
              alt="product"
              onClick={handleProduct}
              className="w-full h-full rounded-md object-cover group-hover:scale-110 duration-300"
            />
          ))}
        </Carousel>

        <ProductCardSideNav product={item} />
      </div>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <h3 className="text-xs uppercase font-semibold text-lightText">
          {item?.overView}
        </h3>
        <h2 className="text-lg font-bold line-clamp-2">{item?.name}</h2>
        <div className="text-base text-lightText flex items-center">
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <MdOutlineStarOutline />
          <MdOutlineStarOutline />
        </div>
        <AddToCardBtn product={item} />
      </div>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-40 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-black backdrop-blur-2xl z-50 p-6">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-whiteText"
                  >
                    Hurry up!
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white/50">
                    You are going to save{" "}
                    <span className="text-skyText">
                      <FormattedPrice
                        amount={item?.regularPrice - item?.discountedPrice}
                      />{" "}
                    </span>
                    from this product.
                  </p>
                  <p className="text-sm/6 text-white/50">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sequi, consequatur?
                  </p>
                  <div className="mt-4">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={close}
                    >
                      Got it, thanks!
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProductCard;
