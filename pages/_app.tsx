import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "@i18n";
import "tailwindcss/tailwind.css";
import "antd/dist/antd.css";
import "@styles/global.scss";
import { store } from "../src/redux/store";
import { AppPropsWithLayout } from "../src/interfaces";
import { EmptyLayout } from "../src/components";
import AppContent from "../src/components/app-content";

function WebApp({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? EmptyLayout;

    const [showChild, setShowChild] = React.useState(false);

    // Wait until after client-side hydration to show
    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        // You can show some kind of placeholder UI here
        return null;
    }

    return (
        <Provider store={store}>
            <AppContent>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AppContent>
        </Provider>
    );
}
export default appWithTranslation(WebApp, nextI18NextConfig);
