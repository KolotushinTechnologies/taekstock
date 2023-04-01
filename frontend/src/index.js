// Import Engine
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import Main App Component
import App from './App';

// Create Root Variable For React DOM
const root = ReactDOM.createRoot(document.getElementById('root'));

// Create Root Render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
