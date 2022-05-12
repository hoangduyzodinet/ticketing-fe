import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import NotFound from "../../src/components/basics/not-found/not-found";
import Signup from "../../src/components/modules/signup/signup";
import { useAppSelector } from "../../src/redux/hooks";
import { selectorUser } from "../../src/redux/user/userSlice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import nextI18NextConfig from "@i18n";
const SignupPage: NextPage = () => {
    const user = useAppSelector(selectorUser);

    return user.isLoggedIn ? <NotFound /> : <Signup />;
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

export default SignupPage;
