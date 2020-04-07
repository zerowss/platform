import { Drawer, Form, Button, Input, Select, message, Checkbox } from "antd";
import React, { useState, memo, JSXElementConstructor } from "react";
import { initApi, ResponseInitApi, RequestInitParams} from "./api";
import request from "@api/index";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

interface DrawerProps {
  title: string;
  visible: boolean;
  state: any;
  closeDrawer: () => void;
  refushList: () => void;
}

const RolesEdit: React.FC<DrawerProps> = props => {
  const { title, visible, closeDrawer, refushList, state } = props;

  const [form] = Form.useForm();
  const [btnLoading, setbtnLoading] = useState<boolean>(false);
  const defaultForm: RequestInitParams = {
    id: 0,
    name: "",
    status: "",
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
        const method = title === "新增角色" ? "post" : "patch";
        const params = { ...values } as RequestInitParams;
        const id = state.id || "";
        request<any>(() => initApi(method, { params, id }), {
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
              message: "请填写角色名称!"
            }
          ]}
        >
          <Input placeholder="角色名称" />
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
          <CheckBoxG data={defaultForm} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

function CheckBoxG(data: any) {
  const [indeterminate, setindeterminate] = useState(false);
  const [checkAll, setcheckAll] = useState(false);
  const [checkedList, setcheckedList] = useState<CheckboxValueType[]>([]);

  const plainOptions = ["Apple", "Pear", "Orange"];
  const defaultCheckedList = ["Apple", "Orange"];
  const onChange = (checkedValue: CheckboxValueType[]) => {
    console.log(checkedValue, "checkedValue");
    setcheckedList(checkedValue);
    setcheckAll(checkedList.length === plainOptions.length);
    setindeterminate(
      !!checkedList.length && checkedList.length < plainOptions.length
    );
  };
  const onCheckAllChange = (e: any) => {
    console.log(e.target, "e.target");
    const target = e.target;
    const checked = target.cheked;
    setcheckedList(checked ? plainOptions : []);
    setcheckAll(checked);
    setindeterminate(false);
  };
  return (
    <div>
      <div className="site-checkbox-all-wrapper">
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
      </div>
      <br />
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
      />
    </div>
  );
}

export default memo(RolesEdit);
