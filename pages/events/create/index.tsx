import { NextPageWithLayout } from "../../../src/interfaces";
import { CreateEventTemplate } from "../../../src/templates/create-event/create-event.template";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "@i18n";
import { MainNonMenuLayout } from "../../../src/components/layouts/main-non-menu";

const CreatEventPage: NextPageWithLayout = () => {
    return <CreateEventTemplate />;
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

CreatEventPage.Layout = MainNonMenuLayout;

export default CreatEventPage;
