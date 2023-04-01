// Import Engine
import React from 'react';

// Creeate Function For Not Found Page Component
const NotFound = () => {
  return (
    <section className="container">
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle" /> Страница не найдена
      </h1>
      <p className="large">Пожалуйста, проверьте адрес</p>
    </section>
  );
};

// Export Not Found Page Component
export default NotFound;
