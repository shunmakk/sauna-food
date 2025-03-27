"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import ReviewForm from "../../../components/reviews/ReviewForm";
import Image from "next/image";
import { Rating } from "@mui/material";
import Link from "next/link";

interface SaunaMeal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  facility: {
    id: string;
    name: string;
  };
  reviews: Review[];
}

interface Review {
  id: string;
  overallRating: number;
  tasteRating: number;
  valueRating: number;
  comment: string;
  user: {
    id: string;
    name: string;
  };
}

export default function SaunaMealDetail({
  params,
}: {
  params: { id: string };
}) {
  const [saunaMeal, setSaunaMeal] = useState<SaunaMeal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMReviewForm, setShowReviewForm] = useState(false);

  const fetchSaunaMeal = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/sauna-meals/${params.id}`
      );
      setSaunaMeal(res.data);
    } catch (err) {
      setError("サウナ飯の取得に失敗しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchSaunaMeal();
  }, [fetchSaunaMeal]);

  const handleReviewAdded = () => {
    fetchSaunaMeal(); // レビューが追加されたら、サウナ飯の情報を再取得
  };

  const reviewList = useMemo(
    () =>
      saunaMeal?.reviews && saunaMeal.reviews.length > 0 ? (
        <ul>
          {saunaMeal?.reviews?.map((review) => (
            <li key={review.id} className="mb-4 p-4 border rounded">
              <p className="flex items-center gap-4">
                <strong className="text-lg">
                  {review.user.name}さんのレビュー
                </strong>
                <Rating
                  name="総合評価"
                  value={review.overallRating}
                  readOnly
                  size="large"
                />
              </p>
              <p className="flex items-center gap-4">
                <span>味:</span>
                <Rating
                  name="味の評価"
                  value={review.tasteRating}
                  readOnly
                  size="small"
                />
              </p>
              <p className="flex items-center">
                <span>価格:</span>
                <Rating
                  name="価格の評価"
                  value={review.valueRating}
                  readOnly
                  size="small"
                />
              </p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>まだレビューがありません。</p>
      ),
    [saunaMeal?.reviews]
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!saunaMeal) return <div>サウナ飯が見つかりません</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{saunaMeal.name}</h1>
      {saunaMeal.imageUrl && (
        <div className="relative w-full md:w-1/2 aspect-video mb-4">
          <Image
            src={saunaMeal.imageUrl}
            alt={saunaMeal.name}
            fill
            sizes="(max-width: 768px) 60vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-lg cursor-pointer"
          />
        </div>
      )}
      <p className="mb-2">
        <strong>価格:</strong> {saunaMeal.price}円
      </p>
      <p className="mb-2">
        <strong>説明:</strong> {saunaMeal.description}
      </p>
      <p className="mb-4">
        <strong>施設:</strong>
        <Link
          href={`/sauna-facilities/${saunaMeal.facility.id}`}
          className="text-blue-500 hover:underline"
        >
          {saunaMeal.facility.name}
        </Link>
      </p>
      <button
        onClick={() => setShowReviewForm(!showMReviewForm)}
        className="bg-green-500 text-white p-2 rounded mt-4  border-2 border-green-500"
      >
        {showMReviewForm ? (
          <span className="text-white p-2">✕</span>
        ) : (
          "新しくレビューを投稿"
        )}
      </button>
      {showMReviewForm && (
        <ReviewForm
          saunaMealId={saunaMeal.id}
          onReviewAdded={handleReviewAdded}
        />
      )}
      <h2 className="text-2xl font-bold mt-8 mb-4">
        {saunaMeal.name}のレビュー一覧
      </h2>
      {reviewList}
    </div>
  );
}
