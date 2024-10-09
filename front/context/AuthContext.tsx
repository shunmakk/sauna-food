"use client";
import React, { createContext, useContext } from "react";
import { User } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
}

//コンテキストを初期化
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, loading] = useAuthState(auth);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
