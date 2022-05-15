import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout } from "../../src/components";
import { NextPageWithLayout } from "../../src/interfaces";
import nextI18NextConfig from "@i18n";
import ManageUserTemplate from "../../src/templates/manage-user/manage-user.template";

const AdminPage: NextPageWithLayout = () => {
    return <ManageUserTemplate />;
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

AdminPage.Layout = MainLayout;

export default AdminPage;
