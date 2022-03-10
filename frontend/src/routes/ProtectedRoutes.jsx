// import { Suspense } from 'react';
import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { UserContext } from '../custom_hooks/UserContext';
// import Loader from 'sharedComponent/Loader';
import routes from './routes';

const ProtectedRoutes = () => {
  const {user} = useContext(UserContext);
  let restrictedRoutes = [];
  if(user.roleDetails?.permission_level == 1){
    restrictedRoutes = ['processTrackings', 'staff', 'clearStorage'];
  }else if(user.roleDetails?.permission_level == 2){
    restrictedRoutes = ['staff', 'clearStorage'];
  }
 return(
  <Switch>
    {/* <Suspense
      fallback={<Loader />}
    > */}
      {routes.map(({ component: Component, path, exact }) => {
        if(!(restrictedRoutes.includes(path))){
          return (
            <Route
              path={`/${path}`}
              key={path}
              exact={exact}
            >
              <Component />
            </Route>
          )
        }
      }
      )}
    {/* </Suspense> */}
  </Switch>
  )
}

export default ProtectedRoutes;