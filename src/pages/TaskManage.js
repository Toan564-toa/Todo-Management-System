import React from "react";
import useTask from "../hooks/useTask";
import { Button, Flex, Popconfirm, Space, Spin, Table, Tag } from "antd";

const TaskManage = () => {
  const { data, loading, pagination, setData } = useTask();

  console.log("data: ", data);

  const handleDelete = (id) => {
    const newData = data?.todos?.filter((i) => i.id !== id);
    setData((currentData) => ({
      ...currentData, todos: newData
    }));
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Công việc",
      dataIndex: "todo",
      key: "todo",
    },
    {
      title: "Trạng thái",
      key: "completed",
      dataIndex: "completed",
      render: (status) => (
        <Flex gap="small" align="center" wrap>
          <Tag color={status === true ? "green" : "orange"} key={status}>
            {status === true ? "Hoàn thành" : "Chưa hoàn thành"}
          </Tag>
        </Flex>
      ),
    },
    {
      title: "Thao tác",
      key: "id",
      render: (_, record) => (
        <Space size="medium">
          <Button>Kiểm tra</Button>
          <Popconfirm
            title="Xóa công việc"
            description="Bạn có chắc muốn xóa không?"
            onConfirm={() => handleDelete(record.id)}
            // onCancel={cancel}
            okText="Xóa"
            cancelText="Không"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <Spin tip="Đang tải thông tin ..." size="large" fullscreen />;
  }

  return (
    <div>
      <h2>Quản lý công việc</h2>
      <Table
        columns={columns}
        dataSource={data?.todos}
        key={data?.todos?.id}
        pagination={pagination}
      />
    </div>
  );
};

export default TaskManage;
