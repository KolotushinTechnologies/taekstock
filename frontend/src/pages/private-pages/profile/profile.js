// Import Engine
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Import Engine Redux
import { connect, useDispatch } from 'react-redux';

// Import Actions
import { loadUser } from '../../../actions/auth';

// Import Actions Types
import { RESET_USER } from '../../../types/auth';

// Import Components
import Spinner from '../../../components/layout/spinner/spinner';

// Create Function For Profile Page
const ProfilePage = ({
  loadUser,
  auth: { user, loading },
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: RESET_USER });

    loadUser();
  }, [dispatch, loadUser]);

  return loading || user === null ? (<Spinner />) : (
    <section className="container">
      <h1 className="large text-primary">Мой Профиль</h1>
      <p className="lead">
        <i className="fas fa-user" /> Добро пожаловать {user && user?.firstname}
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
