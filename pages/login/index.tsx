import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import NotFound from "../../src/components/basics/not-found/not-found";
import Login from "../../src/components/modules/login/login";
import { useAppSelector } from "../../src/redux/hooks";
import { selectorUser } from "../../src/redux/user/userSlice";
import nextI18NextConfig from "@i18n";

const LoginPage: NextPage = () => {
    const user = useAppSelector(selectorUser);

    return user.isLoggedIn ? <NotFound /> : <Login />;
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

export default LoginPage;
