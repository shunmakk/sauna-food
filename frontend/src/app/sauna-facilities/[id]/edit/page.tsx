"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../../context/AuthContext";

interface SaunaFacilityForm {
  name: string;
  address: string;
  description: string;
}

export default function EditSaunaFacility({
  params,
}: {
  params: { id: string };
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SaunaFacilityForm>();
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchFaclity = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/sauna-facilities/${params.id}`
        );
        const faclity = res.data;
        setValue("name", faclity?.name);
        setValue("address", faclity?.address);
        setValue("description", faclity?.escription);
      } catch (error) {
        console.error("サウナ施設取得エラー:", error);
        setError("サウナ施設の取得に失敗しました");
      }
    };
    fetchFaclity();
  }, [params.id, setValue]);

  const onSubmit = async (data: SaunaFacilityForm) => {
    if (!user) {
      setError("編集するにはログインして！");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/sauna-facilities/${params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        }
      );
      router.push("/");
    } catch (error) {
      console.error("編集エラー", error);
      setError("編集に失敗しました");
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">サウナ施設を編集</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              {...register("description")}
              placeholder="説明"
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            更新
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </>
  );
}
