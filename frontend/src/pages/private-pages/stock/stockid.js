//Import Engine
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

//Import Engine Redux
import { connect } from "react-redux";

//Import Actions
import { getStockById } from "../../../actions/stock";

const StockidPage = ({ getStockById, stock: { stock } }) => {
  const { id } = useParams();
  useEffect(() => {
    getStockById(id);
  }, [getStockById, id]);
  return (
    <section className="container">
      <div key={stock?.id} className="">
        <div className="">
          <h2 className="text-center text-[40px] font-bold text-[#00dfff]">{stock?.title}</h2>
          <img className="w-full max-h-[250px] h-full object-cover rounded-xl" src={stock?.image} alt="" />
          <p className="text-[20px] mt-5">{stock?.description}</p>
        </div>
      </div>
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
