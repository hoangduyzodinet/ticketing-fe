import { NextPageWithLayout } from "../../src/interfaces";
import { MainLayout } from "../../src/components";
import OrderTemplate from "../../src/templates/order/order.template";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "@i18n";

const OrderPage: NextPageWithLayout = () => {
    return <OrderTemplate />;
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

OrderPage.Layout = MainLayout;

export default OrderPage;
