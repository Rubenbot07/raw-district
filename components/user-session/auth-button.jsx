'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserWrapper } from '@/components/profile/user-wrapper';

export function AuthButton({user}) {
  const pathname = usePathname();

  const hiddenOnRoutes = ['/auth']
  const shouldHide = hiddenOnRoutes.some(route => pathname.startsWith(route))

    if(shouldHide) return null
  return (
    <section>
        {
          user && (
            <UserWrapper user={user}/>
          )
        }
        {
          !user &&
            <UserWrapper>
              <div className="flex flex-col gap-2 w-16">
                <div>
                  <Link href="/auth/login">Sign in</Link>
                </div>
                <div>
                  <Link href="/auth/sign-up">Sign up</Link>
                </div>
              </div>
            </UserWrapper>
        }      
    </section>
)}