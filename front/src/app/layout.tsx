import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../../context/AuthContext";
import Footer from "../components/layout/Footer";
import { Providers } from "./providers";

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
        <AuthProvider>
          <Providers>
            <div className="flex-grow"> {children}</div>
          </Providers>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
