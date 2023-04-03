// Import Engine
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";

// Import Engine Redux
import { connect } from "react-redux";

// Import Actions
import { register } from "../../../actions/auth";
import { setAlert } from "../../../actions/alert";

// Create Function For Registration Page
const RegistrationPage = ({ setAlert, register, isAuthenticated }) => {
  // Create State For Send To Action
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    password: "",
    password2: "",
  });

  // Get Field State From Form Data
  const { firstname, lastname, phoneNumber, email, password, password2 } =
    formData;

  // Create Function For Change State
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Create Function For Submit Form To Registration Action
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Пароли не совпадают!", "danger");
    } else {
      register({ firstname, lastname, phoneNumber, email, password });
    }
  };

  // Condition For Authorized Users
  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return (
    <section className="bg-[url('/public/collage-585x391.webp')] h-screen flex flex-col items-center justify-center relative">
      <div className="w-full h-full absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-70"></div>
      <div className="bg-[color:var(--main-color)] flex flex-col max-w-md w-full p-8 z-10 rounded-[20px]">
        <h1 className="text-[35px] text-white">Регистрация</h1>
        <p className="lead">
          <i className="fas fa-user" /> Создайте аккаунт
        </p>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              placeholder="Имя"
              name="firstname"
              value={firstname}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-2 w-full"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Фамилия"
              name="lastname"
              value={lastname}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-2 w-full"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Номер телефона (необязательно)"
              name="phoneNumber"
              value={phoneNumber}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-2 w-full"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Адрес"
              name="email"
              value={email}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-2 w-full"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              name="password"
              value={password}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-2 w-full"
              onChange={onChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Подтвердите пароль"
              name="password2"
              value={password2}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-2 w-full"
              onChange={onChange}
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Регистрация"
          />
        </form>
        <p className="my-1 ">
          Уже есть аккаунт? <Link to="/login"><span className="hover:text-white">Вход</span></Link>
        </p>
      </div>
    </section>
  );
};

// Registration Page Prop Types
RegistrationPage.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// Map State For Registration Page
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// Export Registration Page And Connect To Redux
export default connect(mapStateToProps, { setAlert, register })(
  RegistrationPage
);
