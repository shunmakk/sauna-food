"use server";

interface saunaFaclitiy {
  id: string;
  name: string;
  address: string;
}

export async function fetchSaunaFacilities(searchTerm: string = "") {
  try {
    const res = await fetch("http://localhost:5000/api/sauna-facilities", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("多分サーバー側が動いていない");
    }

    const facilities: saunaFaclitiy[] = await res.json();

    //サーバー側で検索を実行
    const filteredFacilities = facilities.filter(
      (facility) =>
        facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredFacilities;
  } catch (error) {
    console.error("サウナ施設のフェッチに失敗", error);
    throw new Error("サウナ施設の取得に失敗しました");
  }
}
