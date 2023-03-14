import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme/theme";
import createEmotionCache from "../src/createEmotionCache";
import FullLayout from "../src/layouts/FullLayout";
import "../styles/style.css";
import { useRouter } from "next/router";
import { store, persistor } from "../redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const router = useRouter();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  if (
    router.pathname == "/student/studentSignup" ||
    router.pathname == "/login" || router.pathname=='/_error'
  ){
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CacheProvider value={emotionCache}>
            <Head>
              <title>Makaut</title>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {/* <FullLayout> */}
              <Component {...pageProps} />
              {/* </FullLayout> */}
            </ThemeProvider>
          </CacheProvider>
        </PersistGate>
      </Provider>
    );
  }else
   {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CacheProvider value={emotionCache}>
            <Head>
              <title>Makaut</title>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <FullLayout>
              <Component {...pageProps} />
              </FullLayout>
            </ThemeProvider>
          </CacheProvider>
        </PersistGate>
      </Provider>
    );
  } 
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
