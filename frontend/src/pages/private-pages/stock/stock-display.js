// Import Engine
import React from "react";
import { Link } from "react-router-dom";

// Create Function For Stock Display Component
const StockDisplay = ({ data }) => (
  <div>
    {data.map((item) => (
      <Link to={item._id} key={item._id}>
        <div>
          <h2>{item?.title}</h2>
          <p>{item?.description}</p>
          <img className="image-stock" src={item?.image} alt="" />
        </div>
      </Link>
    ))}
  </div>
);

// Export Stock Display Component
export default StockDisplay;
