import Link from "next/link"
import { AuthButton } from "./auth-button"
import { CartWrapper } from "./cart-wrapper"
import { createClient } from "@/lib/supabase/server";

export const Nav = async () => {
    const supabase = await createClient();
  
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Next.js Supabase Starter</Link>
              <div className="flex items-center gap-2">
              </div>
            </div>
            <AuthButton user={user} />
            <CartWrapper userId={user?.id}/>
          </div>
        </nav>
    )
}