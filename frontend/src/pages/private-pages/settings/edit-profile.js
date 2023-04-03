// Import Engine
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

// Import Engine Redux
import { connect, useDispatch } from "react-redux";

// Import Actions
import { updateProfile, loadUser } from "../../../actions/auth";

// Import Actions Types
import { RESET_USER } from "../../../types/auth";

// Import Components
import Spinner from "../../../components/layout/spinner/spinner";

const initialState = {
  firstname: "",
  lastname: "",
  phoneNumber: "",
  email: "",
};

const EditProfilePage = ({
  auth: { user, loading },
  updateProfile,
  loadUser,
}) => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!user) {
      dispatch({ type: RESET_USER });

      loadUser();
    }

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && user) {
      const profileData = { ...initialState };

      for (const key in user) {
        if (key in profileData) profileData[key] = user[key];
      }

      // set local state with the profileData
      setFormData(profileData);
    }
  }, [dispatch, loading, loadUser, user]);

  const { firstname, lastname, phoneNumber, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData).then(() => {
      navigate("/profile");
    });
  };

  return loading || user === null ? (
    <Spinner />
  ) : (
    <section className="bg-[url('/public/collage-585x391.webp')] h-screen flex flex-col items-center justify-center relative">
      <div className="w-full h-full absolute top-0 bottom-0 right-0 left-0 bg-black bg-opacity-70"></div>
      <div className="bg-[color:var(--main-color)] flex flex-col max-w-md w-full p-8 z-10 rounded-[20px]">
        <h1 className="text-[35px] text-white">Настройки профиля</h1>
        <p className="lead">Редактировать свой профиль</p>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              placeholder="Имя"
              name="firstname"
              value={firstname}
              onChange={onChange}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-2 w-full"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Фамилия"
              name="lastname"
              value={lastname}
              onChange={onChange}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-2 w-full"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Номер телефона"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-2 w-full"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Адрес"
              name="email"
              value={email}
              onChange={onChange}
              className="bg-[color:var(--input-color)] rounded-[30px] py-[6px] pr-0 pl-3 text-[#8ea8cc] mb-2 w-full"
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary my-1"
            value="Сохранить"
          />
          <Link className="btn btn-light my-1" to="/profile">
            Вернуться в профиль
          </Link>
        </form>
      </div>
    </section>
  );
};

EditProfilePage.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { updateProfile, loadUser })(
  EditProfilePage
);
