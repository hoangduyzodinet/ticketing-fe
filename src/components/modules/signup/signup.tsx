import { Form, Input, Button, Radio, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ISignupPayload } from "../../../interfaces";
import { AuthApi } from "../../../services";
import s from "./signup.module.scss";

const Signup: React.FC = () => {
    const router = useRouter();
    const authApi = new AuthApi();

    const onFinish = async (values: ISignupPayload) => {
        try {
            const result = await authApi.signup(values);

            if (result) {
                message.success("Sign Up Successfully!");
                router.push("/login");
            } else {
                message.error("Sign Up failed!");
            }
        } catch (error: any) {
            message.error(error);
        }
    };

    return (
        <section className={s.signupWrapper}>
            <div className={s.formWrapper}>
                <h1 className={`${s.loginTitle} mb-10`}>Sign up</h1>
                <Form
                    name="basic"
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    scrollToFirstError={true}
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter full name!",
                            },
                        ]}
                        className={s.formItem}
                    >
                        <Input placeholder="Full name" size="large" />
                    </Form.Item>

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
                            {
                                pattern:
                                    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                                message:
                                    "Password must include uppercase, lowercase and number!",
                            },
                            {
                                min: 8,
                                message: "Password minimum 8 characters!",
                            },
                        ]}
                        className={s.formItem}
                    >
                        <Input.Password placeholder="Password" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        className={s.formItem}
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords that you entered do not match!",
                                        ),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        // label="Giới tính"
                        name="gender"
                        rules={[
                            {
                                required: true,
                                message: "Please select gender!",
                            },
                        ]}
                        className={s.formItem}
                    >
                        <Radio.Group className="flex items-center justify-between">
                            <Radio value="Female">Female</Radio>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Other">Other</Radio>
                        </Radio.Group>
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
                            Sign up
                        </Button>
                    </Form.Item>

                    <div className={s.formRedirect}>
                        <span className="mr-2">Already have an account?</span>
                        <Link href="/login">Login</Link>
                    </div>
                </Form>
            </div>
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

export default Signup;
