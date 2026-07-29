import {
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, Modal, theme } from "antd";
import { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { LoginContext } from "../providers/LoginProvider";
const { Header, Sider, Content } = Layout;
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const nav = useNavigate();

  const {handleLogout} = useContext(LoginContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
    handleLogout();
    nav(`/`);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const logout = () => {
    setIsModalOpen(true);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Modal
        title="Đăng xuất"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Đóng"
      >
        <p>Bạn muốn đăng xuất?</p>
      </Modal>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ flex: 1 }}
            items={[
              {
                key: "1",
                icon: <BarChartOutlined />,
                label: <Link to={`/admin`}>Bảng điều khiển</Link>,
              },
              {
                key: "2",
                icon: <UnorderedListOutlined />,
                label: <Link to={`/admin/task`}>Quản lý công việc</Link>,
              },
              {
                key: "3",
                icon: <UsergroupAddOutlined />,
                label: <Link to={`/admin/user`}>Quản lý tài khoản</Link>,
              },
            ]}
          />
          <Menu
            theme="dark"
            mode="inline"
            selectable={false}
            items={[
              {
                key: "profile",
                icon: <UserOutlined />,
                label: "Tài khoản",
                children: [
                  { key: "4", label: <Link to={`/admin/profile`}>Tài khoản của tôi</Link> },
                  { key: "5", label: <span onClick={()=> logout()}>Đăng xuất</span> },
                ],
              },
            ]}
          />
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
