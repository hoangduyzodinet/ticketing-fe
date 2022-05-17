import { Modal, Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { IBankPayload } from "../../../interfaces";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectorUser, updateIsBank } from "../../../redux/user/userSlice";
import { UserApi } from "../../../services";
import s from "./create-bank.module.scss";

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const validateMessages = {
    required: "${label} is required!",
    types: {
        email: "${label} is not a valid email!",
        number: "${label} is not a valid number!",
    },
    number: {
        range: "${label} must be greater than ${min}",
    },
};

const userApi = new UserApi();

const CreateBank: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectorUser);

    const [isModalVisible, setIsModalVisible] = useState(true);

    const handleCancel = () => {
        router.push("/");
        setIsModalVisible(false);
    };

    const onFinish = async (values: IBankPayload) => {
        const formValue: IBankPayload = { ...values, userId: user?.id || "" };
        try {
            const result = await userApi.createBank(formValue);
            if (result) {
                message.success("Create bank successfully!");
                dispatch(updateIsBank({ isBankAccount: !!result }));
                router.push("/events/create");
            } else {
                message.error("Create bank failed!");
            }
        } catch (error: any) {
            message.error(error);
        }
    };

    return (
        <section>
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                className={s.createBank}
                footer={[
                    <Button
                        key="back"
                        size="large"
                        className={s.btnPrimaryCancel}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>,
                    <Button
                        form="form-creat-bank"
                        htmlType="submit"
                        key="submit"
                        size="large"
                        className={s.btnPrimary}
                    >
                        Save
                    </Button>,
                ]}
            >
                <h1 className={`${s.title} mb-8`}>Create Bank Account</h1>

                <Form
                    {...layout}
                    name="form-creat-bank"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name="name"
                        label="Bank name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="cardHolderName"
                        label="Card holder name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="creditNumber"
                        label="Credit number"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </section>
    );
};

export default CreateBank;
