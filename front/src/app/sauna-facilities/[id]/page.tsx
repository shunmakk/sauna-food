"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";
import SaunaMealForm from "../../../components/sauna-meals/SaunaMealForm";
import SaunaMealList from "../../../components/sauna-meals/SaunaMealList";

interface SaunaFacility {
  id: string;
  name: string;
  address: string;
  description: string;
  createdBy: {
    id: string;
    name: string;
  };
}

interface SaunaMeal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

export default function SaunaFacilityDetail({
  params,
}: {
  params: { id: string };
}) {
  const [facility, setFacility] = useState<SaunaFacility | null>(null);
  const [saunaMeals, setSaunaMeals] = useState<SaunaMeal[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const [showMealForm, setShowMealForm] = useState(false);
  const { user } = useAuth();

  //とりあえずクライアント側でデータ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [facilityRes, mealsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/sauna-facilities/${params.id}`),
          axios.get(
            `http://localhost:5000/api/sauna-meals/facility/${params.id}`
          ),
        ]);
        setFacility(facilityRes.data);
        setSaunaMeals(mealsRes.data);
      } catch (error) {
        console.error("施設データ取得エラー", error);
        setError("データの取得に失敗しました");
      }
    };
    fetchData();
  }, [params.id]);

  //削除機能(便宜上としてあるものなので、リリースするとしたら仕様変更するか消す)
  const handleDelete = async () => {
    if (!user) {
      setError("削除するにはログインする必要があります");
    }
    if (confirm("本当に削除する?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/sauna-facilities/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${await user?.getIdToken()}`,
            },
          }
        );
        router.push("/sauna-facilities");
      } catch (error) {
        console.error("削除エラー", error);
        setError("削除に失敗しました");
      }
    }
  };

  const handleMealSuccess = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/sauna-meals/facility/${params.id}`
      );
      setSaunaMeals(res.data);
      setShowMealForm(false);
    } catch (error) {
      console.error("サウナ飯更新エラー", error);
      setError("サウナ飯の更新に失敗しました");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">{facility?.name}</h1>
        <h2 className="text-xl font-semibold">住所</h2>
        <p>{facility?.address}</p>
        <h2 className="text-xl font-semibold">説明</h2>
        <p>{facility?.description}</p>
        <h2 className="text-xl font-semibold">作成者</h2>
        <p>{facility?.createdBy.name}</p>

        <div className="mt-4 space-x-2">
          <Link
            href={`/sauna-facilities/${params.id}/edit`}
            className="bg-blue-500 text-white p-2 rounded"
          >
            編集
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded"
          >
            削除
          </button>
          <Link
            href="/sauna-facilities"
            className="bg-gray-500 text-white p-2 rounded"
          >
            戻る
          </Link>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <button
          onClick={() => setShowMealForm(!showMealForm)}
          className="bg-green-500 text-white p-2 rounded mt-4"
        >
          {showMealForm ? "フォームを閉じる" : "新しくサウナ飯を追加"}
        </button>

        {showMealForm && (
          <SaunaMealForm facilityId={params.id} onSuccess={handleMealSuccess} />
        )}
        <h2 className="text-2xl font-bold mt-8 mb-4">サウナ飯一覧</h2>
        <SaunaMealList meals={saunaMeals} />
      </div>
    </div>
  );
}
