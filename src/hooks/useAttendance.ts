import { useState } from "react";

export function useAttendance() {
  const [isWorking, setIsWorking] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [workDuration, setWorkDuration] = useState<string>("0h 0m");

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    const start = new Date(`2000-01-01 ${startTime}`);
    const end = new Date(`2000-01-01 ${endTime}`);
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const handleCheckIn = () => {
    const now = new Date();
    const time = formatTime(now);
    setCheckInTime(time);
    setIsWorking(true);
    
    // 실시간 근무시간 업데이트
    const interval = setInterval(() => {
      const currentTime = formatTime(new Date());
      const duration = calculateDuration(time, currentTime);
      setWorkDuration(duration);
    }, 60000); // 1분마다 업데이트

    // api 만들고 연동해야함
    console.log("출근:", time);
    
    return interval;
  };

  const handleCheckOut = (interval?: NodeJS.Timeout) => {
    if (!checkInTime) return null;
    
    const now = new Date();
    const time = formatTime(now);
    const duration = calculateDuration(checkInTime, time);
    
    setIsWorking(false);
    setWorkDuration(duration);
    
    if (interval) {
      clearInterval(interval);
    }

    // api 만들고 연동해야함
    console.log("퇴근:", time, "근무시간:", duration);
    
    return { checkOut: time, workHours: duration };
  };

  return {
    isWorking,
    checkInTime,
    workDuration,
    handleCheckIn,
    handleCheckOut,
  };
}