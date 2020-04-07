import React, { memo, useState, useEffect, useCallback } from "react";
import { Table, message, Button, Row, Modal, Form, Input, Select } from "antd";
import { ColumnProps } from "antd/es/table";
import request from "@api/index";
import { initApi, ResponseInitApi } from "./api";
import { ResData } from "@typings/axios";
import RolesEdit from "./roles-edit";
import "./index.less";
const { Option } = Select;
const RoleManagement: React.FC = () => {
   // 静态值
  const statusList = [
    {
      value: "0",
      label: "启用"
    },
    {
      value: "1",
      label: "停用"
    }
  ];
  const [form] = Form.useForm();
  const [listData, setlistData] = useState<ResponseInitApi[]>([]);

  const [totalPage, settotalPage] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [perPage, setperPage] = useState(10);
  const [tableLoading, settableLoading] = useState<boolean>(true);
  const [visibleDrawer, setvisibleDrawer] = useState<boolean>(false);
  const [titleDrawer, settitleDrawer] = useState<string>("");
  const [rowDrawer, setrowDrawer] = useState<any>({});
  const [isRefsh, setisRefsh] = useState<boolean>(false);
  const [searchForm, setsearchForm] = useState({
    name: "",
    status: "",
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
    setsearchForm({  name: "", status: ""});
    form.resetFields();
  }, [form]);

  const addPower = useCallback(() => {
    setrowDrawer({});
    settitleDrawer("新增角色");
    setvisibleDrawer(true);
  }, []);

  const editRow = useCallback(data => {
    setrowDrawer(data);
    settitleDrawer("编辑角色");
    setvisibleDrawer(true);
  }, []);

  const delRow = (data: any) => {
    const mod = Modal.confirm({
      title: "提示",
      content: `确定删除${data.name}？`,
      onOk: () => {
        // request(() => powerApi("delete", { id: data.id }), {
        //   onSuccess() {
        //     message.success("删除成功");
        //     setisRefsh(true);
        //     mod.destroy();
        //   },
        //   onError(error) {
        //     message.error(error.msg);
        //   }
        // });
      },
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
    function getList() {
      settableLoading(true);
      request<ResData<ResponseInitApi[]>>(
        () =>
          initApi("get", {
            params: {
              page: currentPage,
              per_page: perPage,
              ...searchForm
            }
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
      <Row className="row-wrap">
        <div className="search-form">
          <Form
            form={form}
            name="routeForm"
            layout="inline"
            initialValues={searchForm}
            onFinish={onSearch}
          >
            <Form.Item name="status">
              <Select placeholder="请选择状态" style={{ width: "80px" }}>
                {statusList.map((m, index) => (
                  <Option key={index} value={m.value}>
                    {m.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="name">
              <Select placeholder="请选择角色" style={{ width: "80px" }}>
                {statusList.map((m, index) => (
                  <Option key={index} value={m.value}>
                    {m.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="primary" onClick={clearSearch}>
                清空
              </Button>
              <Button type="primary" onClick={addPower}>
                新增角色
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table<ResponseInitApi>
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
          <Table.Column<ResponseInitApi> title="ID" dataIndex="id" />
          <Table.Column<ResponseInitApi> title="角色" dataIndex="name" />
          <Table.Column<ResponseInitApi>
            title="创建时间"
            dataIndex="created_at"
          />
          <Table.Column<ResponseInitApi>
            title="状态"
            dataIndex="status"
            render={(text, record, index) => {
              if (record.status === "0") {
                return <span>启用</span>;
              }
              return <span>停用</span>;
            }}
          />
          <Table.Column<ResponseInitApi>
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
        <RolesEdit
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
export default memo(RoleManagement);

