import { Avatar, Button, Space, Spin, Table, Tag } from "antd";
import useUser from "../hooks/useUser";

const UserMange = () => {
  const { data, loading } = useUser();

  const displayUser = (id) => {
    console.log("id: ", id)
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Người dùng",
      key: "user",
      render: (_, record) => (
        <Space>
          <Avatar src={record.image} alt={`${record.firstName} ${record.lastName}`} />
          <span>{`${record.firstName} ${record.lastName}`}</span>
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <Tag color={gender === "female" ? "magenta" : "blue"}>
          {gender === "female" ? "Nữ" : "Nam"}
        </Tag>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color={role === "admin" ? "gold" : "green"}>{role}</Tag>,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button onClick={()=> displayUser(record.id)} color="blue">Chi tiết</Button>
      ),
    },
  ];

  if (loading) {
    return <Spin tip="Đang tải thông tin..." size="large" fullscreen />;
  }

  return (
    <div>
      <h2>Quản lý người dùng</h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data?.users || []}
        pagination={{
          pageSize: 10,
          total: data?.total || 0,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default UserMange;
