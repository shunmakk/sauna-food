"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.error("ログインエラー", error);
      setError("ログインに失敗.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">
              メールアドレス
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="メールアドレス"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              パスワード
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              placeholder="パスワード"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              ログイン
            </button>
          </div>
          <div className="text-center">
            <Link href="/register" className="text-blue-500  mt-3">
              新規登録していない方はこちら
            </Link>
          </div>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
