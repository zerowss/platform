import React from "react";
import { Breadcrumb } from "antd";
import "./index.less";
import { useSelector } from "react-redux";
import { IStoreState } from "@store/types";


const Breadceumb: React.FC = () => {
  const { activeNav } = useSelector((state: IStoreState) => state.app);
  const breadcrumbList = activeNav.breadceumb || [];
  return (
    <>
      <div className="breadceumb-wrap">
        <Breadcrumb>
          {breadcrumbList.map((b,index) => (
            <Breadcrumb.Item key={index} >{b}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
        
      </div>
    </>
  );
};

export default Breadceumb;
