import { Button, Form, notification } from "antd";
import React, { useRef } from "react";
import ThemeInput from "../../Components/ThemeInput";
import { RULES } from "../../Common/constant";
import authAPI from "../../services/authAPI";
import Loading from "../../Components/Loading";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const ref = useRef();
    const handleLogin = async (values) => {
        try {
            ref.current.showLoading();
            const res = await authAPI.loginApi(values);
            localStorage.setItem("accessToken", res.AccessToken);
            localStorage.setItem("refreshToken", res.RefreshToken);
            localStorage.setItem("IdToken", res.IdToken);
            ref.current.hideLoading();
            navigate("/operator");
        } catch (error) {
            console.log(error);
            ref.current.hideLoading();
            notification.error({
                message: "Tài khoản mật khẩu không chính xác",
            });
        }
    };

    return (
        <>
            <h2 style={{ marginTop: "60px" }}>Login</h2>
            <Loading ref={ref} />
            <div className="box-login">
                <Form form={form} onFinish={handleLogin}>
                    <ThemeInput
                        label={"Tài khoản"}
                        name={"username"}
                        rules={[RULES.REQUIRED, RULES.EMAIL]}
                    />
                    <ThemeInput
                        label={"Mật khẩu"}
                        name={"password"}
                        rules={[RULES.REQUIRED]}
                        isPassword={true}
                    />
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form>
            </div>
        </>
    );
}
