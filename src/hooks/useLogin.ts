'use client';

import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { AxiosError } from 'axios';

interface LoginBody {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user: {
    id: number;
    email: string;
    name: string;
    role: 'ADMIN' | 'MEMBER';
    departmentId: number | null;
  };
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: LoginBody) =>
      apiClient.post<LoginResponse>('/api/auth/login', { email, password }).then(res => res.data),
    
    onError: (error: AxiosError<{ error?: string }>) => {
      const message = error.response?.data?.error || '로그인에 실패했습니다.';
      alert(message);
    },
  });
}
