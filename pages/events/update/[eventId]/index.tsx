import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { MainLayout } from "../../../../src/components";
import { NextPageWithLayout } from "../../../../src/interfaces";
import nextI18NextConfig from "@i18n";
import EventDetail from "../../../../src/components/modules/event-detail/event-detail";

const UpdateEventPage: NextPageWithLayout = () => {
    const router = useRouter();
    const eventId = router.query.eventId ? router.query.eventId.toString() : "";

    return <EventDetail id={eventId} />;
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

UpdateEventPage.Layout = MainLayout;

export default UpdateEventPage;
