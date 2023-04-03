// Import Engine
import React, { Fragment } from "react";

// Import React Icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Create Function For Spinner Component
const Spinner = () => (
  <Fragment>
    <div className="loader" style={{ position: "absolute", left: "50%", top: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AiOutlineLoading3Quarters className="spinner-border" />
    </div>
  </Fragment>
);

// Export Spinner Component
export default Spinner;