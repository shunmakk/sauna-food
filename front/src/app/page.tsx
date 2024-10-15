import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-gray-100">
        <h1 className="text-2xl  mt-6  md:text-4xl font-bold text-center mb:mb-16 text-gray-800">
          サ飯レビューへようこそ
        </h1>
        <div className="flex flex-col sm:flex-row sm:justify-center gap-6 mt-16 sm:mt-32 w-full max-w-7xl">
          <Link
            href="/register"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-4 rounded-lg text-lg sm:text-xl font-semibold text-center transition-colors duration-300"
          >
            新規登録
          </Link>
          <Link
            href="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-lg text-lg sm:text-xl font-semibold text-center transition-colors duration-300"
          >
            ログイン
          </Link>
          <Link
            href="/sauna-facilities"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-lg text-lg sm:text-xl font-semibold text-center transition-colors duration-300"
          >
            サウナ施設一覧
          </Link>
          <Link
            href="/sauna-meals"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg text-lg sm:text-xl font-semibold text-center transition-colors duration-300"
          >
            サウナ飯一覧
          </Link>
          <Link
            href="/profile"
            className="bg-rose-500 hover:bg-rose-500 text-white px-6 py-4 rounded-lg text-lg sm:text-xl font-semibold text-center transition-colors duration-300"
          >
            プロフィール
          </Link>
        </div>
      </main>
    </>
  );
}
