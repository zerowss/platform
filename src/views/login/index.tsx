/*
 * @Author: your name
 * @Date: 2020-03-11 18:27:15
 * @LastEditTime: 2020-03-17 16:35:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/views/login/index.ts
 */
import React from "react";
import { Form, Input, Button } from "antd";
import "./index.less";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logoPic from "@assets/logo@3x.png";
import Fizz from '../bubble/index'

interface FormProp {
  username: string;
  password: string;
}

const Login: React.FC = (props: any) => {
  const { history } = props;
  const onFinish = (values: any) => {
    console.log("Success:", values);
    history.push("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-section-wrap">
      <div className="login-wrap">
        <div className="logo">
          <img src={logoPic} alt="logo" />
        </div>
        <div className="login-form">
          <h3>飞达管理系统</h3>
          <Form
            name="basic-login"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size={"large"}
          >
            <Form.Item
              className="item-user"
              name="username"
              rules={[{ required: true, message: "请输入账号!" }]}
            >
              <Input
                className="reset-item login-username"
                placeholder="请输入账号"
                addonAfter={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input
                className="reset-item login-password"
                type="password"
                placeholder="请输入密码"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item className="login-btn">
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Fizz />
    </div>
  );
};

export default Login;
