import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => api.post("/api/auth/logout"),
    onSuccess: () => {
      queryClient.clear(); // 모든 캐시 제거
      router.push("/");
    },
    onError: () => {
      alert("로그아웃 중 오류가 발생했습니다.");
    },
  });
}
