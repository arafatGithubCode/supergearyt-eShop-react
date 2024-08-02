import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FiShoppingBag, FiUser } from "react-icons/fi";
import Container from "./Container";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

import { config } from "../config";
import { getData } from "../lib";
import { ICategoriesProps, IProductProps } from "../types";
import ProductCard from "./ProductCard";
import { store } from "../lib/store";

const bottomNavigation = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/products" },
  { title: "Cart", link: "/cart" },
  { title: "Orders", link: "/orders" },
  { title: "My Account", link: "/profile" },
  { title: "Blog", link: "/blog" },
];

const Header = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuOpenRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { currentUser, cartProduct, favoriteProduct } = store();

  useEffect(() => {
    const fetchData = async () => {
      const endPoint = `${config?.baseUrl}/products`;
      try {
        const data = await getData(endPoint);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const endPoint = `${config?.baseUrl}/categories`;
      try {
        const data = await getData(endPoint);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((item: IProductProps) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchText, products]);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (
        menuOpenRef.current &&
        !menuOpenRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutSide);
    } else {
      document.removeEventListener("mousedown", handleClickOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [menuOpen]);

  const handleMenuItemClick = (link: string) => {
    console.log(`Navigating to ${link}`);
    setMenuOpen(false);
    navigate(link);
  };

  return (
    <header className="grid sticky -top-[7.5rem] z-50 w-full bg-white/55 backdrop-blur-xl md:top-0">
      <div className="px-4 lg:px-10 xl:px-18 py-2">
        <div className="flex justify-between items-center gap-2 lg:gap-0">
          {/* logo */}
          <Link to="/">
            <img className="w-44" src={logo} alt="logo" />
          </Link>
          {/* search bar */}
          <div className="my-3 relative hidden sm:block w-full max-w-sm md:max-w-md lg:max-w-2xl">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-3xl placeholder:text-gray-400 font-medium text-sm py-2 px-6 border border-gray-200 focus:outline-1 outline-gray-300"
            />
            {searchText ? (
              <IoClose
                className="absolute top-2 right-4 text-xl hoverEffect hover:scale-105"
                onClick={() => setSearchText("")}
              />
            ) : (
              <FaSearch className="absolute top-2 right-4 text-lg text-gray-300 hoverEffect hover:scale-105" />
            )}
          </div>
          {/* Product search result */}
          {searchText && (
            <div className="absolute left-0 sm:top-36 top-24 w-full mx-auto max-h-[500px] px-10 py-5 bg-white z-20 overflow-y-scroll text-black shadow-lg shadow-skyText scrollbar-hide">
              {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                  {products?.map((item: IProductProps) => (
                    <ProductCard
                      key={item?._id}
                      item={item}
                      setSearchText={setSearchText}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-10 bg-gray-50 w-full flex items-center justify-center border border-gray-600 rounded-md">
                  <p className="text-xl font-normal">
                    Nothing matches with your search keywords{" "}
                    <span className="underline underline-offset-2 decoration-[1px] text-red-500 font-semibold">{`(${searchText})`}</span>
                  </p>
                  . Please try again
                </div>
              )}
            </div>
          )}
          {/* menu bar */}
          <div className="flex items-center gap-5">
            <Link to={"/profile"}>
              {currentUser ? (
                <img
                  src={currentUser?.avatar}
                  alt="profileImg"
                  className="w-10 h-10 rounded-full object-cover inline-block"
                />
              ) : (
                <FiUser className="hover:text-skyText duration-200 cursor-pointer" />
              )}
            </Link>

            <Link
              to="/favorite"
              className="relative hover:text-teal-500 cursor-pointer hoverEffect hover:scale-105"
            >
              <FaRegStar className="text-xl" />
              <span className="rounded-full bg-red-500 text-whiteText px-1 text-xs absolute -top-2 left-3 font-semibold">
                {favoriteProduct.length > 0 ? favoriteProduct.length : "0"}
              </span>
            </Link>
            <Link
              to="/cart"
              className="relative hover:text-teal-500 cursor-pointer hoverEffect hover:scale-105"
            >
              <FiShoppingBag className="text-xl" />
              <span className="rounded-full bg-red-500 text-whiteText px-1 text-xs absolute -top-2 left-3 font-semibold">
                {cartProduct.length > 0 ? cartProduct.length : "0"}
              </span>
            </Link>
          </div>
        </div>
        {/* search bar */}
        <div className="my-3 relative sm:hidden">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-3xl placeholder:text-gray-400 font-medium text-sm py-2 px-6 border border-gray-200 focus:outline-1 outline-gray-300"
          />
          {searchText ? (
            <IoClose
              className="absolute top-2 right-4 text-xl hoverEffect hover:scale-105"
              onClick={() => setSearchText("")}
            />
          ) : (
            <FaSearch className="absolute top-2 right-4 text-lg text-gray-300 hoverEffect hover:scale-105" />
          )}
        </div>
      </div>
      <div className="bg-darkText text-whiteText w-full relative">
        <Container className="py-2 max-w-4xl flex items-center gap-5 justify-between">
          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md border-gray-400 hover:border-white border px-3 py-2  text-gray-300 font-semibold hover:text-white hoverEffect">
              Select Category <FaChevronDown className="text-base mt-1" />
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="bottom end"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-gray-300 [--anchor-gap:var(--spacing-1)] focus:outline-none hover:text-white z-50"
              >
                {categories.map((item: ICategoriesProps) => (
                  <MenuItem key={item?._id}>
                    <Link
                      to={`/category/${item?._base}`}
                      className="flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-white/20 tracking-wide"
                    >
                      <img
                        src={item?.image}
                        alt="categoryImage"
                        className="w-6 h-6 rounded-md"
                      />
                      {item?.name}
                    </Link>
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </Menu>

          {bottomNavigation.map(({ title, link }) => (
            <Link
              to={link}
              key={title}
              className="uppercase hidden md:inline-flex text-sm font-semibold text-whiteText/90 hover:text-whiteText duration-200 relative overflow-hidden group"
            >
              {title}
              <span className="inline-flex w-full h-[1px] bg-whiteText absolute bottom-0 left-0 transform -translate-x-[105%] group-hover:translate-x-0 duration-300" />
            </Link>
          ))}
          <div
            ref={menuOpenRef}
            className="md:hidden flex flex-col gap-1 cursor-pointer hover:scale-105 z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`w-7 h-[2px] bg-gray-400 hoverEffect block rounded cursor-pointer ${
                menuOpen ? "rotate-45 absolute top-1/2" : ""
              }`}
            />
            <span
              className={`w-7 h-[2px] bg-gray-400 hoverEffect block rounded cursor-pointer ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-7 h-[2px] bg-gray-400 hoverEffect block rounded cursor-pointer ${
                menuOpen ? "-rotate-45" : ""
              }`}
            />
          </div>
        </Container>
      </div>
      <Transition
        show={menuOpen}
        enter="transition ease-out duration-300"
        enterFrom="transform -translate-y-full opacity-0"
        enterTo="transform translate-y-0 opacity-100"
        leave="transition ease-in duration-300"
        leaveFrom="transform translate-y-0 opacity-100"
        leaveTo="transform -translate-y-full opacity-0"
      >
        <div className="md:hidden bg-darkText text-whiteText pb-1">
          <nav className="">
            {bottomNavigation.map(({ title, link }) => (
              <Link
                to={link}
                key={title}
                onClick={() => handleMenuItemClick(link)}
                className="uppercase flex flex-col text-sm font-semibold text-whiteText/90 hover:text-whiteText duration-200 relative overflow-hidden group bg-darkText items-center py-2"
              >
                {title}
                <span className="inline-flex w-full h-[1px] bg-whiteText absolute bottom-0 left-0 transform -translate-x-[105%] group-hover:translate-x-0 duration-300" />
              </Link>
            ))}
          </nav>
        </div>
      </Transition>
    </header>
  );
};

export default Header;
