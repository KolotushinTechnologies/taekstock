// Import Engine
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

// Import Engine Redux
import { connect } from 'react-redux';
import { updateProfile, loadUser } from '../../../actions/auth';

const initialState = {
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
};

const EditProfilePage = ({
    auth: { user, loading },
    updateProfile,
    loadUser
}) => {
    const [formData, setFormData] = useState(initialState);

    const navigate = useNavigate();

    useEffect(() => {
        // if there is no profile, attempt to fetch one
        if (!user) loadUser();

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
    }, [loading, loadUser, user]);

    const {
        firstname,
        lastname,
        phoneNumber,
        email,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData).then(() => {
            navigate('/profile');
        });
    };

    return (
        <section className="container">
            <h1 className="large text-primary">
                Настройки профиля
            </h1>
            <p className="lead">
                Редактировать свой профиль
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
                        placeholder="Номер телефона"
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

                <input type="submit" className="btn btn-primary my-1" value="Сохранить" />
                <Link className="btn btn-light my-1" to="/profile">
                    Вернуться в профиль
                </Link>
            </form>
        </section>
    );
};

EditProfilePage.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { updateProfile, loadUser })(
    EditProfilePage
);
