// Import Engine
import React, { lazy, Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Import Engine Redux
import { connect, useDispatch } from "react-redux";

// Import Actions
import { getAllStocks, setSearchStock, searchStock } from "../../../actions/stock";

// Import Actions Types
import { RESET_STOCKS } from "../../../types/stock";

// Import Components
import Spinner from "../../../components/layout/spinner/spinner";

// Create Data Display For Lazy Loading
const DataDisplay = lazy(() => import("./stock-display"));

// Create Function For Stock Page
const StockPage = ({ getAllStocks, setSearchStock, searchStock, stock: { stocks, loading } }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch({ type: RESET_STOCKS });

    getAllStocks();
  }, [dispatch, getAllStocks]);

  const onChange = (e) => {
    setQuery(e.target.value)
  };

  const handleSearch = () => {
    setSearchStock(query);
    searchStock(query);
  };

  return (
    <section className="container flex flex-col justify-center items-center ">
      <div className="">
        <h1 className="text-[60px] font-bold text-[#00dfff] px-8">
          taekstock live
        </h1>
        <input
          value={query}
          onChange={onChange}
          type="text"
          className="border-2 rounded-[30px] py-[7px] pl-3 mb-7 w-full text-[12px]"
          placeholder="Ведите имя или фамилию спортсмена"
        />
        <button onClick={handleSearch}>Поиск</button>
      </div>
      {
        loading || stocks === null ? (
          <Spinner />
        ) : (
          <Suspense fallback={<Spinner />}>
              <DataDisplay data={stocks} />
          </Suspense>
        )
      }
    </section>
  );
};

// Export Stock Page
StockPage.propTypes = {
  getAllStocks: PropTypes.func.isRequired,
  setSearchStock: PropTypes.func.isRequired,
  searchStock: PropTypes.func.isRequired,
  stock: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

export default connect(mapStateToProps, { getAllStocks, setSearchStock, searchStock })(StockPage);
