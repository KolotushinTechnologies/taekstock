// Import Engine
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";

// Import Engine Redux
import { connect } from "react-redux";

// Import Actions
import { login } from "../../../actions/auth";

// Create Function For Login Page
const LoginPage = ({ login, isAuthenticated }) => {
  // Create State For Send To Action
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    <section className="bg-[url('/public/collage-585x391.webp')] h-screen flex flex-col items-center justify-center relative">
    <div className="w-full h-full absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-70"></div>
      <div className="bg-[color:var(--main-color)] flex flex-col p-8 z-10 rounded-[20px]">
        <h2 className="text-[40px] text-white">Вход</h2>
        <p className="lead">
          <i className="fas fa-user" /> Войдите в свой аккаунт
        </p>
        <form onSubmit={onSubmit}>
          <div className="">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-2 w-full"
              onChange={onChange}
            />
          </div>
          <div className="">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-3 w-full"
              onChange={onChange}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Войти" />
        </form>
        <p className="my-1">
          Нет аккаунта? <Link to="/registration"><span className="hover:text-white">Регистрация</span></Link>
        </p>
      </div>
    </section>
  );
};

// Login Page Prop Types
LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

// Map State For Login Page
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// Export Login Page And Connect To Redux
export default connect(mapStateToProps, { login })(LoginPage);
