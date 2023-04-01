// Import Engine
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';

// Import Engine Redux
import { connect } from 'react-redux';

// Import Actions
import { register } from '../../../actions/auth';
import { setAlert } from '../../../actions/alert';

// Create Function For Registration Page
const RegistrationPage = ({ setAlert, register, isAuthenticated }) => {
  // Create State For Send To Action
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    password: '',
    password2: ''
  });

  // Get Field State From Form Data
  const { firstname, lastname, phoneNumber, email, password, password2 } = formData;

  // Create Function For Change State
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Create Function For Submit Form To Registration Action
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Пароли не совпадают!', 'danger');
    } else {
      register({ firstname, lastname, phoneNumber, email, password });
    }
  };

  // Condition For Authorized Users
  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Регистрация</h1>
      <p className="lead">
        <i className="fas fa-user" /> Создайте аккаунт
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Имя"
            name="firstname"
            value={firstname}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Фамилия"
            name="lastname"
            value={lastname}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Номер телефона (необязательно)"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Адрес"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Подтвердите пароль"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Регистрация" />
      </form>
      <p className="my-1">
        Уже есть аккаунт? <Link to="/login">Вход</Link>
      </p>
    </section>
  );
};

// Registration Page Prop Types
RegistrationPage.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

// Map State For Registration Page
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

// Export Registration Page And Connect To Redux
export default connect(mapStateToProps, { setAlert, register })(RegistrationPage);
