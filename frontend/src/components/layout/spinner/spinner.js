// Import Engine
import React, { Fragment } from "react";

// Import React Icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Create Function For Spinner Component
const Spinner = () => (
  <Fragment>
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AiOutlineLoading3Quarters className="loader" />
    </div>
  </Fragment>
);

// Export Spinner Component
export default Spinner;