import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../../context/AuthContext";
import Footer from "../components/layout/Footer";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export const metadata: Metadata = {
  title: "サ飯レビュー",
  description:
    "このアプリケーションでは、ユーザーがサウナ飯について投稿、他のユーザーと共有が行えます",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
        <AppRouterCacheProvider>
          <AuthProvider>
            <div className="flex-grow"> {children}</div>
            <Footer />
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
