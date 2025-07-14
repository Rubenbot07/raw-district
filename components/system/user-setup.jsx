'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/app/stores/userStore';

export const UserSetup = () => {
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, []);

  return null;
};