import React, { useEffect, useState } from "react";
import { Empty, Pagination } from "antd";
import { Typography } from "antd";
import { StatusEnum } from "../../interfaces";
import { OrderApi } from "../../services";
import OrderItem from "../../components/modules/order-item/order-item";
import { useAppSelector } from "../../redux/hooks";
import { selectorUser } from "../../redux/user/userSlice";
import { useRouter } from "next/router";
import s from "./order.module.scss";

const orderApi = new OrderApi();

const orders = [
    {
        id: "1",
        userId: "1",
        amount: 10,
        tickets: ["kjnskdnfksdnfksdnf", "asdjfkasjdfnjhsabdfj"],
        event: {
            name: "event 1",
            logoUrl:
                "https://images.tkbcdn.com/2/420/600/poster/3663e689-d1a0-11ec-8daa-0242ac110003@webp",
            eventStartDate: "1/1/2020",
            eventPlaceName: "C18",
            eventAddress: "Ho Chi Minh",
            ticketPrice: 12000,
        },
        status: StatusEnum.Progress,
    },
    {
        id: "2",
        userId: "1",
        amount: 10,
        tickets: ["kjnskdnfksdnfksdnf", "asdjfkasjdfnjhsabdfj"],
        event: {
            name: "event 1",
            logoUrl:
                "https://images.tkbcdn.com/2/420/600/poster/3663e689-d1a0-11ec-8daa-0242ac110003@webp",
            eventStartDate: "1/1/2020",
            eventPlaceName: "C18",
            eventAddress: "Ho Chi Minh",
            ticketPrice: 12000,
        },
        status: StatusEnum.Progress,
    },
    {
        id: "3",
        userId: "1",
        amount: 20,
        tickets: ["kjnskdnfksdnfksdnf", "asdjfkasjdfnjhsabdfj"],
        event: {
            name: "event 1",
            logoUrl:
                "https://images.tkbcdn.com/2/420/600/poster/3663e689-d1a0-11ec-8daa-0242ac110003@webp",
            eventStartDate: "1/1/2020",
            eventPlaceName: "C18",
            eventAddress: "Ho Chi Minh",
            ticketPrice: 12000,
        },
        status: StatusEnum.Done,
    },
    {
        id: "4",
        userId: "1",
        amount: 10,
        tickets: ["kjnskdnfksdnfksdnf", "asdjfkasjdfnjhsabdfj"],
        event: {
            name: "event 1",
            logoUrl:
                "https://images.tkbcdn.com/2/420/600/poster/3663e689-d1a0-11ec-8daa-0242ac110003@webp",
            eventStartDate: "1/1/2020",
            eventPlaceName: "C18",
            eventAddress: "Ho Chi Minh",
            ticketPrice: 12000,
        },
        status: StatusEnum.Canceled,
    },
];

const OrderTemplate: React.FC = () => {
    const user = useAppSelector(selectorUser);
    const router = useRouter();

    if (!user.isLoggedIn) {
        router.push("/login");
    }

    const { Title } = Typography;
    // const [orders, setOrders] = useState<IOrderPayload[]>([]);
    const [optionPaging, setOptionPaging] = useState({
        page: 1,
        limit: 5,
    });
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getEventPaging = async (page: number, limit: number) => {
            const result = await orderApi.getAllOrder(page, limit);
            if (result) {
                // setOrders(result.orders);
                setTotal(result.total);
            }
        };
        getEventPaging(optionPaging.page, optionPaging.limit);
    }, [optionPaging.limit, optionPaging.page]);

    const changePage = (page: number) => {
        setOptionPaging({
            ...optionPaging,
            page: page,
        });
    };

    if (orders.length === 0) return <Empty className="mt-10" />;
    return (
        <article className={s.orderTemplate}>
            <Title level={3} className={s.title}>
                My order
            </Title>
            {orders.map((order) => (
                <OrderItem key={order.id} item={order} />
            ))}
            <div className={s.pagination}>
                <Pagination
                    defaultCurrent={1}
                    total={total}
                    current={optionPaging.page}
                    onChange={changePage}
                    pageSize={optionPaging.limit}
                />
            </div>
        </article>
    );
};

export default OrderTemplate;
