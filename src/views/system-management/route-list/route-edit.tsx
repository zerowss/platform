import {
  Drawer,
  Form,
  Button,
  Input,
  Select,
  TreeSelect,
  InputNumber,
  Radio,
  message
} from "antd";
import React, { useState, memo } from "react";
import { TreeNode } from "antd/lib/tree-select";
import { RouteParams, postSubmitApi } from "./api";
import request from "@api/index";
import { RouteConfigs } from "@typings/menuRouter";
import { getUserRoutesAsync } from "@store/module/app";
import { useDispatch } from "react-redux";

const { Option } = Select;

interface DrawerProps {
  title: string;
  visible: boolean;
  state: any;
  closeDrawer: () => void;
  refushList: () => void;
  parentRoutes: RouteConfigs[];
  permissionList: any[];
}

const EditRoute: React.FC<DrawerProps> = props => {
  const {
    title,
    visible,
    closeDrawer,
    refushList,
    state: { menu, permission_id, isNeedIcon, isNeedPath, ...rest },
    parentRoutes,
    permissionList
  } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [btnLoading, setbtnLoading] = useState<boolean>(false);
  const [needPath, setneedPath] = useState<boolean>(isNeedPath);
  const [needIcon, setneedIcon] = useState<boolean>(isNeedIcon);
  const routeForm: RouteParams = {
    parent_id: 0,
    title: "",
    path: "",
    icon: "",
    menu: menu && menu ? "1" : "0",
    order: 0,
    permission: "",
    permission_id: permission_id ? String(permission_id) : "",
    ...rest
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  const onClose = () => {
    closeDrawer();
    // form.resetFields();
  };
  const onChangeTree = (value: string) => {
    if(value === "0" ){
      setneedIcon(true);
      setneedPath(false) 
    }else{
      setneedIcon(false);
      setneedPath(true)
    }
  };

  // 表单提交
  const onFinish = () => {
    setbtnLoading(true);
    form
      .validateFields()
      .then(values => {
        const method = title === "新增菜单" ? "post" : "patch";
        const params = { ...values } as RouteParams;
        params["permission"] = permissionList.find(
          v => String(v.id) === params.permission_id
        ).slug;
        const id = rest.id || '';
        request<any>(() => postSubmitApi(method, {params, id}), {
          onSuccess(res) {
            message.success(`${title}成功!`);
            onClose();
            refushList();
            dispatch(getUserRoutesAsync());
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
      <Form {...layout} form={form} name="routeForm" initialValues={routeForm}>
        <Form.Item
          name="parent_id"
          label="父级路由"
          rules={[
            {
              required: true,
              message: "父级路由!"
            }
          ]}
        >
          <TreeSelect
            showSearch
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={onChangeTree}
          >
            <TreeNode value={0} title="一级">
              {parentRoutes.map(p => {
                return <TreeNode key={p.id} value={p.id} title={p.title} />;
              })}
            </TreeNode>
          </TreeSelect>
        </Form.Item>

        <Form.Item
          name="title"
          label="标题"
          rules={[
            {
              required: true,
              message: "请填写标题!"
            }
          ]}
        >
          <Input maxLength={6} />
        </Form.Item>

        {needPath && (
          <Form.Item
            name="path"
            label="路由地址"
            rules={[
              {
                required: true,
                message: "请填写路由地址!"
              }
            ]}
          >
            <Input />
          </Form.Item>
        )}

        {needIcon && (
          <Form.Item
            name="icon"
            label="图标"
            rules={[
              {
                required: true,
                message: "请填写图标!"
              }
            ]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          name="order"
          label="排序"
          rules={[
            {
              required: true,
              message: "请选择是否显示!"
            }
          ]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>

        <Form.Item name="menu" label="显示在菜单">
          <Radio.Group>
            <Radio value={"0"}>隐藏</Radio>
            <Radio value={"1"}>显示</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="permission_id"
          label="权限"
          rules={[
            {
              required: true,
              message: "请选择权限名称/权限标识"
            }
          ]}
        >
          <Select placeholder="请选择权限名称/权限标识">
            {permissionList.map((per: any, index) => (
              <Option key={index} value={String(per.id)}>
                {per.slug}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default memo(EditRoute);
