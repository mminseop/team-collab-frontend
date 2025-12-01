import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // HttpOnly 쿠키 자동 전송
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터: 로그인 성공 시 Zustand 업데이트
apiClient.interceptors.response.use(
  (response) => {
    // /auth/login 성공 시 user 저장
    if (response.config.url?.includes('/auth/login') && response.data.success) {
      const { user } = response.data;
      const { login } = useAuthStore.getState();
      login(user);
    }
    return response;
  },
  (error) => {
    // 401 에러 시 로그아웃
    if (error.response?.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();
    }
    return Promise.reject(error);
  }
);
