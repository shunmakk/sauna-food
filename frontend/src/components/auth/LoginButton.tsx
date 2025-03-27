"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <button
        onClick={handleLogin}
        className={`${className}`}
        type="button"
        aria-label="ログイン"
      >
        ログイン
      </button>
    </>
  );
};

export default LoginButton;
