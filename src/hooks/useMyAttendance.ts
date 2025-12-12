// src/hooks/useMyAttendance.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AttendanceRecord } from "@/types/settings";

interface MyAttendanceResponse {
  data: AttendanceRecord[];
}

interface AttendanceStatsResponse {
  data: {
    workDays: number;
    avgWorkHours: string;
    lateCount: number;
    absentCount: number;
  };
}

export const useMyAttendance = (month: string) => {
  return useQuery({
    queryKey: ["myAttendance", month],
    queryFn: async () => {
      const response = await api.get<MyAttendanceResponse>("/api/attendance/my", {
        params: { month },
      });
      return response.data;
    },
  });
};

export const useMyAttendanceStats = (month: string) => {
  return useQuery({
    queryKey: ["myAttendanceStats", month],
    queryFn: async () => {
      const response = await api.get<AttendanceStatsResponse>("/api/attendance/my/stats", {
        params: { month },
      });
      return response.data;
    },
  });
};
