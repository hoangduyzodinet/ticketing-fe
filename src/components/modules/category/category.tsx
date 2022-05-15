import { Layout, Menu, LayoutProps } from "antd";
import {
    BarsOutlined,
    FolderOpenOutlined,
    HomeOutlined,
    SplitCellsOutlined,
    UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ICategory } from "../../../interfaces/components";
import { EventApi } from "../../../services";
import s from "./category.module.scss";

const Category: React.FC = ({ children }: LayoutProps) => {
    const { SubMenu } = Menu;
    const { Content, Sider } = Layout;
    const router = useRouter();

    const eventApi = new EventApi();

    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const getCategory = async () => {
            const result = await eventApi.getAllCategory();
            if (result) setCategories(result);
        };
        getCategory();
    }, []);

    const handleClickMenuItem = (e: any) => {
        router.push(`/category/${e.key}`);
    };

    return (
        <>
            <Sider width={300} className={s.categoryWrapper}>
                <Menu mode="inline" defaultOpenKeys={["sub1"]}>
                    <Menu.Item
                        key="0"
                        icon={<HomeOutlined />}
                        className={s.menuItem}
                    >
                        <Link href="/">Home</Link>
                    </Menu.Item>

                    <SubMenu
                        key="sub1"
                        icon={<BarsOutlined />}
                        title="Category Event"
                        className={s.menuItem}
                    >
                        {categories.map((category) => (
                            <Menu.Item
                                key={category.id}
                                icon={<SplitCellsOutlined />}
                                onClick={handleClickMenuItem}
                                className={s.menuItem}
                            >
                                {category.name}
                            </Menu.Item>
                        ))}
                    </SubMenu>
                    <Menu.Item
                        key="10"
                        icon={<UserOutlined />}
                        className={s.menuItem}
                    >
                        <Link href="/order">My order</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="11"
                        icon={<FolderOpenOutlined />}
                        className={s.menuItem}
                    >
                        <Link href="/events/my-event"> My event</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="p-6">
                <Content>{children}</Content>
            </Layout>
        </>
    );
};

export default Category;
