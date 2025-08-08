'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserWrapper } from '@/components/profile/user-wrapper';
import { useTranslations } from 'next-intl';

export function AuthButton({ user }) {
  const pathname = usePathname();
  const t = useTranslations('Common');
  const hiddenOnRoutes = ['/auth'];
  const shouldHide = hiddenOnRoutes.some(route => pathname.startsWith(route));

  if (shouldHide) return null;

  return (
    <nav aria-label="User navigation">
      {user ? (
        <UserWrapper user={user} />
      ) : (
        <UserWrapper>
          <div className="flex flex-col gap-2 w-auto">
            <div>
              <Link href="/auth/login">{t('login')}</Link>
            </div>
            <div>
              <Link href="/auth/sign-up">{t('signUp')}</Link>
            </div>
          </div>
        </UserWrapper>
      )}
    </nav>
  );
}