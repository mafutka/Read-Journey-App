
import type {Metadata} from "next";
import AuthInitializer from "../app/components/AuthInitializer"
import css from "./layout.module.css"
import "./globals.css";


export const metadata: Metadata = {
  title: "Reading Books App",
  description: "Service to find, save, read books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className={css.app}>
        <AuthInitializer />
          {children}
      </body>
    </html>
  );
}
