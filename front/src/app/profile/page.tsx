"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">ユーザープロフィール</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">基本情報</h2>
        <p>
          <strong>名前:</strong> {user.name}
        </p>
        <p>
          <strong>メールアドレス:</strong> {user.email}
        </p>
        <p>
          <strong>登録日:</strong> {RegisterDate}
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">投稿したレビュー</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} className="mb-4 p-4 border rounded">
                <h3 className="text-xl font-semibold">
                  {review.saunaMeal.name}
                </h3>
                <p>
                  <strong>施設:</strong> {review.saunaMeal.facility.name}
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
