"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/common/SearchBar";
import PageNation from "@/components/common/PageNation";
import Header from "@/components/layout/Header";
import { fetchSaunaMeals } from "../actions/saunaMeals";

interface SaunaMeal {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string | null;
  facility: { id: string; name: string };
}

export default function SaunaMealList() {
  const [saunaMeal, setSaunaMeal] = useState<SaunaMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSarchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage] = useState(9);

  useEffect(() => {
    const loadSaunaMealList = async () => {
      setLoading(true);
      try {
        const data = await fetchSaunaMeals(searchTerm);
        setSaunaMeal(data);
      } catch (error) {
        console.error("サウナ飯一覧の取得中にエラーが発生しました:", error);
        setError("サウナ飯一覧の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    loadSaunaMealList();
  }, [searchTerm]);

  const filterMeals = saunaMeal.filter(
    (male) =>
      male.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      male.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      male.price.toString().includes(searchTerm)
  );

  const indexOfLastMeal = currentPage * mealsPerPage; //最終施設のindex
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage; //最初の施設のindex
  const currentMeals = filterMeals.slice(indexOfFirstMeal, indexOfLastMeal); //現在の表示施設

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-[97vh] bg-gray-100 relative">
      <Header />
      <div className="container mx-auto p-4 mt-12">
        <h1 className="text-4xl font-bold mb-6">サウナ飯一覧</h1>
        <div className="flex justify-end mb-3">
          <SearchBar
            setSearchTerm={setSarchTerm}
            placeholder={"サウナ飯名を検索"}
          />
        </div>
        {loading ? (
          <div className="col-span-3 flex items-center justify-center mt-52">
            <p className="text-center">読み込み中...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentMeals?.map((meal) => (
              <div key={meal.id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{meal.name}</h2>
                {meal.imageUrl && (
                  <Image
                    src={meal.imageUrl}
                    alt={meal.name}
                    width={500}
                    height={200}
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
            {!filterMeals.length && (
              <div className="col-span-3 flex items-center justify-center mt-52">
                <p className="text-center">該当するサウナ飯はありません</p>
              </div>
            )}
          </div>
        )}

        <PageNation
          filterContent={filterMeals}
          PerPage={mealsPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
