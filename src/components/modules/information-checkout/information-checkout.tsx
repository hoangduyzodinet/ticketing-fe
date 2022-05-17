import {
    Avatar,
    Button,
    Checkbox,
    Col,
    Divider,
    InputNumber,
    message,
    Row,
    Space,
    Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IBankPayload, IEventPayload, IUserProfile } from "../../../interfaces";
import s from "./information-checkout.module.scss";
import { OrderApi, UserApi } from "../../../services";
import { formatPrice } from "../../../utils/format-price";

const orderApi = new OrderApi();
const userApi = new UserApi();

interface IEventItemProps {
    event: IEventPayload;
    user: IUserProfile;
}

const InformationCheckout: React.FC<IEventItemProps> = (props) => {
    const { Title } = Typography;
    const router = useRouter();

    const [bankSellerAccount, setBankSellerAccount] = useState<IBankPayload>(
        {} as IBankPayload,
    );
    const [isDisableBtnSubmit, setIsDisableBtnSubmit] = useState(false);
    const [isAgree, setIsAgree] = useState(false);

    useEffect(() => {
        const getBank = async (id: string) => {
            const result = await userApi.findBankByUserId(id);
            if (result) setBankSellerAccount(result);
        };

        if (props.event.userId) getBank(props.event.userId);
    }, [props.event.userId]);

    const {
        id,
        logoUrl,
        name,
        eventStartDate,
        eventEndDate,
        eventPlaceName,
        eventAddress,
        ticketPrice,
        minTicketOrder,
        maxTicketOrder,
        availableTickets,
    } = props.event;

    const [amount, setAmount] = useState(1);

    const handleChangeAmount = (value: number) => {
        setAmount(value);
    };

    const handleSubmit = async () => {
        setIsDisableBtnSubmit(true);
        if (amount <= availableTickets) {
            const result = await orderApi.create({
                eventId: id,
                userId: props.user.id,
                bankId: bankSellerAccount.id,
                amount: amount,
            });
            if (result) {
                message.success("Ticket booking successful");
                router.push("/order");
                setIsDisableBtnSubmit(false);
            } else {
                setIsDisableBtnSubmit(false);
                message.error("Ticket booking failed");
            }
        } else {
            setIsDisableBtnSubmit(false);
            message.error("TNumber of Ticket is not Enough");
        }
    };

    function onChange(e: any) {
        setIsAgree(e.target.checked);
    }

    return (
        <article className={s.informationCheckout}>
            <Row>
                <Col flex={1}>
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
                        icon={logoUrl ? <UserOutlined /> : ""}
                        src={logoUrl}
                    />
                </Col>

                <Col flex={7}>
                    <Title level={5}>{name}</Title>
                    <div className={`${s.description} tracking-wider`}>
                        <span>C13</span>
                        <Divider type="vertical" />
                        <span>2 hours 37 minutes</span>
                    </div>
                </Col>
            </Row>
            <Divider />
            <Row className="w-full text-sm">
                <Space size={4} direction="vertical" className="w-full">
                    <Title level={5}>{eventPlaceName}</Title>
                    <span>{eventAddress}</span>
                    <span>
                        {eventStartDate} - {eventEndDate}
                    </span>
                    <span>D17</span>
                    <div className="flex items-center justify-between">
                        <div>
                            <span>Amount: </span>
                            <InputNumber
                                min={minTicketOrder}
                                max={maxTicketOrder}
                                defaultValue={1}
                                value={amount}
                                onChange={(amount) =>
                                    handleChangeAmount(amount)
                                }
                            />
                        </div>
                        <span>{formatPrice(amount * +ticketPrice)}</span>
                    </div>
                </Space>
            </Row>
            <Divider />
            <Row className="w-full text-lg font-bold">
                <span className="w-full text-right">
                    {formatPrice(amount * +ticketPrice)}
                </span>
            </Row>
            <Row className="my-5">
                <Checkbox onChange={onChange}>
                    <span>I agree with </span>
                    <a href="">Terms and Condition and am purchasing tickets</a>
                    <span> for age appropriate audience</span>
                </Checkbox>
            </Row>
            <Row>
                <Button
                    type="default"
                    htmlType="submit"
                    size="large"
                    className={s.btnPrimary}
                    loading={isDisableBtnSubmit}
                    onClick={handleSubmit}
                    disabled={!isAgree}
                >
                    <span className="form__button-label">Pay</span>
                </Button>
            </Row>
        </article>
    );
};

export default InformationCheckout;
