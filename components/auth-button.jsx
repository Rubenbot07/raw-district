'use client'
import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import { UserIcon } from './icons/user-icon'
import { usePathname } from "next/navigation";
import { useUserContext } from "@/app/context/UserContext";
export function AuthButton() {
  const { user } = useUserContext();
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