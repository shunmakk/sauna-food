import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-16 text-gray-800">
          サウナ飯レビューへようこそ
        </h1>
        <div className="flex flex-col sm:flex-row sm:justify-center gap-6 mt-16 sm:mt-32 w-full max-w-xl">
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
            href="/dashboard"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-lg text-lg sm:text-xl font-semibold text-center transition-colors duration-300"
          >
            ダッシュボード
          </Link>
        </div>
      </main>
    </>
  );
}
