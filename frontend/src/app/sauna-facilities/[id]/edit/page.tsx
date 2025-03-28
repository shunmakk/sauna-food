"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../../context/AuthContext";
import ErrorSnackbar from "@/components/common/ErrorSnackbar";

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
    formState: { isDirty, errors },
  } = useForm<SaunaFacilityForm>();
  const [error, setError] = useState("");
  //faclitiyNameを取得
  const [getFaclityName, setgetFaclityName] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchFaclity = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/sauna-facilities/${params.id}`
        );
        const faclity = res.data;
        setgetFaclityName(faclity?.name);

        setValue("address", faclity?.address);
        setValue("description", faclity?.description);
      } catch (error) {
        console.error("サウナ施設取得エラー:", error);
        setError("サウナ施設の取得に失敗しました");
      }
    };
    fetchFaclity();
  }, [params.id, setValue]);

  const onSubmit = async (data: SaunaFacilityForm) => {
    if (!user) {
      setError("編集するにはログインする必要があります");
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
      router.push(`/sauna-facilities/${params.id}`);
    } catch (error) {
      console.error("編集エラー", error);
      setError("編集に失敗しました");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    setOpen(false);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{getFaclityName}を編集</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:w-3/4">
          <div>
            <label htmlFor="address">住所</label>
            <input
              {...register("address", { required: "住所は必須です" })}
              id="adress"
              type="text"
              placeholder="住所"
              className="w-full p-2 border rounded"
            />
            {errors.address && (
              <span className="text-red-500">{errors?.address?.message}</span>
            )}
          </div>
          <div>
            <label htmlFor="description">説明</label>
            <textarea
              {...register("description", { required: "説明の入力は必須です" })}
              placeholder="説明(300文字以内で入力してください)"
              className="w-full  p-2 border roundedresize-y min-h-[100px] h-[250px] lg:h-[200px]"
              maxLength={300}
            />
            {errors.description && (
              <span className="text-red-500">
                {errors?.description?.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={!isDirty}
            onClick={handleOpen}
          >
            更新
          </button>
        </form>
        {error && (
          // ここは他の画面でも共通化してもいいかも
          <ErrorSnackbar open={open} error={error} handleClose={handleClose} />
        )}
      </div>
    </>
  );
}
