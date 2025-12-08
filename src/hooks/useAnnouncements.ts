import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AxiosResponse } from "axios";

export interface Announcement {
  id: number;
  content: string;
  created_at: string;
  channel_id: number | null;
  author_id: number;
  author_name: string;
  author_role: string;
}

interface CreateAnnouncementData {
  content: string;
  channel_id?: number;
}

interface CreateAnnouncementResponse {
  success: boolean;
  data: Announcement;
}

interface DeleteAnnouncementResponse {
  success: boolean;
  message: string;
}

// 공지사항 목록 조회 (배열 직접 반환)
export const useAnnouncements = (channelId?: number) => {
  return useQuery({
    queryKey: ["announcements", channelId],
    queryFn: async (): Promise<Announcement[]> => {  // 배열 타입
      const params = channelId ? { channel_id: channelId } : {};
      const response: AxiosResponse = await api.get(
        "/api/announcements",
        { params }
      );
      
      // 배열이면 그대로 반환
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      // 객체면 data 프로퍼티 반환
      if (response.data?.data) {
        return response.data.data;
      }
      
      // 둘 다 아니면 빈 배열
      return [];
    },
    refetchInterval: 30000,
  });
};

// 공지사항 작성
export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      announcementData: CreateAnnouncementData
    ): Promise<CreateAnnouncementResponse> => {
      const response: AxiosResponse<CreateAnnouncementResponse> =
        await api.post("/api/announcements", announcementData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

// 공지사항 삭제
export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      announcementId: number
    ): Promise<DeleteAnnouncementResponse> => {
      const response: AxiosResponse<DeleteAnnouncementResponse> =
        await api.delete(`/api/announcements/${announcementId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};
