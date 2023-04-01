// Import Engine
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Import Engine Redux
import { connect } from 'react-redux';

// Import Actions
import { loadUser } from '../../../actions/auth';

// Create Function For Profile Page
const ProfilePage = ({
  loadUser,
  auth: { user },
}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <section className="container">
      <h1 className="large text-primary">Мой Профиль</h1>
      <p className="lead">
        <i className="fas fa-user" /> Добро пожаловать {user?.data && user?.data?.firstname}
      </p>
    </section>
  );
};

// Profile Page Prop Types
ProfilePage.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

// Map State For Profile Page
const mapStateToProps = (state) => ({
  auth: state.auth,
});

// Export Profile Page And Connect To Redux
export default connect(mapStateToProps, { loadUser })(
  ProfilePage
);
