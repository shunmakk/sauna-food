"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import { useAuth } from "../../../context/AuthContext";
import Image from "next/image";

interface SaunaMealFromData {
  name: string;
  description: string;
  price: string;
}

interface SaunaMealFormProps {
  facilityId: string;
  onSuccess?: () => void;
}

export default function SaunaMealForm({
  facilityId,
  onSuccess,
}: SaunaMealFormProps) {
  const { register, handleSubmit, reset } = useForm<SaunaMealFromData>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const onSubmit = async (data: SaunaMealFromData) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!user) {
        throw new Error("認証が必要です");
      }
      const token = await user.getIdToken();
      const res = await axios.post(
        "http://localhost:5000/api/sauna-meals",
        {
          ...data,
          facilityId,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 認証トークンをヘッダーに追加
          },
        }
      );
      console.log("サウナめしを作成しました", res.data);
      reset();
      setImageUrl(null);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("サウナ飯登録エラー:", error);
      setError("サウナ飯の登録に失敗しました。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.log("ファイルが見つかりません");
      return;
    }
    const storageRef = ref(storage, `sauna-meals/${Date.now()}_${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url);
    } catch (error) {
      console.error("画像登録エラー:", error);
      setError("画像のuploadに失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div>
        <label htmlFor="name" className="block mb-1">
          名前
        </label>
        <input
          {...register("name", { required: true })}
          id="name"
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-1">
          説明
        </label>
        <textarea
          {...register("description")}
          id="description"
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="price" className="block mb-1">
          価格
        </label>
        <input
          {...register("price", { required: true, valueAsNumber: true })}
          id="price"
          type="number"
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="image" className="block mb-1">
          画像
        </label>
        <input
          type="file"
          onChange={handleImageUpload}
          id="image"
          accept="image/*"
          className="w-full p-2 border rounded"
        />
        {imageUrl && (
          <Image
            width={200}
            height={100}
            src={imageUrl}
            alt="Uploaded preview"
            className="mt-2 max-w-xs"
          />
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
      >
        {isLoading ? "登録中..." : "サウナ飯を登録"}
      </button>
    </form>
  );
}
