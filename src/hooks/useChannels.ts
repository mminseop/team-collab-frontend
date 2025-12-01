'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

interface Channel {
  id: number;
  name: string;
  display_name: string;
  department_id: number | null;
}

export function useChannels() {
  return useQuery<Channel[]>({
    queryKey: ['channels'],
    queryFn: () => api.get<Channel[]>('/api/channels'),
    staleTime: 5 * 60 * 1000, // 5분
  });
}
