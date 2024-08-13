"use client";

import { Auth } from "@/lib/auth";
import React, { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren & {};

type AuthContextState = {
  isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: Auth | null;
  // setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = React.createContext<AuthContextState>({
  isLoading: true,
  // setIsLoading: () => {},
  user: null,
  // setUser: () => {},
});

export default function AuthContextProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Auth | null>(null);

  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });
        const body = await res.json();
        if (res.status === 200) {
          setUser(body);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    // fn().then().catch();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
