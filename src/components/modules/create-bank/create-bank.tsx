import { Modal, Button, Form, Input, Row, Col } from "antd";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { IBankPayload } from "../../../interfaces";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectorUser, updateIsBank } from "../../../redux/user/userSlice";
import { UserApi } from "../../../services";
import { TypeAlertEnum } from "../../basics";
import AlertMessage from "../../basics/alert/alert-message";
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
    const [alertMessage, setAlertMessage] = useState({
        message: "",
        title: TypeAlertEnum.Info,
    });
    const [isDisplayAlert, setIsDisplayAlert] = useState(false);

    useLayoutEffect(() => {
        setIsDisplayAlert(alertMessage.message ? true : false);
    }, [alertMessage]);

    const handleCancel = () => {
        router.push("/");
        setIsModalVisible(false);
    };

    const onFinish = async (values: IBankPayload) => {
        const formValue: IBankPayload = { ...values, userId: user.id };
        try {
            const result = await userApi.createBank(formValue);
            if (result) {
                setAlertMessage({
                    message: "Sign In Successfully!",
                    title: TypeAlertEnum.Success,
                });
                dispatch(updateIsBank({ isBankAccount: !!result }));
                router.push("/events/create");
            }
        } catch (error: any) {
            setAlertMessage({
                message: error?.errorCode,
                title: TypeAlertEnum.Error,
            });
        }
    };

    return (
        <Row>
            <Col offset="16" span="8">
                {isDisplayAlert && (
                    <AlertMessage
                        message={alertMessage.message}
                        title={alertMessage.title}
                    />
                )}
            </Col>
            <Col span={24}>
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
            </Col>
        </Row>
    );
};

export default CreateBank;
