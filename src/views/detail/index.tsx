import React from "react";
import "./index.less";
import Breadcrumb from "@layout/Breadcrumb";

const Detail: React.FC = props => {
  return (
    <div className="todolist-wrap">
      详情 <Breadcrumb />
    </div>
  );
};

export default Detail;
