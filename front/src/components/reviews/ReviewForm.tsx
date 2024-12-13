import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { Rating, Box } from "@mui/material";

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

const labels: { [index: string]: string } = {
  1: "😡",
  2: "😣",
  3: "😎",
  4: "😆",
  5: "😍",
};

export default function ReviewForm({
  saunaMealId,
  onReviewAdded,
}: ReviewFormProps) {
  const { register, handleSubmit, reset, control } = useForm<ReviewFormData>({
    defaultValues: {
      overallRating: 0,
      tasteRating: 0,
      valueRating: 0,
      comment: "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // hoverStatesの型を定義
  const [hoverStates, setHoverStates] = useState<{
    overallRating: number;
    tasteRating: number;
    valueRating: number;
  }>({
    overallRating: 0,
    tasteRating: 0,
    valueRating: 0,
  });

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
      setError(
        err instanceof Error ? err.message : "レビューの投稿に失敗しました"
      );
      console.error(err);
    }
  };

  const renderRatingField = (
    name: "overallRating" | "tasteRating" | "valueRating",
    label: string
  ) => (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        rules={{ required: "評価を入力してください", min: 1, max: 5 }}
        render={({ field, fieldState }) => (
          <div className="flex flex-row gap-3">
            <Rating
              {...field}
              value={Number(field.value) || 0}
              precision={1}
              onChange={(_, value) => field.onChange(value)}
              onChangeActive={(_, newHover) =>
                setHoverStates((prev) => ({ ...prev, [name]: newHover }))
              }
            />
            <Box className="text-sm text-gray-600 mt-1">
              {labels[
                hoverStates[name] !== -1 ? hoverStates[name] : field.value
              ] || ""}
            </Box>
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-green-500 border-2 p-6 rounded-sm"
    >
      <div className="w-1/2 mx-auto my-4">
        <h3 className="text-xl font-bold mb-4">レビューを投稿</h3>
        {renderRatingField("overallRating", "総合評価")}
        {renderRatingField("tasteRating", "味の評価")}
        {renderRatingField("valueRating", "価格の評価")}
        <div className="mb-4">
          <label htmlFor="comment" className="block mb-2">
            コメント
          </label>
          <textarea
            id="comment"
            {...register("comment")}
            className="p-2 border rounded w-full"
            rows={4}
          ></textarea>
        </div>
        <div className="lg:mx-auto lg:w-1/3">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            レビューを投稿
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </form>
  );
}
