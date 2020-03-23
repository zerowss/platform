import React from "react";
import "./index.less";
import Breadcrumb from "@layout/Breadcrumb";

const Detail: React.FC = props => {
  console.log('sss')
  return (
    <div className="todolist-wrap">
      详情 <Breadcrumb />
    </div>
  );
};

export default Detail;
