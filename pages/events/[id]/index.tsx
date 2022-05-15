import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout } from "../../../src/components";
import { NextPageWithLayout } from "../../../src/interfaces";
import EventDetailTemplate from "../../../src/templates/event-detail/event-detail.template";
import nextI18NextConfig from "@i18n";

const EventDetailPage: NextPageWithLayout = () => {
    return <EventDetailTemplate />;
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

EventDetailPage.Layout = MainLayout;

export default EventDetailPage;
