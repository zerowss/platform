import React from "react";
import { Layout } from "antd";
import "./index.less";
import LayoutUserInfo from '../LayoutUserInfo/index';
import { useSelector } from 'react-redux';
import { IStoreState } from '@store/types';

const { Header } = Layout;

const LayoutHeader:React.FC = ()=>{
    const { activeNav } = useSelector((state:IStoreState)=>state.app);
    return (
      <>
        <Header className="header">
          <div className="activeTitle">
            {activeNav.child ? activeNav.child.title : activeNav.title}
          </div>
          <LayoutUserInfo />
        </Header>
      </>
    );
}

export default LayoutHeader;
