import type { AppProps } from "next/app";
import { BackToTop, Header, Footer } from "@components";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <BackToTop />
      <Footer />
    </>
  );
}

export default MyApp;
