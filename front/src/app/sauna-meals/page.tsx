"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface SaunaMeal {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string | null;
  facility: { id: string; name: string };
}

export default function saunaMealList() {
  const [saunaMeal, setSaunaMeal] = useState<SaunaMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSaunaMealList = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sauna-meals");
        setSaunaMeal(res.data);
      } catch (error) {
        setError("サウナ飯の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    fetchSaunaMealList();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">サウナ飯一覧</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {saunaMeal?.map((meal) => (
            <div key={meal.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{meal.name}</h2>
              {meal.imageUrl && (
                <img
                  src={meal.imageUrl}
                  alt={meal.name}
                  className="w-full h-48 object-cover my-2"
                />
              )}
              <p>
                <strong>価格:</strong> {meal.price}円
              </p>
              <p>
                <strong>施設:</strong> {meal.facility.name}
              </p>
              <Link
                href={`/sauna-meals/${meal.id}`}
                className="text-blue-500 hover:underline"
              >
                詳細を見る
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
