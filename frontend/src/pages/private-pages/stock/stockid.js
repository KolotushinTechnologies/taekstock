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
      <div key={stock?.id}>
          <h2>{stock?.title}</h2>
          <p>{stock?.description}</p>
          <img className="image-stock" src={stock?.image} alt="" />
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
