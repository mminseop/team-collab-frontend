"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Channel } from "@/types/channel";

interface ChannelsResponse {
  success: boolean;
  data: Channel[];
  count: number;
  filters: {
    role: string;
    departmentId: number | null;
  };
}

export function useChannels() {
  return useQuery<ChannelsResponse>({
    queryKey: ["channels"],
    queryFn: () => api.get<ChannelsResponse>("/api/channels"),
    staleTime: 5 * 60 * 1000,
  });
}
