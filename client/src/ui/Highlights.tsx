import { useEffect, useState } from "react";
import Container from "./Container";
import { getData } from "../lib";
import { Link } from "react-router-dom";
import { config } from "../config";
import { IHighlights } from "../types";

const Highlights = () => {
  const [highlightsData, setHighlightsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/highlights`;
      try {
        const data = await getData(endpoint);
        setHighlightsData(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {highlightsData.map((item: IHighlights) => (
        <div
          key={item?._id}
          className="relative h-60 rounded-lg shadow-md overflow-hidden group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundImage: `url(${item?.image})`,
              color: item?.color,
            }}
          ></div>
          <div
            className="relative z-10 p-6 flex flex-col justify-between h-full"
            style={{ color: item?.color }}
          >
            <div>
              <h3 className="text-2xl font-bold max-w-44">{item?.name}</h3>
              <p className="text-base font-bold mt-4">{item?.title}</p>
            </div>
            <Link
              to={item?._base}
              className="text-base font-normal group-hover:animate-bounce group-hover:font-serif group-hover:text-blue-500 w-fit hoverEffect relative overflow-hidden"
            >
              {item?.buttonTitle}
              <span className="w-full h-[1px] bg-gray-500 absolute bottom-0 left-0 -translate-x-[100%] group-hover:translate-x-0 duration-500" />
            </Link>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default Highlights;
