import { AuthProvider, CartProvider } from "@/contexts";
import Head from 'next/head'; // Import Head component
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/scss/global.scss";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </>
  );
}
