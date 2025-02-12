import type { Metadata } from "next";
import { poppins } from "~/utils/font";

export const metadata: Metadata = {
  title: "Shop - Halisi oil",
  description: "Halisi",
  keywords: "Halisi",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function ShopDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`${poppins.className} mx-auto h-[100%] min-h-screen w-[100%] max-w-[1400px] bg-bgGray`}
    >
      {children}
    </main>
  );
}
