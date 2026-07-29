import React, { useEffect } from "react";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { CartContextProvider } from "@/components/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
  body {
    background-color: #EFEFE8;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Trajanje animacija
      once: true, // Animacije se dešavaju samo jednom
    });
  }, []);

  const path = (router.asPath || "/").split("?")[0].split("#")[0];
  const canonicalPath = path === "/" ? "" : path;
  const canonicalUrl = `https://www.promajafishing.com${canonicalPath}`;

  return (
    <>
    <Head>
      <title>Promaja Shop | Ribolovačka oprema i varalice</title>
      <meta
        name="description"
        content="Promaja Shop - ribolovačka oprema, vobleri, varalice, štapovi i paketi za ribolov. Poručite online uz brzu dostavu u Srbiji."
      />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Promaja Shop" />
      <meta property="og:title" content="Promaja Shop | Ribolovačka oprema i varalice" />
      <meta
        property="og:description"
        content="Ribolovačka oprema, vobleri, varalice, štapovi i paketi za ribolov."
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://www.promajafishing.com/site-logo.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href="/favicon.png?v=2" type="image/png" />
      <link rel="shortcut icon" href="/favicon.png?v=2" type="image/png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Head>
    <GlobalStyles />
    <SessionProvider session={pageProps.session}>
      <CartContextProvider>
        <AnimatePresence mode="wait">
          <motion.div
             key={router.route}
             initial={{ opacity: 0, }}
             animate={{ opacity: 1, }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.3 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </CartContextProvider>
    </SessionProvider>
    </>
  );
}
