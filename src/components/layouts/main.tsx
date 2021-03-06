import React from "react";
import { Layout } from "antd";
import { LayoutProps } from "../../interfaces";
import Header from "../modules/header/header";
import Footer from "../modules/footer/footer";
import Category from "../modules/category/category";

export function MainLayout({ children }: LayoutProps) {
    return (
        <Layout>
            <Header />
            <Layout>
                <Category>{children}</Category>
            </Layout>
            <Footer />
        </Layout>
    );
}
