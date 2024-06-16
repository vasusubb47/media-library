import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import { NavBar } from "./components/nav";
export const metadata = {
  title: "Media Library",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
            <NavBar></NavBar>
            {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
