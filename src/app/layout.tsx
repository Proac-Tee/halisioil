import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { AuthProvider } from "./auth/AuthProvider";
import { poppins } from "~/utils/font";
import { Toaster } from "react-hot-toast";
import { ImageProvider } from "~/context/ImageFormContext";
import Modal from "~/utils/Modal";
import { HeaderProvider } from "~/context/HeaderContext";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { CartProvider } from "~/context/CartContext";
import MiniCart from "./_components/MiniCart";
import { WishListProvider } from "~/context/WishListContext";

export const metadata: Metadata = {
  title: "Halisi oil - Home",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthProvider>
      <HeaderProvider>
        <CartProvider>
          <WishListProvider>
            <ImageProvider>
              <html lang="en" className={`${poppins.className}`}>
                <body>
                  <TRPCReactProvider>
                    <header className="sticky top-0 z-50 bg-[#333333]">
                      <Header />
                    </header>
                    <Modal />
                    <MiniCart />
                    <Toaster position="top-right" />
                    {children}
                    <footer className="border-t-[1px] border-t-[#cacaca] bg-bgGray">
                      <Footer />
                    </footer>
                  </TRPCReactProvider>
                </body>
              </html>
            </ImageProvider>
          </WishListProvider>
        </CartProvider>
      </HeaderProvider>
    </AuthProvider>
  );
}
