import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => api.post("/api/auth/logout"),
    onSuccess: () => {
      // 1. user 쿼리 무효화 (자동으로 loading 상태로 변경)
      queryClient.invalidateQueries({ queryKey: ["user"] });
      
      // 2. 다른 인증 관련 쿼리들도 필요시 무효화
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      
      // 3. 로그인 페이지로 리다이렉트
      router.push("/");
    },
    onError: () => {
      alert("로그아웃 중 오류가 발생했습니다.");
    },
  });
}
