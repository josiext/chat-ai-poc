import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./Sidebar";
import { ChatAI } from "./ChatAI";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DOCU.AI",
  description: "Lemontech DMS powered by a powerfull AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen relative">
          <Sidebar />
          {children}
          <ChatAI />
        </div>
      </body>
    </html>
  );
}
