import { Col, Layout, message, Row, Skeleton } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InformationCheckout from "../../components/modules/information-checkout/information-checkout";
import InformationBuyer from "../../components/modules/information-buyer/information-buyer";
import { IEventPayload } from "../../interfaces";
import { useAppSelector } from "../../redux/hooks";
import { selectorUser } from "../../redux/user/userSlice";
import { EventApi } from "../../services";

const eventApi = new EventApi();

const CheckoutTemplate: React.FC = () => {
    const { Content } = Layout;

    const router = useRouter();
    const user = useAppSelector(selectorUser);
    const [event, setEvent] = useState<IEventPayload>({} as IEventPayload);
    const [isLoading, setIsLoading] = useState(false);

    const eventId = router.query.eventId ? router.query.eventId.toString() : "";
    useEffect(() => {
        const getEvent = async (id: string) => {
            try {
                setIsLoading(true);
                const result = await eventApi.getEventById(id);
                if (result) {
                    setEvent(result);
                }
                setIsLoading(false);
            } catch (error: any) {
                message.error(error.message);
            }
        };

        if (eventId) {
            getEvent(eventId);
        }
    }, [eventId]);

    if (isLoading) return <Skeleton className="mt-10" />;

    return (
        <Content className="py-24">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="center">
                <Col span={8}>
                    <InformationBuyer item={user} />
                </Col>
                <Col span={8}>
                    <InformationCheckout event={event} user={user} />
                </Col>
            </Row>
        </Content>
    );
};

export default CheckoutTemplate;
