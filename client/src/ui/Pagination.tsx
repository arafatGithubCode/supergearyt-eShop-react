import { useEffect, useState } from "react";
import { config } from "../config";
import { getData } from "../lib";
import { IProductProps } from "../types";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";

type TPaginateEvent = {
  selected: number;
};

interface IItemProps {
  currentItems: IProductProps[];
}

const Items = ({ currentItems }: IItemProps) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
    {currentItems &&
      currentItems.map((item: IProductProps) => (
        <ProductCard key={item._id} item={item} />
      ))}
  </div>
);

const Pagination = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const endPoint = `${config?.baseUrl}/products`;
      try {
        const data = await getData(endPoint);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching pagination data", error);
      }
    };
    fetchData();
  }, []);

  const itemsPerPage = 10;
  const pageCount = Math.ceil(products.length / itemsPerPage);
  const [itemOffSet, setItemOffSet] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const endOffSet = itemOffSet + itemsPerPage;
  const currentItems = products.slice(itemOffSet, endOffSet);

  const handlePageClick = (event: TPaginateEvent) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    const newStart = newOffset + 1;
    setItemOffSet(newOffset);
    setItemStart(newStart);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold py-10"
          activeClassName="bg-black text-white"
        />
        <p>
          Products from {itemStart} to {Math.min(endOffSet, products?.length)}{" "}
          of {products?.length}
        </p>
      </div>
    </>
  );
};

export default Pagination;
