"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

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
  const { user } = useAuth();

  useEffect(() => {
    const fetchSaunaMeal = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/sauna-meals/${params.id}`
        );
        setSaunaMeal(response.data);
      } catch (err) {
        setError("サウナ飯の取得に失敗しました");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaunaMeal();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!saunaMeal) return <div>サウナ飯が見つかりません</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{saunaMeal.name}</h1>
      {saunaMeal.imageUrl && (
        <img
          src={saunaMeal.imageUrl}
          alt={saunaMeal.name}
          className="w-full max-w-md mb-4"
        />
      )}
      <p className="mb-2">
        <strong>価格:</strong> {saunaMeal.price}円
      </p>
      <p className="mb-2">
        <strong>説明:</strong> {saunaMeal.description}
      </p>
      <p className="mb-4">
        <strong>施設:</strong> {saunaMeal.facility.name}
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">レビュー</h2>
      {saunaMeal.reviews.length > 0 ? (
        <ul>
          {saunaMeal.reviews.map((review) => (
            <li key={review.id} className="mb-4 p-4 border rounded">
              <p>
                <strong>{review.user.name}</strong>
              </p>
              <p>総合評価: {review.overallRating}/5</p>
              <p>味: {review.tasteRating}/5</p>
              <p>価値: {review.valueRating}/5</p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>まだレビューがありません。</p>
      )}
    </div>
  );
}
