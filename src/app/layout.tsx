// src/app/layout.tsx
import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "@/app/globals.css";
import "@/app/css/style.scss";

export const metadata: Metadata = {
  title: "title",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`antialiased`}>
        <div className="main-container grid min-h-[100lvh] grid-rows-[auto_1fr_auto]">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
