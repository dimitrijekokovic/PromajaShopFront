import React, { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { CartContextProvider } from "@/components/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { AnimatePresence, motion } from "framer-motion";
import { createGlobalStyle } from "styled-components";


const GlobalStyles = createGlobalStyle`
  body {
    background-color: #EFEFE8;
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

  return (
    <>
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
