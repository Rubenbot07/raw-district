'use client';

import Link from "next/link";
import Marquee from "react-fast-marquee";
import { useTranslations } from 'next-intl';

export const MarqueeBanner = ({ children, speed, z = 50 }) => {
  const t = useTranslations('Marquee'); // Namespace: Marquee.json

  const contentDefault = (
    <>
      <p className="pl-10">
        <strong>{t('buyWhatsapp')}</strong>{" "}
        <Link
          className="underline focus:outline-none focus:ring-2 focus:ring-blue-500"
          href="https://wa.me/3006870774"
          target="_blank"
          rel="noopener noreferrer"
        >
          +57 300 687 0774
        </Link>
      </p>
      <p>
        {t('returns')} <strong>{t('free')}</strong>. {t('terms')}
      </p>
      <p>
        <strong>{t('freeShipping')}</strong> {t('ordersOver')}
      </p>
      <p>
        {t('askBefore')} <strong>3PM</strong> {t('sameDay')}
      </p>
    </>
  );

  return (
    <div
      role="region"
      aria-label={t('ariaLabel')}
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
    </div>
  );
};