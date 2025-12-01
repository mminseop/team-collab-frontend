"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from '@/lib/api';

interface UserResponse {
  success: boolean;
  user: {
    id: number;
    email: string;
    name: string;
    role: "ADMIN" | "MEMBER";
    departmentId: number | null;
  };
}

export function useUser() {
  return useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: () => api.get<UserResponse>("/api/auth/me"),
    staleTime: 5 * 60 * 1000,
  });
}
