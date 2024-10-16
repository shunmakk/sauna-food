"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "next/navigation";
import axios from "axios";

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
    <div>
      <h1>登録</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>ニックネーム</p>
        <input
          {...register("name")}
          type="text"
          name="name"
          autoComplete="name"
          placeholder="ニックネームを6文字以内で"
          required
          maxLength={6}
        />
        <p>メールアドレス</p>
        <input
          {...register("email")}
          type="email"
          name="email"
          placeholder="メールアドレス"
          required
        />
        <p>パスワード</p>
        <input
          {...register("password")}
          type="password"
          name="password"
          placeholder="パスワードを入力してください"
          required
          minLength={6}
        />
        <div>
          <button type="submit">新規登録する</button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
