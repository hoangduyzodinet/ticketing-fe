import React from "react";
import { Layout } from "antd";
import { LayoutProps } from "../../interfaces";
import Header from "../modules/header/header";
import Footer from "../modules/footer/footer";

export function MainLayout({ children }: LayoutProps) {
    return (
        <Layout>
            <Header />
            <Layout>{children}</Layout>
            <Footer />
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
        </Layout>
    );
}
