// Import Engine
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';

// Import Engine Redux
import { connect } from 'react-redux';

// Import Actions
import { login } from '../../../actions/auth';

// Create Function For Login Page
const LoginPage = ({ login, isAuthenticated }) => {
  // Create State For Send To Action
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Get Field State From Form Data
  const { email, password } = formData;

  // Create Function For Change State
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Create Function For Submit Form To Login Action
  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Condition For Authorized Users
  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Вход</h1>
      <p className="lead">
        <i className="fas fa-user" /> Войдите в свой аккаунт
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Войти" />
      </form>
      <p className="my-1">
        Нет аккаунта? <Link to="/registration">Регистрация</Link>
      </p>
    </section>
  );
};

// Login Page Prop Types
LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

// Map State For Login Page
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

// Export Login Page And Connect To Redux
export default connect(mapStateToProps, { login })(LoginPage);
