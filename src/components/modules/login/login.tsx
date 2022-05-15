/* eslint-disable no-unused-vars */
import Link from "next/link";
import { Input, Button, Form, Col, Row, Divider } from "antd";
import { useLayoutEffect } from "react";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { TypeAlertEnum } from "../../basics";
import { useAppDispatch } from "../../../redux/hooks";
import { ILoginPayload } from "../../../interfaces";
import { AuthApi } from "../../../services";
import { login } from "../../../redux/user/userSlice";
import AlertMessage from "../../basics/alert/alert-message";
import FacebookLogin from "react-facebook-login";
import s from "./login.module.scss";

const Login: React.FC = () => {
    const router = useRouter();
    const authApi = new AuthApi();

    const [alertMessage, setAlertMessage] = useState({
        message: "",
        title: TypeAlertEnum.Info,
    });
    const [isDisplayAlert, setIsDisplayAlert] = useState(false);
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        setIsDisplayAlert(alertMessage.message ? true : false);
    }, [alertMessage]);

    const onFinish = async (values: ILoginPayload) => {
        try {
            const result = await authApi.login(values);
            if (result) {
                localStorage.setItem("access_token", result.accessToken);
                dispatch(login(result.payload));
                setAlertMessage({
                    message: "Sign In Successfully!",
                    title: TypeAlertEnum.Success,
                });
                router.push("/");
            }
        } catch (error: any) {
            setAlertMessage({
                message: error?.errorCode,
                title: TypeAlertEnum.Error,
            });
        }
    };

    const responseFacebook = async (response: any) => {
        try {
            const result: any = await authApi.loginFacebook(
                response.accessToken,
            );
            if (result) {
                localStorage.setItem("access_token", result.accessToken);
                dispatch(login(result.payload));
                setAlertMessage({
                    message: "SignIn Successfully!",
                    title: TypeAlertEnum.Success,
                });
                router.push("/");
            }
        } catch (error: any) {
            setAlertMessage({
                message: error?.errorCode,
                title: TypeAlertEnum.Error,
            });
        }
    };

    return (
        <section className={s.loginWrapper}>
            <Row>
                <Col offset="16" span="8">
                    {isDisplayAlert && (
                        <AlertMessage
                            message={alertMessage.message}
                            title={alertMessage.title}
                        />
                    )}
                </Col>
                <Col span="24">
                    <div className={s.formWrapper}>
                        <h1 className={`${s.loginTitle} mb-10`}>Login</h1>
                        <Form
                            name="basic"
                            wrapperCol={{ span: 24 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="on"
                            scrollToFirstError={true}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter email!",
                                        type: "email",
                                    },
                                ]}
                                className={s.formItem}
                            >
                                <Input placeholder="Email" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        type: "string",
                                        required: true,
                                        message: "Please enter password!",
                                    },
                                ]}
                                className={s.formItem}
                            >
                                <Input.Password
                                    placeholder="Password"
                                    size="large"
                                />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{ span: 24 }}
                                className={`${s.formItem} mt-4`}
                            >
                                <Button
                                    type="default"
                                    htmlType="submit"
                                    size="large"
                                    className={s.formBtn}
                                >
                                    Login
                                </Button>
                            </Form.Item>
                            <Divider className={s.divider}>Or</Divider>

                            <Form.Item
                                wrapperCol={{ span: 24 }}
                                className={s.formItem}
                            >
                                <FacebookLogin
                                    appId={process.env.FB_APP_ID || ""}
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    // onClick={hanldeLoginFacebook}
                                    size="small"
                                    callback={responseFacebook}
                                    cssClass={s.formBtnFb}
                                    icon="fa-facebook"
                                />
                            </Form.Item>

                            <div className={s.formRedirect}>
                                <span className="mr-2">
                                    Don't have an account?
                                </span>
                                <Link href="/signup">Sign up</Link>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
            <Button
                type="text"
                className={s.logo}
                onClick={() => router.push("/")}
            >
                <span>TICKETING</span>
            </Button>
            <div className={s.backgroundImg}></div>
        </section>
    );
};

export default Login;
