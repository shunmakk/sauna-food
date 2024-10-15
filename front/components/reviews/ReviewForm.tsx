import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

interface ReviewFormData {
  overallRating: number;
  tasteRating: number;
  valueRating: number;
  comment: string;
}

interface ReviewFormProps {
  saunaMealId: string;
  onReviewAdded: () => void;
}

export default function ReviewForm({
  saunaMealId,
  onReviewAdded,
}: ReviewFormProps) {
  const { register, handleSubmit, reset } = useForm<ReviewFormData>();
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const onSubmit = async (data: ReviewFormData) => {
    try {
      if (!user) {
        throw new Error("ログインが必要です");
      }

      const token = await user.getIdToken();
      await axios.post(
        "http://localhost:5000/api/reviews",
        {
          ...data,
          saunaMealId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      reset();
      onReviewAdded();
    } catch (err) {
      setError("レビューの投稿に失敗しました");
      console.error(err);
    }
  };

  if (!user) {
    return <p>レビューを投稿するにはログインしてください。</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
      <h3 className="text-xl font-bold mb-4">レビューを投稿</h3>
      <div className="mb-4">
        <label className="block mb-2">総合評価</label>
        <input
          {...register("overallRating", { required: true, min: 1, max: 5 })}
          type="number"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">味の評価</label>
        <input
          {...register("tasteRating", { required: true, min: 1, max: 5 })}
          type="number"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">価格の評価</label>
        <input
          {...register("valueRating", { required: true, min: 1, max: 5 })}
          type="number"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">コメント</label>
        <textarea
          {...register("comment")}
          className="w-full p-2 border rounded"
          rows={4}
        ></textarea>
      </div>
      <button type="submit" className="text-blue-500">
        レビューを投稿
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
