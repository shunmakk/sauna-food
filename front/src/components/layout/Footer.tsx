import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200">
      <div className="p-10 text-center text-xs">
        <ul className="flex flex-wrap items-center justify-center gap-5">
          <li className="hover:text-gray-400">
            <Link href="/">ホーム</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link href="/sauna-facilities">サウナ施設一覧</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link href="/sauna-meals">サウナ飯一覧</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link href="/sauna-facilities/create">サウナ施設追加</Link>
          </li>
          <li className="hover:text-gray-400">
            <Link href="/profile">プロフィール</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
