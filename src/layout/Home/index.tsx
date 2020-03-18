import React from "react";
import { Layout } from "antd";
import './index.less';

import LayoutHeader from '../LayoutHeader';
import LayoutSider from '../LayoutSider';
import Breadcrumb from "../Breadcrumb";
import LayoutContent from "../LayoutContent";

const { Content } = Layout;

const Home: React.FC = props => {
  return (
    <>
      <Layout className="wrapp">
        <LayoutHeader />
        <Layout className="container">
          <LayoutSider />
          <Layout className="right-wrap">
            <Breadcrumb />
            <Content
              className="site-layout-background"
              style={{
                margin: 0
              }}
            >
              <LayoutContent />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
