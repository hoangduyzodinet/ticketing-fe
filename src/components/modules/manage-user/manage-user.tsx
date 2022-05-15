import {
    Table,
    Space,
    Tag,
    Popconfirm,
    Modal,
    Form,
    Input,
    Button,
    Select,
    DatePicker,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ISignupPayload, IUserProfile } from "../../../interfaces";
import { AuthApi, UserApi } from "../../../services";
import s from "./manage-user.module.scss";

const initState: ISignupPayload = {
    name: "",
    email: "",
    password: "",
    gender: "",
    confirm: "",
};

const userApi = new UserApi();
const authApi = new AuthApi();

const ManageUser: React.FC = () => {
    const { Option } = Select;
    const [formInfo] = Form.useForm();
    const [formAddUser] = Form.useForm();

    const [users, setUsers] = useState<IUserProfile[]>([]);
    const [callback, setCallback] = useState(false);
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [modalVisibleAddUser, setModalVisibleAddUser] = useState(false);
    const [userEdit, setUserEdit] = useState<IUserProfile>();
    const [loading, setLoading] = useState(false);

    const dateFormat = "DD/MM/YYYY";

    useEffect(() => {
        const getUsers = async () => {
            const result = await userApi.getAllUser();
            if (result) setUsers(result);
        };
        getUsers();
    }, [callback]);

    useEffect(() => {
        formInfo.setFieldsValue(userEdit);
    }, [formInfo, userEdit]);

    const handleEdit = async (key: string) => {
        const user = await userApi.getUserByAdmin(key);
        if (user) {
            user.birthday ? (user.birthday = moment(user.birthday)) : "";
            setUserEdit(user);
        }
        setModalVisibleEdit(true);
    };

    const handleCancel = () => {
        formInfo.resetFields();
        formAddUser.resetFields();
        setModalVisibleEdit(false);
        setModalVisibleAddUser(false);
    };

    const confirmEditUser = async (valuesUserEdit: IUserProfile) => {
        setLoading(true);
        const { id, ...rest } = valuesUserEdit;
        if (id) {
            const result = await userApi.patchUserByAdmin(id, valuesUserEdit);
            if (result) {
                setCallback(!callback);
            }
        }
        setModalVisibleEdit(false);
        setLoading(false);
    };

    const confirmDeleteUser = async (key: string, status: boolean) => {
        const result = await userApi.patchUserByAdmin(key, {
            isDeleted: !status,
        });
        if (result) {
            setCallback(!callback);
        }
    };

    const confirmAddUser = async (value: ISignupPayload) => {
        const { confirm, ...user } = value;
        const result = await authApi.signup(user);
        if (result) {
            formAddUser.setFieldsValue(initState);
            setCallback(!callback);
            setLoading(false);
            setModalVisibleAddUser(false);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
        },
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            render: (status: boolean) => (
                <Tag color={status ? "error" : "success"}>
                    {status ? "deleted" : "success"}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (record: { key: string; status: boolean }) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record.key)}>Edit</a>
                    <Popconfirm
                        title={
                            record.status
                                ? "Are you sure to restore this user?"
                                : "Are you sure to delete this user?"
                        }
                        onConfirm={() =>
                            confirmDeleteUser(record.key, record.status)
                        }
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#">{record.status ? "Restore" : "Delete"}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const data = users.map((user) => ({
        key: user.id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.isDeleted,
    }));

    return (
        <>
            <article
                className={`${s.header} flex items-center w-full justify-between`}
            >
                <div>
                    <h4>Manager User</h4>
                    <p>
                        Create new user or update a user existing user. You can
                        then set their permission here to
                    </p>
                </div>
                <Button
                    type="primary"
                    shape="default"
                    size="large"
                    onClick={() => setModalVisibleAddUser(true)}
                    className={s.btnPrimary}
                >
                    Add a new user
                </Button>
            </article>

            <Modal
                title="Edit User"
                centered
                visible={modalVisibleEdit}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="back"
                        size="large"
                        className={s.btnCancel}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>,
                    <Button
                        form="form-edit-user"
                        htmlType="submit"
                        key="submit"
                        size="large"
                        className={s.btnPrimary}
                        loading={loading}
                    >
                        Save
                    </Button>,
                ]}
            >
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    name="form-edit-user"
                    form={formInfo}
                    onFinish={confirmEditUser}
                >
                    <Form.Item name="id" label="ID">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="numberPhone" label="Number Phone">
                        <Input />
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
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Select gender" allowClear>
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Add user */}
            <Modal
                title="Add User"
                centered
                visible={modalVisibleAddUser}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="back"
                        size="large"
                        className={s.btnCancel}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>,
                    <Button
                        form="form-add-user"
                        htmlType="submit"
                        key="submit"
                        size="large"
                        className={s.btnPrimary}
                        loading={loading}
                    >
                        Add
                    </Button>,
                ]}
            >
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    name="form-add-user"
                    onFinish={confirmAddUser}
                    form={formAddUser}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter full name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: "Please enter email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
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
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
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
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: "Please select gender!",
                            },
                        ]}
                    >
                        <Select placeholder="Select gender" allowClear>
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            <Option value="Other">Other</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default ManageUser;
