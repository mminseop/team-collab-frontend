"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";

interface User {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "MEMBER";
  departmentId: number | null;
}

export function useUser() {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: () => apiClient.get("/api/auth/me").then((res) => res.data.user),
    enabled: !!useAuthStore((state) => state.user),
  });
}
