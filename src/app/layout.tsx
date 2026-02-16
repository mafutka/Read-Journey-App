import type {Metadata} from "next";
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
      <body>
          {children}
      </body>
    </html>
  );
}
