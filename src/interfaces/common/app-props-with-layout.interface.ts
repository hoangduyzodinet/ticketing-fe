import { EmotionCache } from "@emotion/react";
import { AppProps } from "next/app";
import { NextPageWithLayout } from "./next-page-with-layout.interface";

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
    emotionCache?: EmotionCache;
};
