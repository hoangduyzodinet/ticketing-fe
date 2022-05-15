import React from "react";
import { Avatar, Table, Tabs, Tag } from "antd";
import {
    AntDesignOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    DownloadOutlined,
    EnvironmentFilled,
    FieldTimeOutlined,
    ProfileOutlined,
    SolutionOutlined,
    SyncOutlined,
} from "@ant-design/icons";
import { IOrderPayload, StatusEnum } from "../../../interfaces";
import s from "./order-item.module.scss";

interface IOrderItemProps {
    item: IOrderPayload;
}

const OrderItem: React.FC<IOrderItemProps> = (props) => {
    const { TabPane } = Tabs;
    const { amount, tickets, event, status } = props.item;

    const columns = [
        {
            title: "TICKET TYPE",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "QUANTITY",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "UNIT PRICE",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "TOTAL AMOUNT",
            dataIndex: "total",
            key: "total",
        },
    ];

    const data = [
        {
            key: "1",
            name: event.name,
            quantity: amount,
            price: +event.ticketPrice,
            total: +event.ticketPrice * amount,
        },
    ];

    const columnsTicket = [
        {
            title: "No",
            dataIndex: "number",
            key: "number",
        },
        {
            title: "TICKET KEY",
            dataIndex: "ticket",
            key: "ticket",
        },
        {
            title: "DOWNLOAD",
            dataIndex: "download",
            key: "download",
        },
    ];

    const TagStatus = () => (
        <Tag
            color={
                status === StatusEnum.Progress
                    ? "processing"
                    : status === StatusEnum.Done
                    ? "success"
                    : "error"
            }
            icon={
                status === StatusEnum.Progress ? (
                    <SyncOutlined spin />
                ) : status === StatusEnum.Done ? (
                    <CheckCircleOutlined />
                ) : (
                    <CloseCircleOutlined />
                )
            }
        >
            {status === StatusEnum.Progress
                ? "processing"
                : status === StatusEnum.Done
                ? "success"
                : "canceled"}
        </Tag>
    );

    const dataTicket = tickets
        ? tickets.map((ticket, index) => ({
              key: index + 1,
              number: index + 1,
              ticket,
              download: <DownloadOutlined />,
          }))
        : [
              {
                  key: 0,
                  number: 0,
                  ticket: "",
                  download: <></>,
              },
          ];

    return (
        <>
            <article className={s.orderItemWrapper}>
                <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center">
                        <Avatar
                            size={{
                                xs: 24,
                                sm: 32,
                                md: 40,
                                lg: 64,
                                xl: 80,
                                xxl: 100,
                            }}
                            icon={!event.logoUrl ? <AntDesignOutlined /> : ""}
                            src={event.logoUrl}
                        />
                        <div className="ml-4">
                            <div
                                className={`${s.orderItemTitle} flex items-center`}
                            >
                                <span className="mr-4">{event.name}</span>
                                <TagStatus />
                            </div>
                            <div className="text-sm flex items-center ">
                                <FieldTimeOutlined />
                                <span className="ml-2">
                                    {event.eventStartDate}
                                </span>
                            </div>
                            <div className="text-sm flex items-center ">
                                <EnvironmentFilled />
                                <span className="ml-2">
                                    {event.eventPlaceName +
                                        " - " +
                                        event.eventAddress}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Avatar
                        shape="square"
                        size={{
                            xs: 24,
                            sm: 32,
                            md: 40,
                            lg: 64,
                            xl: 80,
                            xxl: 100,
                        }}
                        src="https://vi.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png"
                    />
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane
                        tab={
                            <span>
                                <ProfileOutlined />
                                Order Detail
                            </span>
                        }
                        key="1"
                    >
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                        />
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <SolutionOutlined />
                                My Tickets
                            </span>
                        }
                        key="2"
                    >
                        <Table
                            columns={columnsTicket}
                            dataSource={dataTicket}
                        />
                    </TabPane>
                </Tabs>
            </article>
        </>
    );
};

export default OrderItem;
