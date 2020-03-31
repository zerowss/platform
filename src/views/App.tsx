import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Loading from "@components/loading";
import staticRoutes from "@router/staticRoutes";

const App: React.FC = () => {

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          {staticRoutes.map((r, index) => (
            <Route exact={r.exact} key={index} path={r.path} component={r.component} />
          ))}
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
