import React, { useEffect } from "react";
import { Layout } from "antd";
import "./index.less";

import LayoutHeader from "../LayoutHeader";
import LayoutSider from "../LayoutSider";

import LayoutContent from "../LayoutContent";
import Breadceumb from "../Breadcrumb/index";
import { cancelFetches } from "@api/request";
import { useHistory } from "react-router-dom";
const { Content } = Layout;

const Home: React.FC = props => {
  const history = useHistory();

  // 监听路由变化  axios 取消请求
  history.listen(route => {
    cancelFetches();
  });

  return (
    <>
      <Layout className="wrapp">
        <LayoutSider />
        <Layout className="container">
          <LayoutHeader />
          <Content className="site-layout-background">
            <Breadceumb />
            <div className="main-content">
              <LayoutContent />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
