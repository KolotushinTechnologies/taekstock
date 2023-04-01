// Import Engine
import React from 'react';
import PropTypes from 'prop-types';

// Import Engine Redux
import { connect } from 'react-redux';

// Create Function For Alert Component
const Alert = ({ alerts }) => (
  <div className="alert-wrapper">
    {alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))}
  </div>
);

// Alert Prop Types
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

// Map State o Props For Alert Component
const mapStateToProps = (state) => ({
  alerts: state.alert
});

// Export Alert Component And Connect To Redux
export default connect(mapStateToProps)(Alert);
