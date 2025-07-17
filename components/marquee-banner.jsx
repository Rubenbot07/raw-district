'use client'
import Link from "next/link"
import Marquee from "react-fast-marquee"
export const MarqueeBanner = ({children, speed}) => {
    const contentDefault = (
    <>
      <p className="pl-10">
        <strong>BUY BY WHATSAPP</strong>{" "}
        <Link className="underline" href="https://web.whatsapp.com/" target="_blank">
          +57 300 687 0774
        </Link>{" "}           
      </p>
      <p>RETURNS <strong>FREE.</strong> They apply T&C </p>
      <p><strong>FREE SHIPPING </strong>FOR PURCHASES OVER $200,000 </p>
      <p>ASK <strong>BEFORE 3PM</strong> IN DOSQUEBRADAS AND RECEIVES THE SAME DAY</p>
    </>
  )
  return (
    <Marquee
      speed={speed}
      gradient={false}
      pauseOnHover
      className="flex w-full text-[10px] lg:text-[12px] overflow-hidden bb"
      autoFill={true}

    >
      <div className="w-full flex gap-10">
        {children || contentDefault}
      </div>
    </Marquee>
  )
}