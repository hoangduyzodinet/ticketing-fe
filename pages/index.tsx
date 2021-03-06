import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { MainLayout } from "../src/components/layouts/main";
import { NextPageWithLayout } from "../src/interfaces";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "@i18n";
import { HomePageTemplate } from "../src/templates/home/home.template";

const Home: NextPageWithLayout = () => {
    return <HomePageTemplate />;
};

export const getServerSideProps: GetServerSideProps = async ({
    locale,
}: GetServerSidePropsContext) => {
    return {
        props: {
            ...(await serverSideTranslations(
                locale as string,
                ["common"],
                nextI18NextConfig,
            )),
        },
    };
};

Home.Layout = MainLayout;

export default Home;
