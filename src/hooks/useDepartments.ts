"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Department {
  id: number;
  name: string;
  display_name: string;
}

interface DepartmentsResponse {
  success: boolean;
  data: Department[];
}

export function useDepartments() {
  return useQuery<DepartmentsResponse>({
    queryKey: ["departments"],
    queryFn: () => api.get<DepartmentsResponse>("/api/departments"),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
