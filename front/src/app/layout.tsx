import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../../context/AuthContext";
import Footer from "../../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });
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
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
