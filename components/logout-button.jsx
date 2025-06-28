"use client";
import { logoutAction } from "@/utils/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/");
    router.refresh();
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}