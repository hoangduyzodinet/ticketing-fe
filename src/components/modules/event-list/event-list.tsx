import React, { useEffect, useState } from "react";
import { Image, Row, Divider, Button, Typography } from "antd";

import { useRouter } from "next/router";
import { IEPayload } from "../../../interfaces";
import { EventApi } from "../../../services";
import EvenItem from "../event-item/event-item";
import s from "./event-list.module.scss";

interface IEventListProps {
    id: string;
    name: string;
}

const eventApi = new EventApi();

const EventList: React.FC<IEventListProps> = (props) => {
    const { Title } = Typography;
    const router = useRouter();

    const [listEvent, setListEvents] = useState<IEPayload[]>([]);
    const [optionPaging, setOptionPaging] = useState({
        page: 1,
        limit: 6,
    });

    useEffect(() => {
        const getEventsByCategory = async (
            page: number,
            pageSize: number,
            id: string,
        ) => {
            const result = await eventApi.getEventPagingByCategory(
                page,
                pageSize,
                id,
            );
            if (result) setListEvents(result.events);
        };

        getEventsByCategory(optionPaging.page, optionPaging.limit, props.id);
    }, [optionPaging.limit, optionPaging.page, props.id]);

    const onSeeMore = () => {
        router.push(`events/categories/${props.id}`);
    };

    return (
        <div className={s.eventListWrapper}>
            <div className="w-full flex items-end justify-center">
                <Image
                    src="https://ticketbox.vn/_next/static/images/home-leftmovie-desktop.svg"
                    preview={false}
                />
                <Title level={1} className={s.title} italic={true}>
                    {props.name}
                </Title>
                <Image
                    src="https://ticketbox.vn/_next/static/images/home-rightmovie-desktop.svg"
                    preview={false}
                />
            </div>
            <Divider className={s.divider} />

            <Row gutter={[24, 24]} className="mt-12">
                {listEvent.length > 0 &&
                    listEvent.map((event) => (
                        <EvenItem item={event} key={event.id} isHome={true} />
                    ))}
            </Row>

            <Divider className="mt-12">
                <Button
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={onSeeMore}
                    className={s.seemoreBtn}
                >
                    See More
                </Button>
            </Divider>
        </div>
    );
};

export default EventList;
