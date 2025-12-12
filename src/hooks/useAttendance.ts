// src/hooks/useAttendance.ts
import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

interface TodayAttendanceResponse {
  data: {
    isWorking: boolean;
    checkIn: string | null;
    checkOut: string | null;
    workHours: string | null;
  };
}

interface CheckInResponse {
  message: string;
  data: {
    checkIn: string;
    date: string;
  };
}

interface CheckOutResponse {
  message: string;
  data: {
    checkOut: string;
    workHours: string;
  };
}

interface ErrorResponse {
  message: string;
}

export const useAttendance = () => {
  const [isWorking, setIsWorking] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [workDuration, setWorkDuration] = useState<string>("0h 0m");

  // 오늘 출퇴근 현황 조회
  const fetchTodayAttendance = useCallback(async () => {
    try {
      const response = await api.get<TodayAttendanceResponse>(
        "/api/attendance/today"
      );
      const { isWorking, checkIn, workHours } = response.data;

      setIsWorking(isWorking);
      setCheckInTime(checkIn);
      setWorkDuration(workHours || "0h 0m");
    } catch (error) {
      console.error("출퇴근 현황 조회 실패:", error);
    }
  }, []);

  // 출근 처리
  const handleCheckIn = useCallback((): NodeJS.Timeout | undefined => {
    api
      .post<CheckInResponse>("/api/attendance/checkin")
      .then((response) => {
        const { checkIn } = response.data;
        setIsWorking(true);
        setCheckInTime(checkIn);
        setWorkDuration("0h 0m");
        alert("출근 처리되었습니다!");

        // 1분마다 근무 시간 업데이트
        const interval = setInterval(() => {
          fetchTodayAttendance();
        }, 60000); // 1분

        return interval;
      })
      .catch((error: unknown) => {
        const axiosError = error as AxiosError<ErrorResponse>;
        alert(axiosError.response?.data?.message || "출근 처리 실패");
      });

    return undefined;
  }, [fetchTodayAttendance]);

  // 퇴근 처리
  const handleCheckOut = useCallback(
    (intervalId?: NodeJS.Timeout) => {
      api
        .post<CheckOutResponse>("/api/attendance/checkout")
        .then((response) => {
          const { workHours } = response.data;
          setIsWorking(false);
          setWorkDuration(workHours);
          alert("퇴근 처리되었습니다!");

          if (intervalId) {
            clearInterval(intervalId);
          }
        })
        .catch((error: unknown) => {
          const axiosError = error as AxiosError<ErrorResponse>;
          alert(axiosError.response?.data?.message || "퇴근 처리 실패");
        });
    },
    []
  );

  // 초기 로드
  useEffect(() => {
    fetchTodayAttendance();
  }, [fetchTodayAttendance]);

  return {
    isWorking,
    checkInTime,
    workDuration,
    handleCheckIn,
    handleCheckOut,
    refetch: fetchTodayAttendance,
  };
};
