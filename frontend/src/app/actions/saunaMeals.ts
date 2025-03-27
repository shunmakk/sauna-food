"use server";
interface SaunaMeal {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string | null;
  facility: { id: string; name: string };
}

export async function fetchSaunaMeals(searchTerm: string = "") {
  try {
    const res = await fetch("http://localhost:5000/api/sauna-meals", {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("多分サーバー側が動いていない");
    }

    const meals: SaunaMeal[] = await res.json();

    const filteredMeals = meals.filter(
      (male) =>
        male.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        male.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        male.price.toString().includes(searchTerm)
    );

    return filteredMeals;
  } catch (error) {
    console.error("サウナ飯一覧のフェッチに失敗", error);
    throw new Error("サウナ飯一覧の取得に失敗しました");
  }
}
