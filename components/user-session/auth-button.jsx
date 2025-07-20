'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { UserWrapper} from '@/components/user-wrapper';

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