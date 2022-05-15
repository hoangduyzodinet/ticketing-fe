import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout } from "../../../src/components";
import { NextPageWithLayout } from "../../../src/interfaces";
import CategoryDetailTemplate from "../../../src/templates/category-detail/category-detail.template";
import nextI18NextConfig from "@i18n";

const ListEventPage: NextPageWithLayout = () => {
    return <CategoryDetailTemplate />;
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

ListEventPage.Layout = MainLayout;

export default ListEventPage;
