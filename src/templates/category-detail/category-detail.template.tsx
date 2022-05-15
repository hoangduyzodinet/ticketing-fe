import { Empty, Pagination, Row } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EvenItem from "../../components/modules/event-item/event-item";
import { IEPayload } from "../../interfaces";
import { EventApi } from "../../services";
import s from "./category-detail.module.scss";

const eventApi = new EventApi();

const CategoryDetailTemplate: React.FC = () => {
    const router = useRouter();
    const categoryId = router.query.categoryId
        ? router.query.categoryId.toString()
        : "";
    const [optionPaging, setOptionPaging] = useState({
        page: 1,
        limit: 6,
    });
    const [listEvent, setListEvents] = useState<IEPayload[]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getEventsByCategory = async (id: string) => {
            const result = await eventApi.getEventPagingByCategory(
                optionPaging.page,
                optionPaging.limit,
                id,
            );

            if (result) {
                setListEvents(result.events);
                setTotal(result.total);
            }
        };
        getEventsByCategory(categoryId);
    }, [optionPaging.limit, optionPaging.page, categoryId]);

    const changePage = (page: number) => {
        setOptionPaging({
            ...optionPaging,
            page: page,
        });
    };

    return (
        <article className={s.categoryDetail}>
            {listEvent.length <= 0 && <Empty />}
            {listEvent.length > 0 && (
                <div>
                    <Row gutter={[24, 24]} className="mt-6">
                        {listEvent.map((event) => (
                            <EvenItem item={event} key={event.id} />
                        ))}
                    </Row>
                </div>
            )}

            {listEvent.length > 0 && (
                <div className={s.pagination}>
                    <Pagination
                        defaultCurrent={1}
                        total={50}
                        current={optionPaging.page}
                        onChange={changePage}
                        pageSize={optionPaging.limit}
                    />
                </div>
            )}
        </article>
    );
};

export default CategoryDetailTemplate;
