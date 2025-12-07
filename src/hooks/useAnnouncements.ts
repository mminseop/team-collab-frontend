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

interface AnnouncementResponse {
  success: boolean;
  data: Announcement[];
}

interface CreateAnnouncementResponse {
  success: boolean;
  data: Announcement;
}

interface DeleteAnnouncementResponse {
  success: boolean;
  message: string;
}

// 공지사항 목록 조회
export const useAnnouncements = (channelId?: number) => {
  return useQuery({
    queryKey: ["announcements", channelId],
    queryFn: async (): Promise<AnnouncementResponse> => {
      const params = channelId ? { channel_id: channelId } : {};
      const response: AxiosResponse<AnnouncementResponse> = await api.get(
        "/api/announcements",
        { params }
      );
      return response.data;
    },
    refetchInterval: 30000, // 30초마다 자동 새로고침 (일단 임시)
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
      // 모든 공지사항 쿼리 무효화
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