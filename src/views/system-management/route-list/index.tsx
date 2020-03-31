import React, { memo } from "react";
import { Card, Row, Table, Badge } from "antd";

function NestedTable() {
  const expandedRowRender = () => {
    const columns = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        )
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <span className="table-operation">
            <a>Pause</a>
            <a>Stop</a>
          </span>
        )
      }
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56"
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Platform", dataIndex: "platform", key: "platform" },
    { title: "Version", dataIndex: "version", key: "version" },
    { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
    { title: "Creator", dataIndex: "creator", key: "creator" },
    { title: "Date", dataIndex: "createdAt", key: "createdAt" },
    { title: "Action", key: "operation", render: () => <a>Publish</a> }
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: "Screem",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00"
    });
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={data}
    />
  );
}

const RouteList: React.FC = () => {
  return (
    <Card title="路由列表" bordered={false}>
      <Row justify="center"><NestedTable/></Row>
    </Card>
  );
};
export default memo(RouteList);
