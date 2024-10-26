import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <>
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center py-2">
          <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-300">
            <Link href="/">サ飯レビュー</Link>
          </h1>
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link
                  href="/register"
                  className="bg-blue-800 hover:bg-cyan-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-300"
                >
                  新規登録
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-cyan-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-300"
                >
                  ログイン
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
