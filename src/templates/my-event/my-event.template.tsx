import { Divider, Empty, Pagination, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import EvenItem from "../../components/modules/event-item/event-item";
import { IEPayload } from "../../interfaces";
import { useAppSelector } from "../../redux/hooks";
import { selectorUser } from "../../redux/user/userSlice";
import { EventApi } from "../../services";
import s from "./my-event.module.scss";

const eventApi = new EventApi();

const MyEventTemplate: React.FC = () => {
    const [listEvent, setListEvent] = useState<IEPayload[]>([]);
    const user = useAppSelector(selectorUser);
    const [total, setTotal] = useState(0);
    const [optionPaging, setOptionPaging] = useState({
        page: 1,
        limit: 6,
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getEventPaging = async (
            page: number,
            pageSize: number,
            id: string,
        ) => {
            setIsLoading(true);
            const result = await eventApi.getEventPagingByUserId(
                page,
                pageSize,
                id,
            );
            if (result) {
                setListEvent(result.events);
                setTotal(result.total);
            }
            setIsLoading(false);
        };
        if (user.id) {
            getEventPaging(optionPaging.page, optionPaging.limit, user.id);
        }
    }, [optionPaging.limit, optionPaging.page, user.id]);

    const changePage = (page: number) => {
        setOptionPaging({
            ...optionPaging,
            page: page,
        });
    };

    if (isLoading) return <Skeleton className="mt-10" />;

    return (
        <article className={s.myEvent}>
            <Divider className={s.title}>My Event</Divider>
            {listEvent.length <= 0 && <Empty />}
            {listEvent.length > 0 && (
                <div className="mt-10">
                    <Row gutter={[24, 24]}>
                        {listEvent.map((event) => (
                            <EvenItem
                                item={event}
                                key={event.id}
                                isOwner={true}
                            />
                        ))}
                    </Row>
                </div>
            )}

            {listEvent.length > 0 && (
                <div className={s.pagination}>
                    <Pagination
                        defaultCurrent={1}
                        total={total}
                        current={optionPaging.page}
                        onChange={changePage}
                        pageSize={optionPaging.limit}
                    />
                </div>
            )}
        </article>
    );
};

export default MyEventTemplate;
