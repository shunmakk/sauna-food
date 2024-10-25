import React from "react";
import Link from "next/link";
import Image from "next/image";

interface SaunaMeal {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface SaunaMealListProps {
  meals: SaunaMeal[];
}

const SaunaMealList: React.FC<SaunaMealListProps> = ({ meals }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {meals.length > 0 ? (
        meals.map((meal) => (
          <div key={meal.id} className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{meal.name}</h3>
            <div>
              {meal.imageUrl && (
                <Image
                  src={meal.imageUrl}
                  alt={meal.name}
                  width={500}
                  height={200}
                  className="object-cover mt-2"
                />
              )}
            </div>
            <p>{meal.description}</p>
            <p className="font-bold">¥{meal.price}</p>
            <Link
              href={`/sauna-meals/${meal.id}`}
              className="text-blue-500 hover:underline"
            >
              詳細を見る
            </Link>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <p>{`現在、サウナ飯は登録されていません`}</p>
        </div>
      )}
    </div>
  );
};

export default SaunaMealList;
