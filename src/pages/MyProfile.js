import { EnvironmentOutlined, MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Avatar, Card, Col, Descriptions, Row, Spin, Tag, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { getLogin } from "../services/login.service";
import { LoginContext } from "../providers/LoginProvider";

const { Title, Text } = Typography;

const MyProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { token } = useContext(LoginContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getLogin();
        setData(res?.data);
      } catch (fetchError) {
        console.error("Không thể tải thông tin hồ sơ:", fetchError);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <Spin tip="Đang tải thông tin cá nhân..." size="large" fullscreen />;
  }

  if (error || !data) {
    return <Alert type="error" message="Không thể tải thông tin cá nhân" showIcon />;
  }

  const fullName = `${data.firstName || ""} ${data.lastName || ""}`.trim();
  const address = [
    data.address?.address,
    data.address?.city,
    data.address?.state,
    data.address?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <Title level={2}>Tài khoản của tôi</Title>

      <Card>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} sm="auto" style={{ textAlign: "center" }}>
            <Avatar size={120} src={data.image} icon={<UserOutlined />} />
          </Col>
          <Col xs={24} sm={16}>
            <Title level={3} style={{ marginBottom: 4 }}>
              {fullName || data.username}
            </Title>
            <Text type="secondary">@{data.username}</Text>
            <div style={{ marginTop: 12 }}>
              <Tag color="blue">{data.role || "user"}</Tag>
              {data.gender && <Tag>{data.gender}</Tag>}
            </div>
            <div style={{ marginTop: 16 }}>
              <div><MailOutlined /> {data.email}</div>
              <div style={{ marginTop: 8 }}><PhoneOutlined /> {data.phone || "Chưa cập nhật"}</div>
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="Thông tin cá nhân">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Họ và tên">{fullName}</Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">{data.birthDate || "Chưa cập nhật"}</Descriptions.Item>
              <Descriptions.Item label="Tuổi">{data.age || "Chưa cập nhật"}</Descriptions.Item>
              <Descriptions.Item label="Nhóm máu">{data.bloodGroup || "Chưa cập nhật"}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Công việc & địa chỉ">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Công ty">{data.company?.name || "Chưa cập nhật"}</Descriptions.Item>
              <Descriptions.Item label="Chức danh">{data.company?.title || "Chưa cập nhật"}</Descriptions.Item>
              <Descriptions.Item label="Học vấn">{data.university || "Chưa cập nhật"}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                <EnvironmentOutlined /> {address || "Chưa cập nhật"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyProfile;
