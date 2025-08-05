'use client'
import Link from "next/link";
import Marquee from "react-fast-marquee";

export const MarqueeBanner = ({ children, speed, z = 50 }) => {
  const contentDefault = (
    <>
      <p className="pl-10">
        <strong>BUY BY WHATSAPP</strong>{" "}
        <Link
          className="underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          href="https://wa.me/3006870774"
          target="_blank"
          rel="noopener noreferrer"
        >
          +57 300 687 0774
        </Link>{" "}
      </p>
      <p>
        RETURNS <strong>FREE.</strong> They apply T&C
      </p>
      <p>
        <strong>FREE SHIPPING </strong>FOR PURCHASES OVER $200,000
      </p>
      <p>
        ASK <strong>BEFORE 3PM</strong> IN DOSQUEBRADAS AND RECEIVE SAME DAY
      </p>
    </>
  );

  return (
    <div
      role="region"
      aria-label="Important store announcements"
      className={`relative z-${z}`}
      >
      <Marquee
        aria-hidden="true"
        speed={speed} 
        gradient={false}
        pauseOnHover
        autoFill
        className="flex w-full text-[10px] lg:text-[12px] py-2 overflow-hidden bg-white"
      >
        <div className="w-full flex gap-10">{children || contentDefault}</div>
      </Marquee>
      <div className="sr-only" aria-live="polite">
        BUY BY WHATSAPP +57 300 687 0774. RETURNS FREE. FREE SHIPPING FOR PURCHASES OVER $200,000. ASK BEFORE 3PM IN DOSQUEBRADAS AND RECEIVE SAME DAY.
      </div>
    </div>
  );
};