// Import Engine
import React from 'react';
import { Link } from 'react-router-dom';

// Create Function For Settings Page
const SettingsPage = () => {
  return (
    <section className="other-container">
      <h1 className="large text-primary">Настройки</h1>
      <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        Редактировать профиль
      </Link>
    </div>
    </section>
  )
};

// Export Settings Page
export default SettingsPage;