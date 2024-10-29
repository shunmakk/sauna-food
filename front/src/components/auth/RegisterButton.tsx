"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface RegisterButtonProps {
  className?: string;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ className }) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/register");
  };

  return (
    <>
      <button
        onClick={handleLogin}
        className={`${className}`}
        type="button"
        aria-label="新規登録"
      >
        新規登録
      </button>
    </>
  );
};

export default RegisterButton;
