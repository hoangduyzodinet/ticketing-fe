import { FieldTimeOutlined, EnvironmentFilled } from "@ant-design/icons";
import { Col, Avatar, Card, Image, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { IEPayload } from "../../../interfaces";
import { isOwner } from "../../../redux/event/eventSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { formatDate } from "../../../utils/format-date";
import s from "./event-item.module.scss";

interface IEventItemProps {
    item: IEPayload;
    isHome?: boolean;
    isOwner?: boolean;
}

const EvenItem: React.FC<IEventItemProps> = (props) => {
    const { Text } = Typography;
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(isOwner({ isOwner: props.isOwner ? !!props.isOwner : false }));
    }, [props.isOwner]);

    const onSeeMore = () => {
        router.push(`/events/${props.item.id}`);
    };

    return (
        <Col
            sm={24}
            md={12}
            xl={8}
            key={props.item.id}
            onClick={onSeeMore}
            className={s.eventItemWrapper}
        >
            <Card
                className={`${s.eventItemCard} shadow-lg shadow-slate-200`}
                cover={
                    <Image
                        src={
                            props.item.bannerUrl
                                ? props.item.bannerUrl
                                : "/img/default-image.jpg"
                        }
                        preview={false}
                        className={s.eventItemImg}
                    />
                }
            >
                <div className="flex items-center justify-start">
                    <Avatar
                        size="large"
                        src={
                            props.item.logoUrl
                                ? props.item.logoUrl
                                : "/img/default-image.jpg"
                        }
                    />
                    <div className="flex flex-col ml-4">
                        <Text className={s.eventName}>{props.item.name}</Text>
                        <div className="flex items-center justify-start">
                            <FieldTimeOutlined />
                            <span className="ml-2">
                                {formatDate(props.item.eventStartDate)}
                            </span>
                        </div>
                        <div className="flex items-center justify-start">
                            <EnvironmentFilled />
                            <span className="ml-2">
                                {`${props.item.eventPlaceName} - ${props.item.eventAddress}`}
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default EvenItem;
