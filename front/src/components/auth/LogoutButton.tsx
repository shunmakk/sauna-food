"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

interface LogoutButtonProps {
  className?: string;
  onLogoutSuccess?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  className = "",
  onLogoutSuccess,
}) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    if (!user) {
      alert("既にログアウト済です");
      return;
    }

    try {
      const LogoutConfrim = confirm("ログアウトしますか?");
      if (LogoutConfrim) {
        await signOut(auth);
        alert("ログアウトしました");

        if (onLogoutSuccess) {
          onLogoutSuccess();
        }

        router.push("/");
      } else {
        return;
      }
    } catch (error) {
      console.error("ログアウトエラー:", error);
      alert("ログアウトに失敗しました。もう一度お試しください。");
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className={`${className}`}
        type="button"
        aria-label="ログアウト"
      >
        ログアウト
      </button>
    </>
  );
};

export default LogoutButton;
