"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";

interface SaunaFacilityFrom {
  name: string;
  address: string;
  description: string;
}

export default function CreateSaunaFacility() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SaunaFacilityFrom>();
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const onSubmit = async (data: SaunaFacilityFrom) => {
    console.log(data);
    if (!user) {
      alert("ログインして");
      setError("ログインしないと投稿できません");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/sauna-facilities", data, {
        headers: {
          Authorization: `Bearer ${await user.getIdToken()}`,
        },
      });
      router.push("/sauna-facilities");
    } catch (error) {
      console.error("サウナ施設作成エラー", error);
      setError("サウナ施設の作成に失敗しました");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">新規サウナ施設を追加</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name", { required: "施設名は必須です" })}
              placeholder="施設名"
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div>
            <input
              {...register("address", { required: "住所は必須です" })}
              placeholder="住所"
              className="w-full p-2 border rounded"
            />
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}
          </div>
          <div>
            <textarea
              {...register("description", { required: "説明は必須です" })}
              placeholder="説明(300文字以内で入力して)"
              className="w-full p-2 border rounded"
              maxLength={300}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            追加
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
