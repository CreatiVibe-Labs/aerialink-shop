import AppProvider from "@/components/common/app-provider";
import Footer from "@/components/layouts/footer";
import SecondaryNavbar from "@/components/layouts/secondary-nav/secondary-navbar";
import NewsLetterBanner from "@/components/news-letter-banner/news-letter-banner";
import type { Metadata } from "next";
import { Albert_Sans, Poppins } from "next/font/google";
import Navbar from "../components/layouts/navbar";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import ConditionalSecondaryNav from "@/components/layouts/conditional-secondary-nav";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aerialink",
  description: "Aerialink description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${poppins.variable} ${albertSans.className} antialiased`}
      >
        <AppProvider>
          <Navbar />
          {/* <SecondaryNavbar /> */}
          <ConditionalSecondaryNav />
          <div className="app max-w-7xl w-full mx-auto xl:px-4 lg:px-4 md:px-4 px-4">
            {children}
          </div>
          {/* <ToastContainer /> */}

          <NewsLetterBanner />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
