import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../services/login.service";
import { LoginContext } from "../providers/LoginProvider";
import { useContext } from "react";

const LoginPage = () => {
  const nav = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { token, setToken, handleLogin, setRefresh } = useContext(LoginContext);
  // console.log("token: ", token);
  if (token) {
    nav("/admin");
  }

  const fetchData = async (username, password) => {
    try {
      const res = await postLogin(username, password);
      // console.log("res: ",res)
      setToken(res.data.accessToken);
      setRefresh(res.data.refreshToken)
      handleLogin(res);

      messageApi.open({
        type: "success",
        content: "Đăng nhập thành công!",
        onClose: () => {
          return nav("/admin");
        },
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const onFinish = (values) => {
    console.log("values: ", values);
    fetchData(values.username, values.password);
  };

  return (
    <div className="loginPage">
      {contextHolder}
      <h2>Đăng nhập</h2>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
          username: "emilys",
          password: "emilyspass",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên người dùng!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tên người dùng"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
            {
              min: 6,
              message: "Không ít hơn 6 ký tự!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Nhớ tài khoản</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" href="">
            Quên mật khẩu
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
          Hoặc <Link href="">Đăng ký ngay!</Link>
        </Form.Item>
      </Form>
      <div></div>
    </div>
  );
};

export default LoginPage;
