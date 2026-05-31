import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "BloxValues - #1 Blox Fruits Trading Platform",
  description: "The ultimate hub for Blox Fruits trading. Discover real-time values, create trade ads, and connect with our trusted community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}