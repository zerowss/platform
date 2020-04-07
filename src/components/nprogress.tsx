import React, { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });
const Nprogress = () => {
  useEffect(() => {
    // console.log('页面开始加载')
    NProgress.start();
    return () => {
      NProgress.done();
    //   console.log("页面加载完成");
    };
  }, []);
  return (<></>);
};

export default Nprogress;
