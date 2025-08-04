'use client';
import Link from "next/link";
import { useCartUIStore } from "@/app/stores/cartUIStore";
import { useUserStore } from "@/app/stores/userStore";
import { Lock } from "lucide-react";

export const CheckoutButton = () => {
  const user = useUserStore((state) => state.user);
  const setOpenCart = useCartUIStore((state) => state.setOpenCart);

  const href = user ? "/checkouts" : "/auth/login";
  const label = user ? "Proceed to checkout" : "Sign in to continue";

  return (
    <div role="presentation">
      <Link href={href} passHref      
          onClick={() => setOpenCart(false)}
          className="w-full bg-black text-white p-2 flex justify-center gap-3 items-center text-md font-light focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
          role="button"
          aria-label={label}
      >
      
          <Lock size={20} aria-hidden="true" />
          <span>{user ? "CHECKOUT" : "LOGIN TO CHECKOUT"}</span>
      </Link>
    </div>
  );
};