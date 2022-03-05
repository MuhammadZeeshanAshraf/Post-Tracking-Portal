import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Preloader from './components/layouts/Preloader';
import Registration from './components/pages/Registration';
import Otp from './components/pages/Otp';
import Login from './components/pages/Login';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import ProtectedRoutes from './routes/ProtectedRoutes';
import NotFoundPage from './components/pages/NotFoundPage';
import { UserContext } from './custom_hooks/UserContext';

function App() {
  // const isAuthenticated = getToken();
  const isAuthenticated = false;
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <UserContext.Provider value={value}>  
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
      </UserContext.Provider>

    );
}

export default App;
