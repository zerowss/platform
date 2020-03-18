import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Loading from "@components/loading";
import PrivateRoute from '@components/PrivateRoute';

const Login = lazy(() =>
  import(/* webpackChunkName:"login" */ "@views/login")
);
const Home = lazy(() => import(/* webpackChunkName:"Home" */ "@layout/Home"));

const App:React.FC =()=> {
  return (
    <Suspense fallback={<Loading />}>
      <Router basename={"/"}>
        <Switch>
          <Route
            path="/login"
            exact
            component={(props: any) => <Login {...props} />}
          />
          <PrivateRoute
            path="/"
            component={(props: any) => <Home {...props} />}
            isLogin={true}
          />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
