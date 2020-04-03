import React, { memo, useState, useEffect, useCallback } from "react";
import { Table, message, Button, Row, Modal, Form, Input } from "antd";
import { ColumnProps } from "antd/es/table";
import request from "@api/index";
import { getListApi, ResponsePowerApi } from "./api";
import { ResData } from "@typings/axios";
import PowerEdit from "./power-edit";
import "./index.less";

const PowerList: React.FC = () => {
  const [form] = Form.useForm();
  const [listData, setlistData] = useState<ResponsePowerApi[]>([]);
  // const [searchForm, setsearchForm] = useState({});

  const [totalPage, settotalPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [perPage, setperPage] = useState(10);
  const [tableLoading, settableLoading] = useState<boolean>(true);
  const [visibleDrawer, setvisibleDrawer] = useState<boolean>(false);
  const [titleDrawer, settitleDrawer] = useState<string>("");
  const [rowDrawer, setrowDrawer] = useState<any>({});
  const [isRefsh, setisRefsh] = useState<boolean>(false);
  const [searchForm, setsearchForm] = useState({
    id: "",
    name: "",
    slug: "",
    http_path: ""
  });
  // 页码改变
  const changePage = (page: number) => {
    setcurrentPage(page);
  };

  const changePageSize = (current: number, size: number) => {
    setperPage(size);
  };

  const onSearch = useCallback(values => {
    setsearchForm(values);
  }, []);
  const clearSearch = useCallback(() => {
    setsearchForm({ id: "", name: "", slug: "", http_path: "" });
    form.resetFields();
  }, [form]);

  const addPower = useCallback(() => {
    setrowDrawer({});
    settitleDrawer("新增权限");
    setvisibleDrawer(true);
  }, []);

  const editRow = useCallback(data => {
    setrowDrawer(data);
    settitleDrawer("编辑权限");
    setvisibleDrawer(true);
  }, []);

  const delRow = (data: any) => {
    const mod = Modal.confirm({
      title: "提示",
      content: `确定删除${data.name}？`,
      onOk: () => {},
      onCancel: () => {
        mod.destroy();
      }
    });
  };
  const closeDrawer = useCallback(() => {
    setvisibleDrawer(false);
  }, []);

  const refushList = useCallback(() => {
    setisRefsh(true);
  }, []);

  useEffect(() => {
    async function getList() {
      settableLoading(true);
      await request<ResData<ResponsePowerApi[]>>(
        () =>
          getListApi({
            page: currentPage,
            per_page: perPage,
            ...searchForm
          }),
        {
          onSuccess(res) {
            setlistData(res.data);
            settotalPage(res.meta ? res.meta.total : 0);
            settableLoading(false);
          },
          onError(error) {
            message.error(error.msg);
          }
        }
      );
    }
    getList();
  }, [currentPage, perPage, isRefsh, searchForm]);

  return (
    <>
      <Row className="power-wrap">
        <div className="search-form">
          <Form
            form={form}
            name="routeForm"
            layout="inline"
            initialValues={searchForm}
            onFinish={onSearch}
          >
            <Form.Item name="id">
              <Input placeholder="ID" />
            </Form.Item>

            <Form.Item name="slug">
              <Input placeholder="标识" />
            </Form.Item>

            <Form.Item name="name">
              <Input placeholder="名称" />
            </Form.Item>

            <Form.Item name="http_path">
              <Input placeholder="请求路径" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="primary" onClick={clearSearch}>
                清空
              </Button>
              <Button type="primary" onClick={addPower}>
                新增权限
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table<ResponsePowerApi>
          rowKey="id"
          dataSource={listData}
          bordered
          pagination={{
            showSizeChanger: true,
            showTotal: () => `共 ${totalPage} 条`,
            total: totalPage,
            current: currentPage,
            pageSize: perPage,
            onChange: changePage,
            onShowSizeChange: changePageSize
          }}
          loading={tableLoading}
        >
          <Table.Column<ResponsePowerApi> title="ID" dataIndex="id" />
          <Table.Column<ResponsePowerApi> title="名称" dataIndex="name" />
          <Table.Column<ResponsePowerApi> title="标识" dataIndex="slug" />
          <Table.Column<ResponsePowerApi> title="路由" dataIndex="http_path" />
          <Table.Column<ResponsePowerApi>
            title="添加时间"
            dataIndex="created_at"
          />
          <Table.Column<ResponsePowerApi>
            title="修改时间"
            dataIndex="updated_at"
          />
          <Table.Column<ResponsePowerApi>
            title="操作"
            dataIndex="operation"
            render={(text, record, index) => {
              return (
                <>
                  <Button onClick={() => editRow(record)}>编辑</Button>
                  <Button danger onClick={() => delRow(record)}>
                    删除
                  </Button>
                </>
              );
            }}
          />
        </Table>
      </Row>
      {visibleDrawer && (
        <PowerEdit
          visible={visibleDrawer}
          title={titleDrawer}
          closeDrawer={closeDrawer}
          state={rowDrawer}
          refushList={refushList}
        />
      )}
    </>
  );
};
export default memo(PowerList);
