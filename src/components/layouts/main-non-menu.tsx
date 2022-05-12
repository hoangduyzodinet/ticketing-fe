import React from "react";
import { Layout } from "antd";
import { LayoutProps } from "../../interfaces";
import Header from "../modules/header/header";
import Footer from "../modules/footer/footer";

export function MainNonMenuLayout({ children }: LayoutProps) {
    return (
        <Layout>
            <Header />
            <Layout>{children}</Layout>
            <Footer />
        </Layout>
    );
}
