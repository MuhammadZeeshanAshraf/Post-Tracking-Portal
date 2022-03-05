// import { Suspense } from 'react';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Loader from 'sharedComponent/Loader';
import routes from './routes';

const ProtectedRoutes = () => (
  <Switch>
    {/* <Suspense
      fallback={<Loader />}
    > */}
      {routes.map(({ component: Component, path, exact }) => (
        <Route
          path={`/${path}`}
          key={path}
          exact={exact}
        >
          <Component />
        </Route>
      ))}
    {/* </Suspense> */}
  </Switch>
);

export default ProtectedRoutes;