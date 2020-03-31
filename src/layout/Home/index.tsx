import React from "react";
import { Layout } from "antd";
import "./index.less";

import LayoutHeader from "../LayoutHeader";
import LayoutSider from "../LayoutSider";

import LayoutContent from "../LayoutContent";
import Breadceumb from '../Breadcrumb/index';

const { Content } = Layout;

const Home: React.FC = props => {
  return (
    <>
      <Layout className="wrapp">
        <LayoutSider />
        <Layout className="container">
          <LayoutHeader />
          <Content className="site-layout-background">
            <Breadceumb />
            <LayoutContent />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
