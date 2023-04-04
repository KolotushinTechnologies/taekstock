// Import Engine
import React from "react";
import { Link } from "react-router-dom";

// Import Styles From React Sprong
import { useSpring, animated } from "react-spring";

// Create Function For Stock Display Component
const StockDisplay = ({ data }) => {
  // Create Data Link Spring
  const dataLinkSpring = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(50px)" },
  });

  return (
    <div className="flex flex-wrap">
      {data === null || data.length === 0 ? (
        <span>по вашему запросу ничего не найдено</span>
      ) : (
        data.map((item) => (
          <Link to={item._id} key={item._id}>
            <animated.div
              style={dataLinkSpring}
              className="mb-2 mr-1 w-[480px] h-[480px] relative shadow rounded-2xl hover:shadow-2xl"
            >
              <div className="absolute flex flex-col text-white pt-[25px] pl-[20px] z-[5]">
                <h2 className="text-[25px]">{item?.title}</h2>
                <p className="">{item?.description}</p>
              </div>
              <img
                className="w-full h-full bg-black bg-opacity-80 brightness-[40%] rounded-2xl"
                src={item?.image}
                alt=""
              />
            </animated.div>
          </Link>
        ))
      )}
    </div>
  );
};

// Export Stock Display Component
export default StockDisplay;
