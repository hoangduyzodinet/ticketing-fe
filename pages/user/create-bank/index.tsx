import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateBank from "../../../src/components/modules/create-bank/create-bank";
import nextI18NextConfig from "@i18n";

const CreateBankPage: NextPage = () => {
    return <CreateBank />;
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

export default CreateBankPage;
