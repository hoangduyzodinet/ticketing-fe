import {
    Avatar,
    Button,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    Row,
    Select,
    Spin,
    Typography,
    Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { IUserProfile } from "../../interfaces";
import { TypeAlertEnum } from "../../components";
import { EventApi, UserApi } from "../../services";
import AlertMessage from "../../components/basics/alert/alert-message";
import s from "./user-profile.module.scss";

const userApi = new UserApi();
const eventApi = new EventApi();

const UserProfileTemplate: React.FC = () => {
    const { Option } = Select;
    const [data, setData] = useState<IUserProfile>({} as IUserProfile);
    const { Title } = Typography;
    const [form] = Form.useForm();

    const [alertMessage, setAlertMessage] = useState({
        message: "",
        title: TypeAlertEnum.Info,
    });
    const [isDisplayAlert, setIsDisplayAlert] = useState(false);
    const [isDisplaySpin, setIsDisplaySpin] = useState(false);

    const [imageUrl, setImageUrl] = useState("");

    const dateFormat = "DD/MM/YYYY";

    useEffect(() => {
        const getUserById = async (id: string) => {
            const result = await userApi.getUser();
            if (result) {
                result.birthday
                    ? (result.birthday = moment(result.birthday))
                    : "";
                result.avatar ? setImageUrl(result.avatar) : setImageUrl("");
                setData(result);
            }
        };

        const token = localStorage.getItem("access_token");
        if (token) {
            getUserById(token);
        }
    }, []);

    useEffect(() => {
        form.setFieldsValue({ ...data });
    }, [data, form]);

    useEffect(() => {
        setIsDisplayAlert(alertMessage.message ? true : false);
    }, [alertMessage]);

    useEffect(() => {
        form.setFields([{ name: "avatar", value: imageUrl }]);
    }, [form, imageUrl]);

    const handleUpload = async (file: any): Promise<any> => {
        setIsDisplaySpin(true);
        const formData = new FormData();
        formData.append("file", file);
        const result: any = await eventApi.uploadImage(formData);
        setImageUrl(result.url);
        setIsDisplaySpin(false);
    };

    const onFinish = async (value: IUserProfile) => {
        try {
            const result = await userApi.updateUser(value);
            if (result) {
                setData(result);
                setAlertMessage({
                    message: "Update event Successfully!",
                    title: TypeAlertEnum.Success,
                });
            } else {
                setAlertMessage({
                    message: "Update event Failed!",
                    title: TypeAlertEnum.Error,
                });
            }
        } catch (error: any) {
            setAlertMessage({
                message: error?.errorCode,
                title: TypeAlertEnum.Error,
            });
        }
    };

    return (
        <Row className={s.profileWrap}>
            <Col offset="16" span="8">
                {isDisplayAlert && (
                    <AlertMessage
                        message={alertMessage.message}
                        title={alertMessage.title}
                    />
                )}
            </Col>
            <Col span={24}>
                <Row>
                    <Col span={24}>
                        <Title className={s.profileHeader} level={2}>
                            Your Profile
                        </Title>
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <Form
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 18 }}
                            name="form-profile"
                            form={form}
                            onFinish={onFinish}
                            className={s.formProfile}
                        >
                            <Form.Item name="avatar" className="w-full">
                                <Avatar
                                    size={128}
                                    icon={<UserOutlined />}
                                    src={
                                        imageUrl
                                            ? imageUrl
                                            : "/img/default-image.jpg"
                                    }
                                />
                                <Upload
                                    action={handleUpload}
                                    showUploadList={false}
                                >
                                    <Button
                                        icon={<UploadOutlined />}
                                        className={`${s.btnUpload} flex items-center mt-4`}
                                    >
                                        Upload
                                    </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item name="name" label="Full Name">
                                <Input size="large" />
                            </Form.Item>
                            <Form.Item name="email" label="Email">
                                <Input size="large" disabled />
                            </Form.Item>
                            <Form.Item name="numberPhone" label="Phone number">
                                <Input size="large" />
                            </Form.Item>
                            <Form.Item
                                name="birthday"
                                className="w-full"
                                label="Birthday"
                            >
                                <DatePicker
                                    size="large"
                                    format={dateFormat}
                                    className="w-full"
                                />
                            </Form.Item>
                            <Form.Item name="gender" label="Gender">
                                <Select
                                    placeholder="Select gender"
                                    allowClear
                                    size="large"
                                >
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            </Form.Item>

                            <Row justify="center" className="mt-4">
                                <Button
                                    className={s.btnPrimary}
                                    size="large"
                                    htmlType="submit"
                                    disabled={isDisplaySpin}
                                >
                                    Update Profile
                                </Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default UserProfileTemplate;
