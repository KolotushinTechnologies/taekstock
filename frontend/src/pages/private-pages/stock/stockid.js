//Import Engine
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

//Import Engine Redux
import { connect, useDispatch } from "react-redux";

//Import Actions
import { getStockById } from "../../../actions/stock";

// Import Actions Types
import { RESET_STOCK } from "../../../types/stock";

// Import Components
import Spinner from "../../../components/layout/spinner/spinner";

// Import Styles From React Sprong
import { useSpring, animated } from "react-spring";

const StockidPage = ({ getStockById, stock: { stock, loading } }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: RESET_STOCK });

    getStockById(id);
  }, [dispatch, getStockById, id]);

  // Create Data Link Spring
  const dataLinkSpring = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(50px)" },
  });

  return loading || stock === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <animated.div key={stock?.id} className="" style={dataLinkSpring}>
        <div className="">
          <h2 className="text-center text-[40px] font-bold text-[#00dfff]">
            {stock?.title}
          </h2>
          <img
            className="w-full max-h-[250px] h-full object-cover rounded-xl"
            src={stock?.image}
            alt=""
          />
          <p className="text-[20px] mt-5">{stock?.description}</p>
        </div>
      </animated.div>
    </section>
  );
};

StockidPage.propTypes = {
  getStockById: PropTypes.func.isRequired,
  stock: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

export default connect(mapStateToProps, { getStockById })(StockidPage);
