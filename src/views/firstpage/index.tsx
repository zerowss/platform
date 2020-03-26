import React, { useState } from "react";
import "./index.less";
import localStorage from "@utils/storage";
import { UserState } from "@typings/userInfo";

const FirstPage: React.FC = props => {
  const userInfo = localStorage.getValue<UserState>("userInfo");
  return (
    <div className="first-page">
      <p>尊敬的{userInfo?.name}，您好！欢迎使用Phechda管理系统！</p>
    </div>
  );
};

export default FirstPage;
