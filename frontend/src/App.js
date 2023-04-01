// Import Engine
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Engine Redux
import { Provider } from 'react-redux';
import store from './store';

// Import Actions Types
import { LOGOUT } from './types/auth';

// Import Auth Actions And Modules
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Import Components
// Import Private Routing
import PrivateRoute from './components/routing/private-route';

import Alert from './components/layout/alert/alert';
import Navbar from './components/navbar/navbar';

// Import Not Found Page Component
import NotFound from './components/layout/not-found/not-found';

// Import Pages
// Import Open Pages
import LandingPage from './pages/open-pages/landing/landing';
import EventsPage from './pages/open-pages/events/events';
import BlogPage from './pages/open-pages/blog/blog';
import LoginPage from './pages/open-pages/login/login';
import RegistrationPage from './pages/open-pages/registration/registration';

// Import Private Pages
import ProfilePage from './pages/private-pages/profile/profile';
import SettingsPage from './pages/private-pages/settings/settings';
import EditProfilePage from './pages/private-pages/settings/edit-profile';
import StockPage from './pages/private-pages/stock/stock';

// Import Styles
import './App.css';

function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="profile"
            element={<PrivateRoute component={ProfilePage} />}
          />
          <Route
            path="settings"
            element={<PrivateRoute component={SettingsPage} />}
          />
          <Route
            path="edit-profile"
            element={<PrivateRoute component={EditProfilePage} />}
          />
          <Route
            path="stock"
            element={<PrivateRoute component={StockPage} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
