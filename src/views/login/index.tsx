/*
 * @Author: your name
 * @Date: 2020-03-11 18:27:15
 * @LastEditTime: 2020-03-27 16:47:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /platform/src/views/login/index.ts
 */
import React, { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, message } from "antd";
import "./index.less";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { setUserInfo } from "@store/module/user";
import logoPic from "@assets/logo@3x.png";
// import Fizz from "@components/bubble/index";
import request from "@api/index";

// 接口
import { setCookie } from "@utils/cookis";
import { UserState } from "@typings/userInfo";

import SHA1 from "sha1";
import { getTokenApi, loginApi, UserLoginData } from "./api";
import { IStoreState } from "@store/types";

const Login: React.FC = (props: any) => {
  // redux
  const dispath = useDispatch();
  const { activeNav } = useSelector((state: IStoreState) => state.app);

  const [form] = Form.useForm();
  const { history } = props;
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = () => {
    setLoading(true);
    form
      .validateFields()
      .then(values => {
        const params = {
          tel: values.tel,
          password: values.password
        };
        getToken(params).then(() => {
          userLogin(params);
        });
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  // 先获取token
  function getToken(params: UserLoginData) {
    return request<any>(() => getTokenApi(params), {
      onSuccess: result => {
        console.log(result, "====");
        const token = JSON.parse(result.token);
        setCookie("token", token.token_type + " " + token.access_token);
      },
      onError: e => {
        console.log(e, "---");
        message.error(e.msg);
      }
    });
  }

  // 登录提交
  async function userLogin(params: UserLoginData) {
    const { data } = await loginApi(params);
    if (data.code === 0) {
      setLoading(false);
      dispath(setUserInfo(data.data));
      message.success("登录成功!");
      if (activeNav) {
        const oldPath = activeNav.child?activeNav.child.path:'/';
        history.push(oldPath);
      } else {
        history.push("/");
      }
    } else {
      message.error(data.msg);
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
