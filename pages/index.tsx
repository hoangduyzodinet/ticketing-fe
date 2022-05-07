import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import { MainLayout } from "../src/components/layouts/main";
import { NextPageWithLayout } from "../src/interfaces";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "@i18n";
import * as api from "./../src/services";

const Home: NextPageWithLayout = () => {
    // const [categories, setCategories] = useState<ICategory[]>([]);

    // useEffect(() => {
    //     const getCategory = async () => {
    //         const result = await api.eventApi.getAllCategory();
    //         setCategories(result);
    //     };

    //     getCategory();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return <>hello</>;
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
