'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserWrapper } from '@/components/profile/user-wrapper';
import { useTranslations } from 'next-intl';

export function AuthButton({ user }) {
  const pathname = usePathname();
  const t = useTranslations('Common');
  const tAriaLabel = useTranslations('AriaLabel');
  const hiddenOnRoutes = ['/auth'];
  const shouldHide = hiddenOnRoutes.some(route => pathname.startsWith(route));

  if (shouldHide) return null;

  return (
    <nav aria-label={tAriaLabel("userNav")}>
      <UserWrapper user={user} />
    </nav>
  );
}