"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface SaunaFacilityList {
  id: string;
  name: string;
  address: string;
}

export default function SaunaFacilityList() {
  const [facilities, setFacilities] = useState<SaunaFacilityList[]>([]);
  const [error, setError] = useState("");

  //とりあえうデータはクライアント側で取得(後々、apiページで取得に変更)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/sauna-facilities"
        );
        setFacilities(res.data);
      } catch (e) {
        setError("サウナ施設の取得に失敗しました");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">サウナ施設一覧</h1>
        <Link
          href="/sauna-facilities/create"
          className="bg-green-500 text-white p-2 rounded"
        >
          新規サウナ施設を追加
        </Link>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <ul className="mt-8 space-y-2">
          {facilities.map((facility) => (
            <li key={facility.id} className="border p-2 rounded">
              <Link
                href={`/sauna-facilities/${facility.id}`}
                className="text-blue-500 hover:underline text-2xl"
              >
                {facility.name}
              </Link>
              <div>{facility.address}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
