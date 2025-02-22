"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../../components/common/SearchBar";
import PageNation from "../../components/common/PageNation";
import Header from "@/components/layout/Header";
import { fetchSaunaFacilities } from "../actions/saunaFacilities";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFacilities = async () => {
      setLoading(true);
      try {
        const data = await fetchSaunaFacilities(searchTerm);
        setFacilities(data);
      } catch (error) {
        console.error("サウナ施設取得エラー", error);
        setError("サウナ施設の取得に失敗しました");
      } finally {
        setLoading(false); // データ取得完了時にローディングを false に
      }
    };
    loadFacilities();
  }, [searchTerm]);

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
    <div className="flex flex-col min-h-[calc(100vh-theme(space.16))] bg-gray-100">
      <Header />
      <div className="container mx-auto p-4 mt-12 flex flex-col flex-grow relative">
        <h1 className="text-4xl font-bold mb-6">サウナ施設一覧</h1>
        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
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
        <div className="flex-grow mb-24">
          {loading ? (
            <div className="flex items-center justify-center mt-52">
              <p className="text-center">読み込み中...</p>
            </div>
          ) : (
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
              {currentFacilities.length === 0 && !loading && (
                <div className="flex items-center justify-center mt-52">
                  <p className="text-center">該当するサウナ施設はありません</p>
                </div>
              )}
            </ul>
          )}
        </div>
        <div className="absolute bottom-6 sm:bottom-30 md:bottom-30 lg:bottom-30 left-1/2 transform -translate-x-1/2 w-full sm:w-auto">
          <PageNation
            filterContent={filterFacilities}
            PerPage={facilitiesPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
