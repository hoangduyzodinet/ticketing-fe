import React from "react";
import {
    Avatar,
    Button,
    Col,
    Divider,
    Dropdown,
    Input,
    Layout,
    Menu,
    Popover,
    Row,
} from "antd";
import { useRouter } from "next/router";
import {
    CaretDownOutlined,
    EditOutlined,
    LoginOutlined,
    LogoutOutlined,
    ProfileOutlined,
    SearchOutlined,
    UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout, selectorUser } from "../../../redux/user/userSlice";
import s from "./header.module.scss";
import { useTranslation } from "next-i18next";

export default function Header() {
    const { t }: { t: any } = useTranslation("common");
    const { Header } = Layout;
    const { locale } = useRouter();
    const router = useRouter();
    const user = useAppSelector(selectorUser);
    const dispatch = useAppDispatch();
    const loginHandler = () => {
        router.push("/login");
    };

    const changeLang = (lang: string) => {
        router.push("#", "#", { locale: lang });
    };

    const registerHandler = () => {
        router.push("/signup");
    };

    const createEventHandler = () => {
        if (user.isLoggedIn) {
            router.push("/events/create");
        } else {
            router.push("/login");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        dispatch(logout());
        router.push("/");
    };

    const contentPophoverUser = (
        <>
            {user.role === "admin" && (
                <Row>
                    <Col
                        className="cursor-pointer text-base flex items-center"
                        onClick={() => {
                            router.push("/admin");
                        }}
                    >
                        <ProfileOutlined />
                        <span className="ml-4">{t("header.manager_user")}</span>
                    </Col>
                </Row>
            )}
            <Row className="mt-4">
                <Col
                    className="cursor-pointer text-base flex items-center"
                    onClick={() => {
                        router.push("/user/profile");
                    }}
                >
                    <EditOutlined />
                    <span className="ml-4">{t("header.profile")}</span>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col
                    onClick={handleLogout}
                    className="cursor-pointer text-base flex items-center"
                >
                    <LogoutOutlined />
                    <span className="ml-4">{t("header.logout")}</span>
                </Col>
            </Row>
        </>
    );

    const ItemMenu = () => {
        return user.isLoggedIn ? (
            <>
                <Popover
                    placement="bottomLeft"
                    content={contentPophoverUser}
                    trigger="hover"
                    key="4"
                >
                    <div className="flex items-center justify-between">
                        <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
                        <span className={`${s.userName} ml-2`}>
                            {user.name}
                        </span>
                    </div>
                </Popover>
            </>
        ) : (
            <Button
                type="text"
                onClick={loginHandler}
                className={`${s.headerLogin} flex items-center`}
            >
                <LoginOutlined />
                <span className="ml-2">{t("header.login")}</span>
            </Button>
        );
    };

    const OptionsLanguage = (
        <Menu>
            <Menu.Item
                className="body-14-semi-bold"
                key="1"
                onClick={() => changeLang("vi")}
            >
                <a href="#">{t("language.vi")}</a>
            </Menu.Item>
            <Menu.Item
                className="body-14-semi-bold"
                key="2"
                onClick={() => changeLang("en")}
            >
                <a href="#">{t("language.en")}</a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Header
            className={`${s.headerWrapper} flex items-center justify-between`}
        >
            <div className="flex items-center">
                <Link href="/" passHref>
                    <img src="/images/logo.png" className={s.headerLogo} />
                </Link>
                <Input
                    size="large"
                    placeholder={t("header.search_placeholder")}
                    prefix={<SearchOutlined />}
                    className={`${s.headerSearch} ml-4`}
                />
            </div>

            <div className="flex flex-row items-center">
                <Button type="text" size="large" onClick={createEventHandler}>
                    {t("header.create_event")}
                </Button>
                <Divider type="vertical" />
                <ItemMenu />
                <Divider type="vertical" />
                <Dropdown
                    overlay={OptionsLanguage}
                    placement="bottomRight"
                    trigger={["click"]}
                    arrow
                >
                    <Button
                        type="text"
                        className={` ${s.headerLanguage} flex flex-row items-center ml-2 font-bold`}
                    >
                        <span>{t(`language.${locale}`)}</span>
                        <CaretDownOutlined className="ml-1" />
                    </Button>
                </Dropdown>
            </div>
        </Header>
    );
}
