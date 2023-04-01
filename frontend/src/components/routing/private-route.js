// Import Engine
import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import Engine Redux
import { connect } from 'react-redux';

// Import Layouts
import Spinner from '../layout/spinner/spinner';

// Create Function For Private Route Component
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}) => {
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return <Navigate to="/login" />;
};

// Private Route Prop Types
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

// Map State For Private Route Component
const mapStateToProps = (state) => ({
  auth: state.auth
});

// Export Private Route Component And Connect To Redux
export default connect(mapStateToProps)(PrivateRoute);
