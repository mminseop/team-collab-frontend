"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface AddUserData {
  email: string;
  name: string;
  password: string;
  departmentId: string;
  role: string;
}

interface AddUserResponse {
  success: boolean;
  user: {
    id: number;
    email: string;
    name: string;
    department_id: number;
    role_id: number;
    is_active: string;
  };
}

export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddUserData) =>
      api.post<AddUserResponse>("/api/auth/users", {
        email: data.email,
        name: data.name,
        password: data.password,
        department_id: Number(data.departmentId),
        role_id: data.role === "ADMIN" ? 1 : 2, // ADMIN=1, MEMBER=2
      }),
    onSuccess: () => {
      // 사용자 목록, 부서 목록 등 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      console.error("AddUser error:", error);
    },
  });
}
