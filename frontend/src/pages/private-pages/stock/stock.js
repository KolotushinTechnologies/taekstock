// Import Engine
import React, { lazy, Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';

// Import Engine Redux
import { connect, useDispatch } from 'react-redux';

// Import Actions
import { getAllStocks } from '../../../actions/stock';

// Import Actions Types
import { RESET_STOCKS } from '../../../types/stock';

// Import Components
import Spinner from '../../../components/layout/spinner/spinner';

// Create Data Display For Lazy Loading
const DataDisplay = lazy(() => import('./stock-display'));

// Create Function For Stock Page
const StockPage = ({ getAllStocks, stock: { stocks, loading } }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: RESET_STOCKS });

    getAllStocks();
  }, [dispatch, getAllStocks]);

  return loading || stocks === null ? (<Spinner />) : (
    <section className="container">
      <h1 className="text-[red]">taekstock live</h1>
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