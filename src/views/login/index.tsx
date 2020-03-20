/*
 * @Author: your name
 * @Date: 2020-03-11 18:27:15
 * @LastEditTime: 2020-03-17 16:35:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/views/login/index.ts
 */
import React, { useState, memo } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, message } from "antd";
import "./index.less";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {setUserInfo} from '@store/module/user'
import logoPic from "@assets/logo@3x.png";
// import Fizz from "../bubble/index";

import SHA1 from "sha1";
import { getSalt, login, UserLoginData } from "./api";

const Login: React.FC = (props: any) => {
  // redux
  const dispath = useDispatch();

  const [form] = Form.useForm();
  const { history } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = () => {
    setLoading(true);
    form
      .validateFields()
      .then(values => {
        refreshSalt({
          tel: values.tel,
          password: values.password
        });
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  // 登录前先请求盐粒
  async function refreshSalt(params: UserLoginData) {
    const { data } = await getSalt();
    if (data.code === 0) {
      const hashPass = SHA1(params.password);
      params.password = SHA1(hashPass + data.data.salt);
      userLogin(params);
    } else {
      message.error(data.msg);
      setLoading(false);
    }
  }

  // 登录提交
  async function userLogin(params: UserLoginData) {
    const { data } = await login(params);
    if (data.code === 0) {
      setLoading(false);
      dispath(setUserInfo(data.data));
      message.success("登录成功!");
      history.push("/");
    } else {
      message.error(data.data[0]);
      setLoading(false);
    }
  }

  return (
    <div className="login-section-wrap">
      <div className="wave-wrap">
        <div className="login-wrap">
          <div className="logo">
            <img src={logoPic} alt="logo" />
          </div>
          <div className="login-form">
            <h3>飞达管理系统</h3>
            <Form
              form={form}
              name="basic-login"
              initialValues={{ tel: "", password: "" }}
              size={"large"}
            >
              <Form.Item
                className="item-user"
                name="tel"
                rules={[{ required: true, message: "请输入用户名!" }]}
              >
                <Input
                  autoComplete="off"
                  className="reset-item login-username"
                  placeholder="请输入用户名"
                  addonAfter={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                className="psd-item"
                name="password"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      const tel = getFieldValue("tel");
                      if (!value && !tel) {
                        return Promise.resolve();
                      }
                      if (!value) {
                        return Promise.reject("请输入密码!");
                      }
                      return Promise.resolve();
                    }
                  })
                ]}
              >
                <Input
                  className="reset-item login-password"
                  type="password"
                  placeholder="请输入密码"
                  onPressEnter={onFinish}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item className="login-btn">
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="button"
                  onClick={onFinish}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      {/* <Fizz /> */}
    </div>
  );
};

export default memo(Login);
