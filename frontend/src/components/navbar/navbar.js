// Import Engine
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Import Engine Redux
import { connect } from 'react-redux';

// Import Actions
import { logout } from '../../actions/auth';

// Create Function For Navbar Component
const Navbar = ({ auth: { isAuthenticated }, logout }) => {

  // Navbar Links For Authorized Users
  const authLinks = (
    <ul>
      <li>
        <Link style={{ fontWeight: 'bold', color: '#00dfff' }} to="/stock">taekstock live</Link>
      </li>
      <li>
        <Link to="/events">События</Link>
      </li>
      <li>
        <Link to="/blog">Блог</Link>
      </li>
      <li>
        <Link to="/profile">Профиль</Link>
      </li>
      <li>
        <Link to="/settings">Настройки</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Выйти</span>
        </a>
      </li>
    </ul>
  );


  // Navbar Links For Not Authorized Users
  const guestLinks = (
    <ul>
      <li>
        <Link to="/events">События</Link>
      </li>
      <li>
        <Link to="/blog">Блог</Link>
      </li>
      <li>
        <Link to="/registration">Регистрация</Link>
      </li>
      <li>
        <Link to="/login">Вход</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-[color:var(--main-color)]">
      <h1>
        <Link to="/">
          <span className='text-[20px] font-bold'>taekstock</span>
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

// Navbar Prop Types
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

// Map State To Props For Navbar Component
const mapStateToProps = (state) => ({
  auth: state.auth
});

// Export Navbar Component And Connect To Redux
export default connect(mapStateToProps, { logout })(Navbar);
