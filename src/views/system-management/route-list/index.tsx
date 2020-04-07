import React, { memo, useEffect, useState, useCallback, useRef } from "react";
import { Card, Row, Table, Badge, message, Button, Modal } from "antd";
import request from "@api/index";
import { getListApi, getRoutesApi, getPermissionApi, postSubmitApi } from "./api";
import { RouteConfigs } from "@typings/menuRouter";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import "./index.less";
import RouteEdit from "./route-edit";
import { getUserRoutesAsync } from "@store/module/app";
import { useDispatch } from "react-redux";

const RouteList: React.FC = () => {
  const dispatch = useDispatch();
  const [visibleDrawer, setvisibleDrawer] = useState<boolean>(false);
  const [titleDrawer, settitleDrawer] = useState<string>("");
  const [tableLoading, settableLoading] = useState<boolean>(true);
  const [rowDrawer, setrowDrawer] = useState<any>({});
  const [isRefsh, setisRefsh] = useState<boolean>(false);

  // 初始化数据
  const [localData, setlocalData] = useState<RouteConfigs[]>([]);
  const [parentRoutes, setparentRoutes] = useState<RouteConfigs[]>([]);
  const [permissionList, setpermissionList] = useState([]);

  useEffect(() => {
    function getBaseData() {
      request<RouteConfigs[]>(getRoutesApi, {
        onSuccess(res) {
          setparentRoutes(res);
        },
        onError(error) {
          message.error(error.msg);
        }
      });
      request<[]>(getPermissionApi, {
        onSuccess(res) {
          setpermissionList(res);
        },
        onError(error) {
          message.error(error.msg);
        }
      });
    }
    function getList() {
      settableLoading(true);
      request<RouteConfigs[]>(() => getListApi(), {
        onSuccess(res) {
          console.log(res, "====");
          settableLoading(false);
          setlocalData(res);
        },
        onError(error) {
          message.error(error.msg);
        }
      });
    }
    setisRefsh(false);
    getList();
    getBaseData();
  }, [isRefsh]);

  const columns = [
    { dataIndex: "id", width: 100 },
    {
      dataIndex: "title",
      width: 200,
      render: (text: any, record: any) => {
        return (
          <>
            <span>{text}</span> &nbsp;&nbsp;&nbsp;&nbsp;
            {record.path && (
              <span style={{ color: "blue" }}>{record.path}</span>
            )}
          </>
        );
      }
    },
    {
      width: 100,
      dataIndex: "operation",
      render: (text: any, record: any) => {
        return (
          <>
            <Button onClick={() => editRoute(record)}>编辑</Button>
            <Button danger onClick={() => delRoute(record)}>
              删除
            </Button>
          </>
        );
      }
    }
  ];

  const addRoute = useCallback(() => {
    const isNeedIcon = true;
    const isNeedPath = true;
    setrowDrawer({ isNeedIcon, isNeedPath });
    settitleDrawer("新增菜单");
    setvisibleDrawer(true);
  }, []);

  const editRoute = useCallback(data => {
    const isNeedIcon = data.parent_id === 0 ? true : false;
    const isNeedPath =
      data.parent_id === 0 && data.children && data.children.length ? false : true;
    setrowDrawer({ isNeedPath, isNeedIcon, ...data });
    settitleDrawer("编辑菜单");
    setvisibleDrawer(true);
  }, []);

  const delRoute = (data: any) => {
    console.log('====')
    const mod = Modal.confirm({
      title: "提示",
      content: (
        <div>
          {data.children && data.children.length ? (
            <p>所有子菜单都会被删除，确定删除？</p>
          ) : (
            <p>确定删除？</p>
          )}
        </div>
      ),
      onOk: () => {
        request(() => postSubmitApi("delete", { id: data.id }), {
          onSuccess() {
            message.success("删除成功");
            setisRefsh(true);
            dispatch(getUserRoutesAsync());
            mod.destroy();
          },
          onError(error) {
            message.error(error.msg);
          }
        });
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

  return (
    <Card
      title="菜单管理"
      bordered={false}
      extra={<Button onClick={addRoute}>新增</Button>}
    >
      <Row justify="center">
        <Table
          className="table-wrap"
          showHeader={false}
          columns={columns}
          dataSource={localData}
          pagination={false}
          rowKey="id"
          bordered
          loading={tableLoading}
          expandable={{
            expandIcon: ({ expanded, onExpand, record }) => {
              if (record.children && record.children.length) {
                return expanded ? (
                  <DownOutlined
                    className="table-icon"
                    onClick={e => onExpand(record, e)}
                  />
                ) : (
                  <RightOutlined
                    className="table-icon"
                    onClick={e => onExpand(record, e)}
                  />
                );
              }
              return "";
            },
            indentSize: 30
          }}
        />
      </Row>
      {visibleDrawer && (
        <RouteEdit
          visible={visibleDrawer}
          title={titleDrawer}
          closeDrawer={closeDrawer}
          state={rowDrawer}
          refushList={refushList}
          parentRoutes={parentRoutes}
          permissionList={permissionList}
        />
      )}
    </Card>
  );
};
export default memo(RouteList);
