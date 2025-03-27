"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface Review {
  id: string;
  overallRating: number;
  tasteRating: number;
  valueRating: number;
  comment: string;
  createdAt: string;
  saunaMeal: {
    id: string;
    name: string;
    facility: {
      id: string;
      name: string;
    };
  };
}

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: authUser, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) {
      // 認証状態の読み込み中は何もしない
      return;
    }
    if (!authUser) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = await authUser.getIdToken();
        const [userResponse, reviewsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/users/me/reviews", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userResponse.data);
        setReviews(reviewsResponse.data);
      } catch (err) {
        console.error("データ取得エラー:", err);
        setError("プロフィール情報の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authUser, authLoading, router]);

  if (authLoading || loading)
    return <div className="text-center">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>ユーザー情報が見つかりません</div>;
  const RegisterDate = new Date(user.createdAt).toLocaleDateString();

  return (
    <div className="flex flex-col min-h-[97vh] bg-gray-100 relative">
      <Header />
      <div className="mb-8 border-2  border-gray-400  p-3 rounded-lg w-5/6 md:w-1/2 lg:w-1/4 mx-auto mt-10 md:mt-20 relative">
        <h2 className="text-sm font-semibold  absolute -top-3 -left-1 text-slate-50 bg-slate-400 rounded p-1 px-2">
          基本情報
        </h2>
        <p className="mt-3">
          <strong>名前:</strong> {user.name}
        </p>
        <p>
          <strong>メールアドレス:</strong> {user.email}
        </p>
        <p>
          <strong>登録日:</strong> {RegisterDate}
        </p>
      </div>

      <div className="mx-auto w-2/3">
        <h2 className="text-2xl font-semibold mb-2">
          あなたが投稿したレビュー
        </h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} className="mb-4 p-4 border rounded">
                <Link
                  href={`/sauna-meals/${review.saunaMeal.id}`}
                  className="text-blue-500 hover:underline"
                >
                  <h3 className="text-xl font-semibold">
                    {review.saunaMeal.name}
                  </h3>
                </Link>
                <p>
                  <strong>施設:</strong>
                  <Link
                    href={`/sauna-facilities/${review.saunaMeal.facility.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {review.saunaMeal.facility.name}
                  </Link>
                </p>
                <p>
                  <strong>総合評価:</strong> {review.overallRating}/5
                </p>
                <p>
                  <strong>味:</strong> {review.tasteRating}/5
                </p>
                <p>
                  <strong>価格:</strong> {review.valueRating}/5
                </p>
                <p>
                  <strong>コメント:</strong> {review.comment}
                </p>
                <p>
                  <strong>投稿日:</strong>{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>まだレビューを投稿していません。</p>
        )}
      </div>
    </div>
  );
}
