"use client";
import { logoutAction } from "@/actions/logout";

export function LogoutButton() {

  const handleLogout = async () => {
    await logoutAction();
    window.location.href = "/";
  };

  return <button onClick={handleLogout}>Logout</button>;
}