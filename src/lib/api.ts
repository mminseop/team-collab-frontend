import axios from 'axios';
import { useAuthStore } from '@/stores/useAuthStore';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터 수정: 클라이언트에서만 zustand 호출
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (typeof window !== 'undefined') {
      if (response.config.url?.includes('/auth/login') && response.data.success) {
        const { user } = response.data;
        const { login } = useAuthStore.getState();
        login(user);
      }
    }
    return response;
  },
  (error) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();
    }
    return Promise.reject(error);
  }
);

// 타입 완전한 헬퍼 함수들
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res: AxiosResponse<T>) => res.data),

  post: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res: AxiosResponse<T>) => res.data),

  put: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res: AxiosResponse<T>) => res.data),

  patch: <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res: AxiosResponse<T>) => res.data),

  delete: <T = void>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res: AxiosResponse<T>) => res.data),
};
