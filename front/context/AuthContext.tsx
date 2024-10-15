"use client";
import React, { createContext, useContext } from "react";
import { User } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useState, useEffect } from "react";

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
