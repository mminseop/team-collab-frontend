'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/stores/useAuthStore';

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => apiClient.get('/api/auth/me').then(res => res.data.user),
    enabled: !!useAuthStore((state) => state.user),
  });
}
