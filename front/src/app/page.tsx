import Link from "next/link";
import Header from "@/components/layout/Header";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex flex-col min-h-[97vh] bg-gray-100 relative">
      <Header />
      {/* <div
        className="absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
        style={{ top: "29%" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-400 opacity-80 rounded-lg shadow-xl"></div>
        <h2 className="text-3xl font-extrabold text-center text-white relative p-6 rounded-lg">
          サウナ飯レビューアプリへようこそ
        </h2>
        <ul>
          <li className="text-lg text-center text-white  mb-1 relative">
            #自分に合ったサウナ施設、飯を探してみよう
          </li>
          <li className="text-lg text-center text-white  mb-2 relative">
            #サウナ飯の投稿、レビューをしてみましょう
          </li>
        </ul>
      </div> */}

      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <Link
            href="/sauna-facilities"
            className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 opacity-90"></div>
            <div className="relative p-6 flex flex-col items-center justify-center h-full">
              <span className="text-white text-2xl font-bold mb-2 flex items-center">
                サウナ施設一覧
                <FaExternalLinkAlt className="ml-2" />
              </span>
              <span className="text-teal-100 text-sm">#施設を探す</span>
              <span className="text-teal-100 text-sm">#施設を追加</span>
            </div>
          </Link>
          <Link
            href="/sauna-meals"
            className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-90"></div>
            <div className="relative p-6 flex flex-col items-center justify-center h-full">
              <span className="text-white text-2xl font-bold mb-2 flex items-center">
                サウナ飯一覧
                <FaExternalLinkAlt className="ml-2" />
              </span>
              <span className="text-orange-100 text-sm">#サウナ飯を見る</span>
              <span className="text-orange-100 text-sm">#レビューを投稿</span>
            </div>
          </Link>
          <Link
            href="/profile"
            className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 opacity-90"></div>
            <div className="relative p-6 flex flex-col items-center justify-center h-full">
              <span className="text-white text-2xl font-bold mb-2 flex items-center">
                プロフィール
                <FaExternalLinkAlt className="ml-2" />
              </span>
              <span className="text-blue-100 text-sm">#基本情報の確認</span>
              <span className="text-blue-100 text-sm">
                #投稿したレビューの確認
              </span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
