// Import Engine
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Import Redux Engine
import { connect } from 'react-redux';

// Create Function For Landing Page
const LandingPage = ({ isAuthenticated }) => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">taekstock - взгляни на Мир иначе</h1>
          <p className="lead">
            Создайте свой профиль Спортсмена Taekwon-Do ITF, принимайте участие
            в соревнованиях, аттестациях, сборах. Готовьтесь к соревнованиям, общайтесь.
          </p>
          {
            isAuthenticated
              ?
              null
              :
              <div className="buttons">
                <Link to="/registration" className="btn btn-primary">
                  Регистрация
                </Link>
                <Link to="/login" className="btn btn-light">
                  Вход
                </Link>
              </div>
          }
        </div>
      </div>
    </section>
  )
};

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

// Export Landing Page
export default connect(mapStateToProps)(LandingPage);