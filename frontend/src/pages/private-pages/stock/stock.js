// Import Engine
import React, { lazy, Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import Engine Redux
import { connect } from 'react-redux';

// Import Actions
import { getAllStocks } from '../../../actions/stock';

// Create Data Display For Lazy Loading
const DataDisplay = lazy(() => import('./stock-display'));

// Create Function For Stock Page
const StockPage = ({ getAllStocks, stock: { stocks } }) => {
  useEffect(() => {
    getAllStocks();
  }, [getAllStocks]);

  return (
    <section className="container">
      <h1 className="large text-primary">taekstock live</h1>
      <Suspense fallback={<div>Loading data...</div>}>
        <DataDisplay data={stocks} />
      </Suspense>
    </section>
  )
};

// Export Stock Page
StockPage.propTypes = {
  getAllStocks: PropTypes.func.isRequired,
  stock: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  stock: state.stock
});

export default connect(mapStateToProps, { getAllStocks })(StockPage);