import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Preloader from './components/layouts/Preloader';
import Registration from './components/pages/Registration';
import Otp from './components/pages/Otp';
import Login from './components/pages/Login';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import ProtectedRoutes from './routes/ProtectedRoutes';
import NotFoundPage from './components/pages/NotFoundPage';

function App() {
  // const isAuthenticated = getToken();
  const isAuthenticated = false;
  return (

      <Router>
        <Preloader/>
          <Switch>
            <PublicRoute
              path="/login"
              isAuthenticated={isAuthenticated}
            >
              <Login/>
            </PublicRoute>
            <PublicRoute
              path="/register"
              isAuthenticated={isAuthenticated}
            >
              <Registration />
            </PublicRoute>
            <PublicRoute
              path="/otp"
              isAuthenticated={isAuthenticated}
            >
              <Otp />
            </PublicRoute>
            <PrivateRoute
              path="/"
              isAuthenticated={isAuthenticated}
            >
              <ProtectedRoutes />
            </PrivateRoute>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
      </Router>
    );
}

export default App;
