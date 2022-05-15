import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { MainLayout } from "../../../src/components";
import { NextPageWithLayout } from "../../../src/interfaces";
import UserProfileTemplate from "../../../src/templates/user-profile/user-profile.template";
import nextI18NextConfig from "@i18n";

const UserProfilePage: NextPageWithLayout = () => {
    return (
        <article className="user-profile">
            <UserProfileTemplate />
        </article>
    );
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

UserProfilePage.Layout = MainLayout;

export default UserProfilePage;
