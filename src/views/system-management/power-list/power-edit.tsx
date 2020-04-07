import {
  Drawer,
  Form,
  Button,
  Input,
  Select,
  message
} from "antd";
import React, { useState, memo } from "react";
import { powerApi, ResponsePowerApi } from "./api";
import request from "@api/index";

const { Option } = Select;

interface DrawerProps {
  title: string;
  visible: boolean;
  state: any;
  closeDrawer: () => void;
  refushList: () => void;
}

const EditPower: React.FC<DrawerProps> = props => {
  // 静态值
  const methodList = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
    "OPTIONS",
    "HEAD"
  ];
  const { title, visible, closeDrawer, refushList, state } = props;

  const [form] = Form.useForm();
  const [btnLoading, setbtnLoading] = useState<boolean>(false);
  const defaultForm: ResponsePowerApi = {
    id: 0,
    name: "",
    slug: "",
    http_path: "",
    http_method: "",
    created_at: "",
    update_at: "",
    ...state
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  const onClose = () => {
    closeDrawer();
    // form.resetFields();
  };
  

  // 表单提交
  const onFinish = () => {
    setbtnLoading(true);
    form
      .validateFields()
      .then(values => {
        const method = title === "新增权限" ? "post" : "patch";
        const params = { ...values } as ResponsePowerApi;
        const id = state.id || "";
        request<any>(() => powerApi(method, { params, id }), {
          onSuccess() {
            message.success(`${title}成功!`);
            onClose();
            refushList();
          },
          onError(error) {
            setbtnLoading(false);
            message.error(error.msg);
          }
        });
      })
      .catch(err => {
        setbtnLoading(false);
      });
  };

  return (
    <Drawer
      title={title}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={400}
      footer={
        <div
          style={{
            textAlign: "right"
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={onFinish} type="primary" loading={btnLoading}>
            确认
          </Button>
        </div>
      }
    >
      <Form
        {...layout}
        form={form}
        name="routeForm"
        initialValues={defaultForm}
      >
        <Form.Item
          name="slug"
          label="标识"
          rules={[
            {
              required: true,
              message: "请填写标识!"
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: "请填写名称!"
            }
          ]}
        >
          <Input placeholder="新增权限" />
        </Form.Item>

        <Form.Item
          name="http_method"
          label="请求方法"
          rules={[
            {
              required: true,
              message: "请选择请求方法!"
            }
          ]}
        >
          <Select placeholder="请选择请求方法">
            {methodList.map((m: string, index) => (
              <Option key={index} value={m}>
                {m}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="http_path"
          label="请求路径"
          rules={[
            {
              required: true,
              message: "请填请求路径!"
            }
          ]}
        >
          <Input placeholder="请填请求路径" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default memo(EditPower);
