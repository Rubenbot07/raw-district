'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/user-session/logout-button";
import { UserIcon } from '@/components/icons/user-icon'
import { usePathname } from "next/navigation";
import { useUserStore } from "@/app/stores/userStore";
export function AuthButton() {
  const user = useUserStore((state) => state.user);
  const pathname = usePathname();
  return (
    <section>
        {
          user && (
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <UserIcon />
            </Link>
            <LogoutButton />
          </div>
          )
        }
        {
          !user && !pathname.startsWith('/auth/') &&
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button asChild size="sm" variant="default">
                <Link href="/auth/sign-up">Sign up</Link>
              </Button>
            </div>
        }
          
    </section>
)}