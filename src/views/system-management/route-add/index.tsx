import React, { memo } from "react";
import { Card, Form, Row, Col, TreeSelect, Input, Button } from "antd";
const { TreeNode } = TreeSelect;
const RouteAdd: React.FC = () => {
  const [form] = Form.useForm();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
  };
  
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card title="添加路由" bordered={false}>
          <Row justify="center">
            <Col style={{ width: "600px" }}>
              <Form
                {...layout}
                form={form}
                name="route_form"
                scrollToFirstError
              >
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
                  >
                    <TreeNode value="parent 1" title="一级">
                      <TreeNode value="parent 1-0" title="parent 1-0" />
                      <TreeNode value="parent 1-1" title="parent 1-1" />
                    </TreeNode>
                  </TreeSelect>
                </Form.Item>

                <Form.Item
                  name="title"
                  label="标题"
                  rules={[
                    {
                      required: true,
                      message: "标题!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="地址"
                  rules={[
                    {
                      required: true,
                      message: "地址!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="icon"
                  label=" 图标"
                  rules={[
                    {
                      required: true,
                      message: "地址!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" style={{marginRight: '20px'}}>确认</Button>
                  <Button type="primary">重置</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};
export default memo(RouteAdd);
