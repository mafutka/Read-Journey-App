import type { Metadata } from "next";
import "./globals.css";
import css from "./layout.module.css"

export const metadata: Metadata = {
  title: "Reading Books App",
  description: "Service for find, save, read books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={css.container}>
          {children}
        </div>
      </body>
    </html>
  );
}
