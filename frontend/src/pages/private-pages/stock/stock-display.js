// Import Engine
import React from "react";
import { Link } from "react-router-dom";

// Create Function For Stock Display Component
const StockDisplay = ({ data }) => (
  <div className="flex flex-wrap justify-between">
    {data.map((item) => (
      <Link to={item._id} key={item._id}>
        <div className="mb-5 relative shadow hover:shadow-2xl">
          <div className="absolute flex flex-col text-white pt-[25px] pl-[20px] z-[5]">
            <h2 className="text-[25px]">{item?.title}</h2>
            <p className="">{item?.description}</p>
          </div>
          <img
            className="image-stock bg-black bg-opacity-80 brightness-[40%] rounded-2xl "
            src={item?.image}
            alt=""
          />
        </div>
      </Link>
    ))}
  </div>
);

// Export Stock Display Component
export default StockDisplay;
