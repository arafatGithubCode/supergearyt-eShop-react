import { HiArrowRight } from "react-icons/hi";
import { ArrowProps } from "react-multi-carousel/lib/types";

export const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-5 m-auto h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full border-[1px] border-gray-200 hover:bg-gray-950 hover:text-white duration-200"
      aria-label="Next"
    >
      <HiArrowRight className="text-base" />
    </button>
  );
};

export const CustomRightCardArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 m-auto h-5 w-5 bg-gray-100 rounded-full border-[1px] border-gray-200 hover:bg-gray-950 hover:text-white duration-300 translate-x-12 group-hover:translate-x-0 hover:scale-105"
      aria-label="Next"
    >
      <HiArrowRight className="text-base" />
    </button>
  );
};
