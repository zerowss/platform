import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Loading from "@components/loading";
import staticRoutes from "@router/staticRoutes";
import {init} from '@api/request';
import { message } from "antd";

const App: React.FC = () => {

  init({
    success(res:any) {
      if (res.data.code === 108) {
        window.location.href = "/login";
        return;
      }
      
    },
    error(err:any) {
      if (err && err.response.status === 401) {
        window.location.href = "/login";
        return;
      }
      console.log("err:", err.response.data);
      const errMsg = err.response.data.message || err;
      message.warning(`系统错误: ${errMsg}`, 0);

    }
  });

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
