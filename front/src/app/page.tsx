import Link from "next/link";
import Header from "@/components/layout/Header";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-[97vh] bg-gray-100 relative">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          <Link
            href="/sauna-facilities"
            className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300  lg:w-80"
          >
            <div className="absolute inset-0 bg-gradient-to-br  from-blue-400 to-blue-500 opacity-90"></div>
            <div className="relative p-6 flex flex-col items-center justify-center h-full">
              <Image
                src="/sauna.jpg"
                alt="サウナ施設"
                width={280}
                height={100}
                className="rounded-xl"
              />
              <span className="text-white text-2xl font-bold mb-2 flex items-center mt-5">
                サウナ施設一覧
                <FaExternalLinkAlt className="ml-2" />
              </span>
              <span className="text-teal-100 text-sm">#施設を探す</span>
              <span className="text-teal-100 text-sm">#施設を追加</span>
            </div>
          </Link>
          <Link
            href="/sauna-meals"
            className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300  lg:w-80"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-90"></div>
            <div className="relative p-6 flex flex-col items-center justify-center h-full">
              <Image
                src="/sauna-food.jpg"
                alt="サウナ飯"
                width={280}
                height={100}
                className="rounded-xl"
              />
              <span className="text-white text-2xl font-bold mb-2 flex items-center mt-5">
                サウナ飯一覧
                <FaExternalLinkAlt className="ml-2" />
              </span>
              <span className="text-orange-100 text-sm">#サウナ飯を見る</span>
              <span className="text-orange-100 text-sm">#レビューを投稿</span>
            </div>
          </Link>
          <Link
            href="/profile"
            className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300  lg:w-80"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-90"></div>
            <div className="relative p-6 flex flex-col items-center justify-center h-full">
              <Image src="/human.png" alt="人" width={180} height={80} />
              <span className="text-white text-2xl font-bold mb-2 flex items-center mt-5">
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
