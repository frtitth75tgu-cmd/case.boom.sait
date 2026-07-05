import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: config.siteName,
  description: "Steam cases platform MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
