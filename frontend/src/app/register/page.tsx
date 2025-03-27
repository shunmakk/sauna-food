"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    try {
      // Firebase Authでのユーザー作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // FirebaseからIDトークンを取得
      const idToken = await userCredential.user.getIdToken();

      // バックエンドにユーザー情報とIDトークンを送信してユーザーを作成
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: data.name,
          email: data.email,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      //profileに変移
      router.push("/profile");
    } catch (error) {
      if (error instanceof Error) {
        setError(`登録エラー: ${error.message}`);
      } else {
        setError("登録エラー: 予期せぬエラーが発生しました");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">新規登録</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">
              ニックネーム
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="ニックネームを6文字以内で"
              required
              maxLength={6}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              メールアドレス
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              name="email"
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
              name="password"
              placeholder="パスワードを入力してください"
              required
              minLength={6}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              新規登録する
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link href="/login" className="text-blue-500">
            既にアカウントをお持ちの方はこちら
          </Link>
        </div>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}
