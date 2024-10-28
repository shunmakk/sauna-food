"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import SearchBar from "../../components/common/SearchBar";
import PageNation from "../../components/common/PageNation";
import Header from "@/components/common/Header";

interface SaunaFacilityList {
  id: string;
  name: string;
  address: string;
}

export default function SaunaFacilityList() {
  const [facilities, setFacilities] = useState<SaunaFacilityList[]>([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); //検索ワード
  const [currentPage, setCurrentPage] = useState(1); //初期ページ
  const [facilitiesPerPage] = useState(6); //1ページあたりの施設数

  //とりあえうデータはクライアント側で取得(後々、apiページで取得に変更)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/sauna-facilities"
        );
        setFacilities(res.data);
      } catch (error) {
        console.error("サウナ施設取得エラー", error);
        setError("サウナ施設の取得に失敗しました");
      }
    };
    fetchData();
  }, []);

  //検索機能
  const filterFacilities = facilities.filter(
    (facility) =>
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // ページネーション（ページ数を計算）
  const indexOfLastFacility = currentPage * facilitiesPerPage; //最終施設のindex
  const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage; //最初の施設のindex
  const currentFacilities = filterFacilities.slice(
    indexOfFirstFacility,
    indexOfLastFacility
  ); //現在の表示施設

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-[97vh] bg-gray-100 relative">
      <Header />
      <div className="container mx-auto p-4 mt-12">
        <h1 className="text-4xl font-bold mb-6">サウナ施設一覧</h1>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="flex  flex-col gap-6   md:flex-row   md:justify-between md:items-center">
          <Link
            href="/sauna-facilities/create"
            className="bg-green-500 text-white text-center p-2 rounded"
          >
            新規サウナ施設を追加
          </Link>
          <SearchBar
            setSearchTerm={setSearchTerm}
            placeholder={"施設名、住所を検索"}
          />
        </div>

        <ul className="mt-8 space-y-2">
          {currentFacilities.map((facility) => (
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
          {!filterFacilities.length && (
            <div className="col-span-3 flex items-center justify-center mt-52">
              <p className="text-center">該当するサウナ施設はありません</p>
            </div>
          )}
        </ul>
        <PageNation
          filterContent={filterFacilities}
          PerPage={facilitiesPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
