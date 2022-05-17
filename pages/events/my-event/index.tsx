import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout } from "../../../src/components";
import { NextPageWithLayout } from "../../../src/interfaces";
import nextI18NextConfig from "@i18n";
import MyEventTemplate from "../../../src/templates/my-event/my-event.template";

const MyEventPage: NextPageWithLayout = () => {
    return <MyEventTemplate />;
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

MyEventPage.Layout = MainLayout;

export default MyEventPage;
