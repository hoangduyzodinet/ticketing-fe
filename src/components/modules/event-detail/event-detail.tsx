import {
    ArrowRightOutlined,
    ArrowLeftOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Form,
    Row,
    Col,
    Input,
    Select,
    Button,
    InputNumber,
    Steps,
    DatePicker,
    FormInstance,
    Avatar,
    Spin,
    Upload,
    message,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { useAppSelector } from "../../../redux/hooks";
import { selectorUser } from "../../../redux/user/userSlice";
import { ICategory, IEventPayload } from "../../../interfaces";
import { EventApi, UserApi } from "../../../services";
import s from "./event-detail.module.scss";

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

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

interface IFormEventData {
    name: string;
    categoryId: string;
    logoUrl: string;
    bannerUrl: string;
    description: string;
    eventPlaceName: string;
    eventAddress: string;
    saleStartDate: moment.Moment;
    saleEndDate: moment.Moment;
    eventStartDate: moment.Moment;
    eventEndDate: moment.Moment;
    totalTickets: number;
    availableTickets: number;
    ticketImageUrl: string;
    ticketPrice: number;
    maxTicketOrder: number;
    minTicketOrder: number;
    organizationInfo: string;
    organizationEmail: string;
    organizationPhone: string;
    organizationAddress: string;
    bankName: string;
    cardHolderName: string;
    creditNumber: string;
    userId?: string;
}

interface IEventDetailProps {
    id?: string;
}

const eventApi = new EventApi();
const userApi = new UserApi();

const { Step } = Steps;

const EventDetail: React.FC<IEventDetailProps> = (props) => {
    const { Option } = Select;

    const [current, setCurrent] = React.useState(0);
    const user = useAppSelector(selectorUser);
    const [formInfo] = Form.useForm();
    const [formTicket] = Form.useForm();
    const [formAccountBank] = Form.useForm();

    const [formValues, setFormValues] = useState<IFormEventData>(
        {} as IFormEventData,
    );
    const [isDisplayAlert, setIsDisplayAlert] = useState(false);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isDisplaySpinLogo, setIsDisplaySpinLogo] = useState(false);
    const [isDisplaySpinBanner, setIsDisplaySpinBanner] = useState(false);
    const [isDisplaySpinTicket, setIsDisplaySpinTicket] = useState(false);
    const [imageLogoUrl, setImageLogoUrl] = useState("");
    const [imageBannerUrl, setImageBannerUrl] = useState("");
    const [imageTicketUrl, setImageTicketUrl] = useState("");

    //get bank account of user
    useEffect(() => {
        const getBankAccount = async () => {
            const result: any = await userApi.findBankByUserId(user?.id || "");
            if (result) {
                setFormValues({
                    ...formValues,
                    bankName: result.name,
                    cardHolderName: result.cardHolderName,
                    creditNumber: result.creditNumber,
                });
            }
        };

        const getCategories = async () => {
            const result: ICategory[] | null = await eventApi.getAllCategory();
            if (result) setCategories(result);
        };
        getBankAccount();
        getCategories();
    }, []);

    //get event when update
    useEffect(() => {
        const getEventById = async (id: string) => {
            const result = await eventApi.getEventById(id);
            if (result) {
                const parsedValue = parseValue(result);
                setFormValues({ ...formValues, ...parsedValue });
            }
        };
        if (props.id) {
            getEventById(props.id);
            setIsUpdate(true);
        }
    }, [props.id]);

    useEffect(() => {
        formInfo.setFieldsValue(formValues);
    }, [formInfo, formValues]);

    useEffect(() => {
        formTicket.setFieldsValue(formValues);
    }, [formTicket, formValues]);

    useEffect(() => {
        setImageLogoUrl(formValues.logoUrl);
        setImageBannerUrl(formValues.bannerUrl);
        setImageTicketUrl(formValues.ticketImageUrl);
    }, [
        isUpdate,
        formValues.logoUrl,
        formValues.bannerUrl,
        formValues.ticketImageUrl,
    ]);

    const onFinish = async () => {
        const payload: IEventPayload = { ...formValues, userId: user.id || "" };
        if (!isUpdate) {
            try {
                const result: any = await eventApi.createEvent(payload);
                if (result) {
                    message.success("Created Event Successfully!");
                    router.push("/events/my-event");
                } else {
                    message.error("Created Event failed!");
                }
            } catch (error: any) {
                message.error(error);
            }
        } else {
            message.info("Feature are development!");
        }
    };

    const handleUpload = async (
        file: any,
        field: string,
        form: FormInstance,
    ): Promise<any> => {
        switch (field) {
            case "logoUrl":
                setIsDisplaySpinLogo(true);
                const resultLogo: any = await uploadImage(file);
                setImageLogoUrl(resultLogo.url);
                form.setFields([{ name: field, value: resultLogo.url }]);
                setFormValues({ ...formValues, ...form.getFieldsValue() });
                setIsDisplaySpinLogo(false);
                break;
            case "bannerUrl":
                setIsDisplaySpinBanner(true);
                const resultBanner: any = await uploadImage(file);
                setImageBannerUrl(resultBanner.url);
                form.setFields([{ name: field, value: resultBanner.url }]);
                setFormValues({ ...formValues, ...form.getFieldsValue() });

                setIsDisplaySpinBanner(false);
                break;
            case "ticketImageUrl":
                setIsDisplaySpinTicket(true);
                const result: any = await uploadImage(file);
                setImageTicketUrl(result.url);
                form.setFields([{ name: field, value: result.url }]);
                setFormValues({ ...formValues, ...form.getFieldsValue() });
                setIsDisplaySpinTicket(false);
                break;

            default:
                break;
        }
    };

    const uploadImage = async (file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        const result = await eventApi.uploadImage(formData);
        return result;
    };

    const handleCancel = () => {
        if (confirm("Do you want cancel create event?")) {
            router.push("/");
        } else {
            return;
        }
    };

    const disabledDate = (current: any) => {
        // Can not select days before today and today
        return current && current < moment().endOf("day");
    };

    const next = (value: any) => {
        console.log(value);
        setFormValues((prevState) => ({ ...prevState, ...value }));
        setCurrent((prevState) => prevState + 1);
    };

    const prev = () => {
        setCurrent((prevState) => prevState - 1);
    };

    const parseValue = (eventPayload: IEventPayload): IEventPayload => {
        eventPayload.eventStartDate = moment(eventPayload.eventStartDate);
        eventPayload.eventEndDate = moment(eventPayload.eventEndDate);
        eventPayload.saleStartDate = moment(eventPayload.saleStartDate);
        eventPayload.saleEndDate = moment(eventPayload.saleEndDate);
        eventPayload.ticketPrice = +eventPayload.ticketPrice;
        eventPayload.minTicketOrder = +eventPayload.minTicketOrder;
        eventPayload.maxTicketOrder = +eventPayload.maxTicketOrder;
        eventPayload.totalTickets = +eventPayload.totalTickets;
        return eventPayload;
    };

    const formInfoContent = (
        <Form
            {...layout}
            form={formInfo}
            name="form-info"
            className={s.eventDetailForm}
            validateMessages={validateMessages}
            autoComplete="on"
            onFinish={next}
            initialValues={formValues}
        >
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Event name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="eventPlaceName"
                        label="Event place name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="eventAddress"
                        label="Event place address"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="categoryId"
                        label="Event Category"
                        rules={[
                            {
                                required: true,
                                message: "Please select event category ",
                            },
                        ]}
                    >
                        <Select placeholder="Select event category" allowClear>
                            {categories.map((category) => (
                                <Option value={category.id} key={category.id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true }]}
                    >
                        <TextArea
                            placeholder="Description for event"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="organizationInfo"
                        label="Organizer's Information"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="organizationEmail"
                        label="Organizer's email"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="organizationPhone"
                        label="Organizer's Phone"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="organizationAddress"
                        label="Organizer's Address"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Row
                        gutter={[16, 16]}
                        align="middle"
                        justify="space-between"
                    >
                        <Col span={10}>
                            <Form.Item name="logoUrl" label="Logo event">
                                <Row justify="start">
                                    <Spin
                                        spinning={isDisplaySpinLogo}
                                        size="large"
                                    >
                                        <Avatar
                                            size={128}
                                            icon={<UserOutlined />}
                                            src={
                                                imageLogoUrl
                                                    ? imageLogoUrl
                                                    : "/img/default-image.jpg"
                                            }
                                            shape="square"
                                        />
                                    </Spin>

                                    <Upload
                                        action={(e) =>
                                            handleUpload(e, "logoUrl", formInfo)
                                        }
                                        showUploadList={false}
                                        className="mt-4"
                                    >
                                        <Button
                                            icon={<UploadOutlined />}
                                            className={s.btnUpload}
                                        >
                                            Upload
                                        </Button>
                                    </Upload>
                                </Row>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item name="bannerUrl" label="Banner event">
                                <Row justify="start">
                                    <Spin
                                        spinning={isDisplaySpinBanner}
                                        size="large"
                                    >
                                        <Avatar
                                            size={128}
                                            icon={<UserOutlined />}
                                            src={
                                                imageBannerUrl
                                                    ? imageBannerUrl
                                                    : "/img/default-image.jpg"
                                            }
                                            shape="square"
                                        />
                                    </Spin>

                                    <Upload
                                        action={(e) =>
                                            handleUpload(
                                                e,
                                                "bannerUrl",
                                                formInfo,
                                            )
                                        }
                                        showUploadList={false}
                                        className="mt-4 w-full"
                                    >
                                        <Button
                                            icon={<UploadOutlined />}
                                            className={s.btnUpload}
                                        >
                                            Upload
                                        </Button>
                                    </Upload>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify="end">
                <Button
                    htmlType="submit"
                    disabled={
                        isDisplaySpinBanner ||
                        isDisplaySpinLogo ||
                        isDisplaySpinTicket
                    }
                    className={s.btnPrimary}
                >
                    Continue
                    <span className="ml-10">
                        <ArrowRightOutlined />
                    </span>
                </Button>
            </Row>
        </Form>
    );

    const formTicketContent = (
        <Form
            {...layout}
            form={formTicket}
            name="form-ticket"
            validateMessages={validateMessages}
            autoComplete="on"
            initialValues={formValues}
            onFinish={next}
        >
            <Row gutter={[8, 8]} justify="space-between">
                <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 10 }}>
                    <Col span={24}>
                        <h2 className={s.headerTitle}>Event Time </h2>
                    </Col>
                    <Row gutter={[8, 8]}>
                        <Col span={12}>
                            <Form.Item
                                name="eventStartDate"
                                label="Event start date"
                                rules={[{ required: true }]}
                            >
                                <DatePicker
                                    format="DD-MM-YYYY"
                                    disabledDate={disabledDate}
                                />
                            </Form.Item>
                            <Form.Item
                                name="saleStartDate"
                                label="Sale start date"
                                rules={[{ required: true }]}
                            >
                                <DatePicker
                                    format="DD-MM-YYYY"
                                    disabledDate={disabledDate}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="eventEndDate"
                                label="Event end date"
                                rules={[{ required: true }]}
                            >
                                <DatePicker
                                    format="DD-MM-YYYY"
                                    disabledDate={disabledDate}
                                />
                            </Form.Item>
                            <Form.Item
                                name="saleEndDate"
                                label="Sale end date"
                                rules={[{ required: true }]}
                            >
                                <DatePicker
                                    format="DD-MM-YYYY"
                                    disabledDate={disabledDate}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
                <Col span={14}>
                    <Col span={24}>
                        <h2 className={s.headerTitle}>Ticket </h2>
                    </Col>
                    <Row gutter={[8, 8]}>
                        <Col span={8}>
                            <Form.Item
                                name="ticketPrice"
                                label="Ticket Price"
                                rules={[
                                    { required: true },
                                    {
                                        type: "number",
                                        min: 1,
                                        message:
                                            "Please input number greater than 0",
                                    },
                                ]}
                            >
                                <InputNumber className="w-100" />
                            </Form.Item>
                            <Form.Item
                                name="minTicketOrder"
                                label="Minimum ticket order"
                                dependencies={["maxTicketOrder"]}
                                rules={[
                                    { required: true },
                                    {
                                        type: "number",
                                        min: 1,
                                        message:
                                            "Please input number greater than 0",
                                    },
                                    ({ getFieldValue, isFieldTouched }) => ({
                                        validator(rule, value) {
                                            const maxTicketOrder =
                                                getFieldValue("maxTicketOrder");
                                            if (
                                                isFieldTouched(
                                                    "maxTicketOrder",
                                                ) &&
                                                maxTicketOrder < +value
                                            ) {
                                                return Promise.reject([
                                                    `Please input number less than or equal ${maxTicketOrder}`,
                                                ]);
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <InputNumber className="w-100" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="totalTickets"
                                label="Total tickets"
                                rules={[
                                    { required: true },
                                    {
                                        type: "number",
                                        min: 1,
                                        message:
                                            "Please input number greater than 0",
                                    },
                                ]}
                            >
                                <InputNumber className="w-100" />
                            </Form.Item>
                            <Form.Item
                                name="maxTicketOrder"
                                label="Maximum ticket order"
                                dependencies={["totalTickets"]}
                                rules={[
                                    { required: true },
                                    {
                                        type: "number",
                                        min: 1,
                                        message:
                                            "Please input number greater than 0",
                                    },

                                    ({ getFieldValue, isFieldTouched }) => ({
                                        validator(rule, value) {
                                            const totalTicket =
                                                getFieldValue("totalTickets");
                                            if (
                                                isFieldTouched(
                                                    "maxTicketOrder",
                                                ) &&
                                                totalTicket < +value
                                            ) {
                                                return Promise.reject([
                                                    `Please input number less than or equal ${totalTicket}`,
                                                ]);
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <InputNumber className="w-100" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="ticketImageUrl"
                                label="Ticket Image"
                            >
                                <Row justify="center">
                                    <Spin
                                        spinning={isDisplaySpinTicket}
                                        size="large"
                                    >
                                        <Avatar
                                            size={128}
                                            icon={<UserOutlined />}
                                            src={
                                                imageTicketUrl
                                                    ? imageTicketUrl
                                                    : "/img/default-image.jpg"
                                            }
                                            shape="square"
                                        />
                                    </Spin>

                                    <Upload
                                        action={(e) =>
                                            handleUpload(
                                                e,
                                                "ticketImageUrl",
                                                formTicket,
                                            )
                                        }
                                        showUploadList={false}
                                        className="mt-4"
                                    >
                                        <Button
                                            icon={<UploadOutlined />}
                                            className={s.btnUpload}
                                        >
                                            Upload
                                        </Button>
                                    </Upload>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify="end" className="mt-20">
                <Button
                    className={`${s.btnPrimary} mr-8`}
                    onClick={() => prev()}
                    disabled={
                        isDisplaySpinBanner ||
                        isDisplaySpinLogo ||
                        isDisplaySpinTicket
                    }
                >
                    <ArrowLeftOutlined />
                    Previous
                </Button>

                <Button
                    htmlType="submit"
                    className={s.btnPrimary}
                    disabled={
                        isDisplaySpinBanner ||
                        isDisplaySpinLogo ||
                        isDisplaySpinTicket
                    }
                >
                    Continue
                    <ArrowRightOutlined />
                </Button>
            </Row>
        </Form>
    );

    const formBankContent = (
        <Form
            {...layout}
            form={formAccountBank}
            name="form-bank"
            onFinish={onFinish}
            validateMessages={validateMessages}
            autoComplete="on"
        >
            <Row gutter={[8, 8]} justify="center" align="middle">
                <Col span={24} className="mb-4">
                    <h2 className={s.headerTitle}>Bank Account Information</h2>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="bankName"
                        label="Bank name"
                        rules={[{ required: true }]}
                    >
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                        name="cardHolderName"
                        label="Card Holder Name"
                        rules={[{ required: true }]}
                    >
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                        name="creditNumber"
                        label="Credit Number"
                        rules={[{ required: true }]}
                    >
                        <Input disabled={true} />
                    </Form.Item>
                </Col>
                <Col
                    offset={8}
                    span={16}
                    className="mt-10 flex items-center justify-end"
                >
                    <Button className={s.btnPrimary} onClick={() => prev()}>
                        <ArrowLeftOutlined />
                        Previous
                    </Button>
                    <Button
                        className={`${s.btnPrimary} ml-4`}
                        htmlType="submit"
                    >
                        {isUpdate ? "Update Event" : "Create Event"}
                    </Button>
                    <Button
                        className={`${s.btnPrimaryCancel} ml-4 	`}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Form>
    );

    const steps = [
        {
            title: "Information",
            content: formInfoContent,
        },
        {
            title: "Date & Time, Ticket",
            content: formTicketContent,
        },
        {
            title: "Bank Account",
            content: formBankContent,
        },
    ];

    return (
        <section className={`${s.createEventWrapper} px`}>
            <Row align="middle" justify="center">
                <Col span={24}>
                    <h1 className={s.title}>Create Event</h1>
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 18 }}>
                    <Steps current={current} className="mb-6">
                        {steps.map((item) => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <Row>{steps[current].content}</Row>
                </Col>
            </Row>
        </section>
    );
};

export default EventDetail;
