"use client";

import { useState, useEffect } from "react";
import st from "@/components/common/SettingsDialog.module.scss";
import { useAttendance } from "@/hooks/useAttendance";
import { useMyAttendance, useMyAttendanceStats } from "@/hooks/useMyAttendance";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

type MyAttendanceSettingsProps = {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "출근":
      return st.statusWorking;
    case "퇴근":
      return st.statusLeft;
    case "지각":
      return st.statusLate;
    case "결근":
      return st.statusAbsent;
    default:
      return "";
  }
};

export function MyAttendanceSettings({
  selectedMonth,
  onMonthChange,
}: MyAttendanceSettingsProps) {
  const {
    isWorking,
    checkInTime,
    workDuration,
    handleCheckIn,
    handleCheckOut,
  } = useAttendance();

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(undefined);

  // 출퇴근 기록 조회
  const { data: attendanceData = [], isLoading } = useMyAttendance(selectedMonth);

  // 통계 조회
  const { data: stats } = useMyAttendanceStats(selectedMonth);

  const onCheckIn = () => {
    const interval = handleCheckIn();
    if (interval) {
      setIntervalId(interval);
    }
  };

  const onCheckOut = () => {
    handleCheckOut(intervalId);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(undefined);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <div className={st.contentSection}>
      <h2>내 출퇴근 기록</h2>

      {/* 출퇴근 버튼 영역 */}
      <div className={st.attendanceActions}>
        <div className={st.currentStatus}>
          <div className={st.statusInfo}>
            <h3>오늘 근무 현황</h3>
            {isWorking ? (
              <div className={st.workingInfo}>
                <p className={st.checkInInfo}>
                  <AccessTimeIcon fontSize="small" />
                  출근: <strong>{checkInTime}</strong>
                </p>
                <p className={st.durationInfo}>
                  근무시간: <strong>{workDuration}</strong>
                </p>
              </div>
            ) : checkInTime ? (
              <div className={st.completedInfo}>
                <p>오늘 근무를 완료했습니다.</p>
                <p className={st.durationInfo}>
                  총 근무시간: <strong>{workDuration}</strong>
                </p>
              </div>
            ) : (
              <p className={st.notCheckedIn}>아직 출근하지 않았습니다.</p>
            )}
          </div>
          <div className={st.actionButtons}>
            {!isWorking && !checkInTime && (
              <button className={st.checkInBtn} onClick={onCheckIn}>
                <AccessTimeIcon />
                출근하기
              </button>
            )}
            {isWorking && (
              <button className={st.checkOutBtn} onClick={onCheckOut}>
                <ExitToAppIcon />
                퇴근하기
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 월별 통계 */}
      <div className={st.attendanceHeader}>
        <div className={st.monthSelector}>
          <label>조회 월</label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className={st.monthInput}
          />
        </div>
        {stats && (
          <div className={st.attendanceStats}>
            <div className={st.statCard}>
              <span className={st.statLabel}>이번 달 근무일</span>
              <span className={st.statValue}>{stats.workDays}일</span>
            </div>
            <div className={st.statCard}>
              <span className={st.statLabel}>평균 근무시간</span>
              <span className={st.statValue}>{stats.avgWorkHours}</span>
            </div>
            <div className={st.statCard}>
              <span className={st.statLabel}>지각</span>
              <span
                className={`${st.statValue} ${
                  stats.lateCount > 0 ? st.warning : ""
                }`}
              >
                {stats.lateCount}회
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 출퇴근 기록 테이블 */}
      <div className={st.attendanceTable}>
        <div className={st.tableHeader}>
          <div className={st.tableCell}>날짜</div>
          <div className={st.tableCell}>출근 시간</div>
          <div className={st.tableCell}>퇴근 시간</div>
          <div className={st.tableCell}>근무 시간</div>
          <div className={st.tableCell}>상태</div>
        </div>
        {isLoading ? (
          <div className={st.loadingMessage}>로딩 중...</div>
        ) : attendanceData.length === 0 ? (
          <div className={st.emptyMessage}>출퇴근 기록이 없습니다.</div>
        ) : (
          attendanceData.map((record) => (
            <div key={record.id} className={st.tableRow}>
              <div className={st.tableCell}>
                <span className={st.dateText}>{record.date}</span>
              </div>
              <div className={st.tableCell}>
                <span className={st.timeText}>{record.checkIn}</span>
              </div>
              <div className={st.tableCell}>
                <span className={st.timeText}>{record.checkOut || "-"}</span>
              </div>
              <div className={st.tableCell}>
                <span className={st.hoursText}>{record.workHours}</span>
              </div>
              <div className={st.tableCell}>
                <span
                  className={`${st.statusBadge} ${getStatusColor(
                    record.status
                  )}`}
                >
                  {record.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
