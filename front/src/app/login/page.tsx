"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>メールアドレス</p>
        <input
          {...register("email")}
          type="email"
          placeholder="メールアドレス"
          required
        />
        <p>パスワード</p>
        <input
          {...register("password")}
          type="password"
          placeholder="パスワード"
          required
        />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
