"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Auth } from "@/lib/auth";

type Props = {
  auth: Auth;
};

export default function Menu({ auth }: Props) {
  const logout = async () => {
    await api.post("auth/logout");
    window.location.reload();
  };

  return (
    <div>
      <div>Logged In: {JSON.stringify(auth)}</div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
