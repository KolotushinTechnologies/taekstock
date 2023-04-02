// Import Engine
import React from 'react';

// Create Function For Stock Display Component
const StockDisplay = ({ data }) => (
  <div>
    {data.map(item => (
      <div key={item._id}>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <img className="image-stock" src={item?.image} />
      </div>
    ))}
  </div>
);

// Export Stock Display Component
export default StockDisplay;
