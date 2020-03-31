import React from "react";
import ReactDOM from "react-dom";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import "./styles/global.less";
import { Provider } from "react-redux";

import store from './store';

import App from "./views/App";

import * as serviceWorker from "./serviceWorker";

console.log('app start');

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN} componentSize="large">
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
