import React from "react";
import { Divider, Form, Input, Radio } from "antd";
import { CreditCardOutlined, UserOutlined } from "@ant-design/icons";
import { IUserProfile } from "../../../interfaces";
import s from "./information-buyer.module.scss";

interface IUserProps {
    item: IUserProfile;
}

const InformationBuyer: React.FC<IUserProps> = (props) => {
    const { email, numberPhone } = props.item;

    const onFinish = async () => {
        console.log(true);
    };

    return (
        <article>
            <Form
                name="basic"
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                className="form"
                scrollToFirstError={true}
                layout="vertical"
                requiredMark={false}
            >
                <div className="flex items-center font-bold text-xl mb-2.5">
                    <UserOutlined className="mr-2" />
                    <div>Recipient information</div>
                </div>
                <Form.Item
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                    label="Phone number"
                >
                    <Input size="large" defaultValue={numberPhone || ""} />
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
                    label="Email"
                >
                    <Input
                        placeholder="Input here"
                        size="large"
                        defaultValue={email || ""}
                        disabled
                    />
                </Form.Item>

                <Divider />

                <div className="flex items-center font-bold text-xl mb-2.5">
                    <CreditCardOutlined className="mr-2" />
                    <div>Payment Method</div>
                </div>

                <Form.Item name="paymentMethod" className="w-full">
                    <Radio.Group size="large" className="w-full">
                        <Radio.Button
                            value="momo"
                            className={`${s.itemRadio} w-full`}
                        >
                            Momo Wallet
                        </Radio.Button>
                        <Radio.Button
                            value="credit"
                            className={`${s.itemRadio} w-full`}
                        >
                            Credit Card
                        </Radio.Button>
                        <Radio.Button
                            value="atm"
                            className={`${s.itemRadio} w-full`}
                        >
                            ATM
                        </Radio.Button>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </article>
    );
};

export default InformationBuyer;
