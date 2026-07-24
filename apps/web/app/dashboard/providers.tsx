'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [client] = useState(() => new QueryClient());
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      router.replace('/login');
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) return null;

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
