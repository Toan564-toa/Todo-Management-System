import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Card, Col, Progress, Row, Statistic, Typography } from "antd";
import useDasrbroad from "../hooks/useDasrbroad";

const { Title, Text } = Typography;

const Dashbroad = () => {
  const { data, totalUsers, loading } = useDasrbroad();
  const completedTasks = data.filter((item) => item.completed).length;
  const pendingTasks = data.length - completedTasks;
  const completionPercent = data.length
    ? Math.round((completedTasks / data.length) * 100)
    : 0;

  const statistics = [
    {
      title: "Tổng số công việc",
      value: data.length,
      icon: <UnorderedListOutlined />,
      color: "#1677ff",
    },
    {
      title: "Công việc đã hoàn thành",
      value: completedTasks,
      icon: <CheckCircleOutlined />,
      color: "#52c41a",
    },
    {
      title: "Công việc chưa hoàn thành",
      value: pendingTasks,
      icon: <ClockCircleOutlined />,
      color: "#faad14",
    },
    {
      title: "Tổng số người dùng",
      value: totalUsers,
      icon: <TeamOutlined />,
      color: "#722ed1",
    },
  ];

  return (
    <div>
      <Title level={2} style={{ marginTop: 0 }}>Bảng điều khiển</Title>
      <Text type="secondary">Tổng quan tình trạng công việc và người dùng.</Text>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {statistics.map((statistic) => (
          <Col xs={24} sm={12} xl={6} key={statistic.title}>
            <Card loading={loading}>
              <Statistic
                title={statistic.title}
                value={statistic.value}
                prefix={<span style={{ color: statistic.color }}>{statistic.icon}</span>}
                valueStyle={{ color: statistic.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={10}>
          <Card title="Tiến độ hoàn thành" loading={loading}>
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0" }}>
              <Progress
                type="circle"
                percent={completionPercent}
                strokeColor="#52c41a"
                format={(percent) => `${percent}%`}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={14}>
          <Card title="Phân loại công việc" loading={loading}>
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={12}>
                <Progress
                  percent={completionPercent}
                  strokeColor="#52c41a"
                  format={() => `${completedTasks} đã hoàn thành`}
                />
              </Col>
              <Col xs={24} sm={12}>
                <Progress
                  percent={100 - completionPercent}
                  strokeColor="#faad14"
                  format={() => `${pendingTasks} chưa hoàn thành`}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashbroad;
