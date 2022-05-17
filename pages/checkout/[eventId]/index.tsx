import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout } from "../../../src/components";
import { NextPageWithLayout } from "../../../src/interfaces";
import CheckoutTemplate from "../../../src/templates/checkout/checkout-template";
import nextI18NextConfig from "@i18n";

const CheckoutPage: NextPageWithLayout = () => {
    return <CheckoutTemplate />;
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

CheckoutPage.Layout = MainLayout;

export default CheckoutPage;
