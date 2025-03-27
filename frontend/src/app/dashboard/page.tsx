"use client";

import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>ログインユーザーのみが見れるページ</h1>
      <p>ログインユーザーのID, {user?.uid}</p>
      <p>ログインユーザーのメールアドレス, {user?.email}</p>
    </div>
  );
}
