// Import Engine
import React, { useEffect } from "react";
import PropTypes from "prop-types";

// Import Engine Redux
import { connect } from "react-redux";

// Import Actions
import { loadUser } from "../../../actions/auth";

// Create Function For Profile Page
const ProfilePage = ({ loadUser, auth: { user } }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <section className="flex flex-col">
      <div className="bg-[#1c1d22]">
        <p className="text-white text-[25px] p-4">
          Добро пожаловать {user && user?.firstname}
        </p>
      </div>
      <div className="flex">
        <div className="bg-[url('/public/BMW-3-Series-Exterior.webp')] h-screen w-full"></div>
        <div className="h-screen flex flex-col bg-[#1c1d22] text-white w-full px-10">
          <h2 className="text-[40px]">Обо мне</h2>
          <span className="mb-3">Основная Информация</span>
          <div className="flex mb-10">
            <div className="mr-4 flex flex-col">
              <span>Дата рождения</span>
              <span>Пол</span>
              <span>Lorem, ipsum dolor.</span>
            </div>
            <div className="flex flex-col">
              <span>20 Декабря</span>
              <span>мужской</span>
              <span>Lorem, ipsum dolor.</span>
            </div>
          </div>
          <div className="mb-6">
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo natus voluptas eos deserunt id! Iusto ex tempore esse
              nostrum maxime omnis, quas expedita cum magnam eaque itaque nobis
              totam. Ducimus unde cupiditate dignissimos eius, corporis quod
              aliquid voluptatibus cum tenetur eos magni iste necessitatibus
              deleniti sequi. At dolore nulla omnis.
            </span>
          </div>
          <div>
            <span>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Explicabo natus voluptas eos deserunt id! Iusto ex tempore esse
              nostrum maxime omnis, quas expedita cum magnam eaque itaque nobis
              totam. Ducimus unde cupiditate dignissimos eius, corporis quod
              aliquid voluptatibus cum tenetur eos magni iste necessitatibus
              deleniti sequi. At dolore nulla omnis.
            </span>
          </div>
        </div>
      </div>
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
export default connect(mapStateToProps, { loadUser })(ProfilePage);
