"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface User {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "MEMBER";
  departmentId: number | null;
}

interface UserResponse {
  success: boolean;
  user: User;
}

export function useUser() {
  return useQuery<UserResponse>({
    queryKey: ["user"],
    queryFn: () => api.get<UserResponse>("/api/auth/me"),
    staleTime: 5 * 60 * 1000,
  });
}
