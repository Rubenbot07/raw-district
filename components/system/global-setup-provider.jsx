'use client';

import { CartSetup } from '@/components/system/cart-setup';
import { UserSetup } from '@/components/system/user-setup';
import { ProgressBar } from '@/components/progress-bar';
import { PreCartModal } from '@/components/cart/precart-modal';

export const GlobalSetupProvider = () => {
  return (
    <>
      <CartSetup />
      <UserSetup />
      <ProgressBar />
      <PreCartModal />
    </>
  );
};