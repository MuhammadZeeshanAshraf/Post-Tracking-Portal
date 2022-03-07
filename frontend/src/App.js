import React, { useEffect, useMemo, useState } from 'react';
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
import { useCookies } from 'react-cookie';

function App() {
  // const isAuthenticated = getToken();
  const [cookies, setCookie] = useCookies(['user']);
  // if(cookies && cookies.user  && cookies.user?.userInfo && cookies.user?.isLogin && new Date() <= new Date(cookies.user?.expires)){
    return (
        <UserContext.Provider value={{user : cookies.user?.userInfo}}>  
          <Router>
              <Switch>
              <PublicRoute
              path="/login"
              isAuthenticated={cookies.user?.isLogin && new Date() <= new Date(cookies.user?.expires)}
            >
              <Login/>
            </PublicRoute>
            <PublicRoute
              path="/register"
              isAuthenticated={cookies.user?.isLogin && new Date() <= new Date(cookies.user?.expires)}
            >
              <Registration />
            </PublicRoute>
            <PublicRoute
              path="/otp"
              isAuthenticated={cookies.user?.isLogin && new Date() <= new Date(cookies.user?.expires)}
            >
              <Otp />
            </PublicRoute>
                <PrivateRoute
                  path="/"
                  isAuthenticated={cookies.user?.isLogin && new Date() <= new Date(cookies.user?.expires)}
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
  // } else{
  //   return (
  //     <Router>
  //       <Preloader/>
  //         <Switch>
  //         </Switch>
  //     </Router>
  //     );
  // }
}

export default App;
