import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { AttendanceRecord } from "@/types/settings";

interface AllAttendanceResponse {
  data: AttendanceRecord[];
}

interface AllAttendanceStatsResponse {
  data: {
    totalUsers: number;
    present: number;
    late: number;
    absent: number;
  };
}

export const useAllAttendance = (month: string, status: string = "all") => {
  return useQuery({
    queryKey: ["allAttendance", month, status],
    queryFn: async () => {
      const response = await api.get<AllAttendanceResponse>("/api/attendance/all", {
        params: { month, status: status !== "all" ? status : undefined },
      });
      return response.data;
    },
  });
};

export const useAllAttendanceStats = (month: string) => {
  return useQuery({
    queryKey: ["allAttendanceStats", month],
    queryFn: async () => {
      const response = await api.get<AllAttendanceStatsResponse>(
        "/api/attendance/all/stats",
        { params: { month } }
      );
      return response.data;
    },
  });
};
