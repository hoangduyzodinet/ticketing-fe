import {
    CalendarOutlined,
    EnvironmentFilled,
    FieldTimeOutlined,
    FileTextOutlined,
    MoneyCollectOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Col,
    Empty,
    Image,
    message,
    Row,
    Skeleton,
    Table,
    Tabs,
    Typography,
} from "antd";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IEventPayload } from "../../interfaces";
import { selectorEvent } from "../../redux/event/eventSlice";
import { useAppSelector } from "../../redux/hooks";
import { EventApi } from "../../services";
import { formatDate } from "../../utils/format-date";
import { formatPrice } from "../../utils/format-price";
import s from "./event-detail.module.scss";

const eventApi = new EventApi();

const EventDetailTemplate: React.FC = () => {
    const { Title, Text, Paragraph } = Typography;
    const { TabPane } = Tabs;

    const router = useRouter();
    const event = useAppSelector(selectorEvent);

    const [data, setData] = useState<IEventPayload>({} as IEventPayload);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const id = router.query.id ? router.query.id.toString() : "";

    const columns = [
        {
            title: "Ticket Price",
            dataIndex: "ticketPrice",
            key: "price",
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: "Ticket Amount ",
            dataIndex: "totalTickets",
            key: "amount",
            render: (text: string) => <a>{text}</a>,
        },
        // {
        //   title: 'Number of tickets sold ',
        //   dataIndex: '',
        //   key: 'amount',
        //   render: (text: string) => <a>{text}</a>,
        // },
        {
            title: "Ticket Image",
            dataIndex: "ticketImageUrl",
            key: "image",
            render: (text: string) => (
                <Image
                    width={400}
                    height={200}
                    className={s.eventDetailImg}
                    src={text ? text : "/img/default-image.jpg"}
                    preview={false}
                />
            ),
        },
    ];
    useEffect(() => {
        const getEvent = async (id: string) => {
            try {
                setIsLoading(true);
                const result = await eventApi.getEventById(id);
                if (result) {
                    setData(result);
                }
                setIsLoading(false);
            } catch (error: any) {
                message.error(error.message);
            }
        };

        if (id) {
            getEvent(id);
        }
    }, [id]);

    useEffect(() => {
        setIsUpdate(event.isOwner ? event.isOwner : false);
    }, [event.isOwner]);

    const handleClick = () => {
        if (isUpdate) {
            router.push(`/events/update/${id}`);
        } else {
            router.push(`/checkout/${id}`);
        }
    };

    if (isLoading) return <Skeleton className="mt-10" />;

    return (
        <>
            {!data.id && <Empty />}
            {data.id && (
                <section className={s.eventDetailWrapper}>
                    <Row justify="center">
                        <Col span={12}>
                            <Image
                                src={
                                    data.bannerUrl
                                        ? data.bannerUrl
                                        : "/img/default-image.jpg"
                                }
                                className={`${s.eventImg} w-full`}
                                preview={false}
                            />
                        </Col>
                        <Col span={12} className={s.eventInfo}>
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-start justify-start">
                                        <CalendarOutlined className="text-3xl mr-4" />
                                        <h4 className={s.eventName}>
                                            {data.name}
                                        </h4>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center">
                                            <FieldTimeOutlined />
                                            <span className="ml-4">
                                                {`${formatDate(
                                                    data.eventStartDate.toString(),
                                                )} - ${formatDate(
                                                    data.eventEndDate.toString(),
                                                )}`}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <EnvironmentFilled />
                                            <span className="ml-4">{`${data.eventPlaceName} - ${data.eventAddress}`}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <MoneyCollectOutlined />
                                            <span className="ml-4">
                                                {formatPrice(data.ticketPrice)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    className={`${s.primaryBtn} w-full`}
                                    size="large"
                                    onClick={handleClick}
                                >
                                    {isUpdate ? "Update Event" : "Order Ticket"}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Tabs className="w-full">
                            <TabPane
                                tab={
                                    <span>
                                        <FileTextOutlined /> Introduce
                                    </span>
                                }
                                key="1"
                            >
                                <Title level={3}>{data.name}</Title>
                                <Paragraph>{data.description}</Paragraph>
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        <MoneyCollectOutlined /> Ticket
                                        Information
                                    </span>
                                }
                                key="2"
                            >
                                <Table
                                    columns={columns}
                                    dataSource={[data]}
                                    pagination={false}
                                    bordered
                                ></Table>
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        <TeamOutlined /> Organizers Information
                                    </span>
                                }
                                key="3"
                            >
                                <Row>
                                    <Col span={4}>
                                        <Avatar
                                            size={128}
                                            src={
                                                data.logoUrl
                                                    ? data.logoUrl
                                                    : "/img/default-image.jpg"
                                            }
                                        />
                                    </Col>
                                    <Col span={18}>
                                        <Title level={2}>
                                            {data.organizationInfo}
                                        </Title>
                                        <Col span={24}>
                                            <Paragraph>
                                                Address -{" "}
                                                {data.organizationAddress}
                                            </Paragraph>
                                        </Col>
                                        <Col span={24}>
                                            <Paragraph>
                                                Phone - {data.organizationPhone}
                                            </Paragraph>
                                        </Col>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Row>
                </section>
            )}
        </>
    );
};

export default EventDetailTemplate;
