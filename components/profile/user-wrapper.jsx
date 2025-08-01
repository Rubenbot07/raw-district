'use client'
import { CircleUserRound } from "lucide-react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "@/components/user-session/logout-button";
import { useState } from "react";
export const UserWrapper = ({user, children}) => {
    const [open, setOpen] = useState(false);
    const [rotate, setRotate] = useState(false);

    const handleClick = () => {
      setOpen(!open);
      setRotate(!rotate);
    }

    return (
          <div className="flex items-center relative" onClick={handleClick}>

              <CircleUserRound strokeWidth={1.5}/>
              <span className={`transition-transform ${rotate && 'rotate-180'}`}>
                <ChevronDown size={10}/>
              </span>
              {
                open && user && (
                  <div className="min-w-[200px] z-50 flex flex-col gap-2 absolute top-12 -right-4 bg-white shadow-xl border-[1px] border-gray-300 rounded-[8px] p-4">
                    <div className="flex items-center gap-2 text-gray-500 border-b-[1px] border-gray-300 py-2">
                        <CircleUserRound color="gray" strokeWidth={1.5}/>
                        <p>{user?.email}</p>
                    </div>
                    <div className="flex flex-col gap-4 items-start text-sm">
                        <Link href="/profile">Profile</Link>
                        <Link href="/orders">Orders</Link>
                        <LogoutButton />
                    </div>
                  </div>
                )
              }
              {
                open && !user && (
                  <div className="min-w-[200px] z-50 flex flex-col gap-2 absolute top-12 -right-4 bg-white shadow-xl border-[1px] border-gray-300 rounded-[8px] p-4">
                    <div className="flex items-center gap-2 text-gray-500 border-b-[1px] border-gray-300 py-2">
                        <CircleUserRound color="gray" strokeWidth={1.5}/>
                        <p>Guest</p>
                    </div>
                    {children}
                  </div>
                )
              }
          </div>
    );
};