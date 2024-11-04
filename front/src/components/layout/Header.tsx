"use client";
import React from "react";
import Link from "next/link";
import LogoutButton from "../auth/LogoutButton";
import LoginButton from "../auth/LoginButton";
import RegisterButton from "../auth/RegisterButton";
import { useAuth } from "../../../context/AuthContext";

const Header: React.FC = () => {
  const { user, loading } = useAuth();

  return (
    <>
      <header className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center py-2 h-12">
          <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-300">
            <Link href="/">サ飯レビュー</Link>
          </h1>
          <nav>
            <ul className="flex gap-4">
              {loading ? ( //loadingがtrueの場合にローディング表示
                <></>
              ) : user ? (
                <li>
                  <LogoutButton className="bg-blue-500 hover:bg-cyan-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-300" />
                </li>
              ) : (
                <>
                  <li>
                    <RegisterButton className="bg-blue-800 hover:bg-cyan-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-300" />
                  </li>
                  <li>
                    <LoginButton className="bg-blue-600 hover:bg-cyan-600 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-300" />
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
