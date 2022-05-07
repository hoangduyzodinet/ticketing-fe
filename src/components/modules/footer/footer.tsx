import React from "react";
import {
    Input,
    Layout,
    Row,
    Col,
    Divider,
    Typography,
    Button,
    Image,
} from "antd";
import {
    AndroidOutlined,
    AppleOutlined,
    BehanceOutlined,
    DesktopOutlined,
    EnvironmentFilled,
    FacebookOutlined,
    InstagramOutlined,
    MailFilled,
    MobileOutlined,
    PhoneFilled,
    SendOutlined,
    TwitterOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import s from "./footer.module.scss";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function Footer() {
    const { t }: { t: any } = useTranslation("common");
    const router = useRouter();
    const { Footer } = Layout;
    const { Title, Text } = Typography;

    const changeLang = (lang: string) => {
        router.push("#", "#", { locale: lang });
    };

    return (
        <Footer className={s.footerWrapper}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col md={24} lg={8} xl={6}>
                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("footer.hotline")}
                        </Title>
                        <Text className={s.footerDescription}>
                            <PhoneFilled />
                            {t("footer.time_work")}
                        </Text>
                        <Text strong className={s.footerHotline}>
                            {t("footer.hotline_number")}
                        </Text>
                    </div>

                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("footer.support_mail")}
                        </Title>
                        <Text className={s.footerDescription}>
                            <MailFilled />
                            {t("footer.mail")}
                        </Text>
                    </div>
                </Col>
                <Col md={24} lg={8} xl={6}>
                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("footer.help")}
                        </Title>
                        <Text className={s.footerDescription}>
                            {t("footer.help_sub")}
                        </Text>
                    </div>

                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("footer.customer_care")}
                        </Title>
                        <Text className={s.footerDescription}>
                            <EnvironmentFilled />
                            {t("footer.address")}
                        </Text>
                    </div>
                </Col>
                <Col md={24} lg={8} xl={6}>
                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("footer.booking_instruction")}
                        </Title>
                        <Text className={s.footerDescription}>
                            {t("footer.booking_instruction_note")}
                        </Text>
                    </div>

                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("footer.our_company")}
                        </Title>
                        <Text className={s.footerDescription}>
                            {t("footer.about_us")}
                        </Text>
                        <Text className={s.footerDescription}>
                            {t("footer.landscape")}
                        </Text>
                        <Text className={s.footerDescription}>
                            {t("footer.hiring")}
                        </Text>
                        <Text className={s.footerDescription}>
                            {t("footer.ecom")}
                        </Text>
                        <Text className={s.footerDescription}>
                            {t("footer.policy")}
                        </Text>
                    </div>
                </Col>
                <Col md={24} lg={8} xl={6}>
                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("footer.faq")}
                        </Title>
                        <Text className={s.footerDescription}>
                            {t("footer.faq_sub")}
                        </Text>
                    </div>

                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("footer.subscribe")}
                        </Title>
                        <Input
                            className={s.footerEmail}
                            placeholder={t("footer.your_mail")}
                            prefix={<MailFilled />}
                            suffix={<SendOutlined />}
                        />
                    </div>
                </Col>
            </Row>
            <Divider />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col md={24} lg={8} xl={6}>
                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("footer.app")}
                        </Title>
                        <div className="flex items-center">
                            <Button
                                className={s.footerPlatform}
                                icon={<AppleOutlined />}
                            >
                                <span className="text-left">
                                    <Text strong>{t("footer.available")}</Text>
                                    <br />
                                    <Text>{t("footer.appstore")}</Text>
                                </span>
                            </Button>
                            <Button
                                className={s.footerPlatform}
                                icon={<AndroidOutlined />}
                            >
                                <span className="text-left">
                                    <Text strong>
                                        {t("footer.available_app")}
                                    </Text>
                                    <br />
                                    <Text>{t("footer.google_play")}</Text>
                                </span>
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col md={24} lg={8} xl={6}>
                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("footer.app_checkin")}
                        </Title>
                        <div className="flex items-center">
                            <Button
                                className={s.footerPlatform}
                                icon={<DesktopOutlined />}
                            >
                                <span className="text-left">
                                    <Text strong>{t("footer.desktop")}</Text>
                                    <br />
                                    <Text>{t("footer.multi_platform")}</Text>
                                </span>
                            </Button>
                            <Button
                                className={s.footerPlatform}
                                icon={<MobileOutlined />}
                            >
                                <span className="text-left">
                                    <Text strong>{t("footer.mobile")}</Text>
                                    <br />
                                    <Text>{t("footer.mobile_sub")}</Text>
                                </span>
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col md={24} lg={8} xl={6}>
                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("footer.follow_us")}
                        </Title>
                        <div className="flex items-center">
                            <div className={s.footerSocial}>
                                <FacebookOutlined />
                            </div>
                            <div className={s.footerSocial}>
                                <YoutubeOutlined />
                            </div>
                            <div className={s.footerSocial}>
                                <InstagramOutlined />
                            </div>
                            <div className={s.footerSocial}>
                                <TwitterOutlined />
                            </div>
                            <div className={s.footerSocial}>
                                <BehanceOutlined />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={24} lg={8} xl={6}>
                    <div>
                        <Title level={3} className={s.footerTitle}>
                            {t("language.title")}
                        </Title>
                        <div className="flex items-center">
                            <Image
                                className={s.footerLanguage}
                                preview={false}
                                src="https://static.tkbcdn.com/site/global/content-v2/img/lang-vi.svg"
                                alt="vi"
                                onClick={() => changeLang("vi")}
                            />
                            <Image
                                className={s.footerLanguage}
                                preview={false}
                                src="https://static.tkbcdn.com/site/global/content-v2/img/lang-en.svg"
                                alt="en"
                                onClick={() => changeLang("en")}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </Footer>
    );
}
