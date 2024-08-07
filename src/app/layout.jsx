import { Inter } from "next/font/google";
import { UserProvider } from '@/context/UserProvider';
import RouteHandler from "./routehandler";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mykare Health",
  description: "Mykare Health India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <RouteHandler>{children}</RouteHandler>
        </UserProvider>
      </body>
    </html>
  );
}