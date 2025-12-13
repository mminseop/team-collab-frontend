"use client";

import { useState } from "react";
import st from "@/components/common/SettingsDialog.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { useAllAttendance, useAllAttendanceStats } from "@/hooks/useAllAttendance";

type AttendanceManagementSettingsProps = {
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

// 날짜 포맷 함수
const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[date.getDay()];
  return `${month}월 ${day}일 (${weekday})`;
};

export function AttendanceManagementSettings({
  selectedMonth,
  onMonthChange,
}: AttendanceManagementSettingsProps) {
  // 상태 필터
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // api 훅
  const { data: attendanceData = [], isLoading } = useAllAttendance(
    selectedMonth,
    selectedStatus
  );
  const { data: stats } = useAllAttendanceStats(selectedMonth);

  // 필터 버튼 핸들러
  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
  };

  return (
    <div className={st.contentSection}>
      <h2>출퇴근 관리</h2>
      
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
        <div className={st.filterButtons}>
          <button
            className={`${st.filterBtn} ${
              selectedStatus === "all" ? st.active : ""
            }`}
            onClick={() => handleStatusFilter("all")}
          >
            전체
          </button>
          <button
            className={`${st.filterBtn} ${
              selectedStatus === "present" ? st.active : ""
            }`}
            onClick={() => handleStatusFilter("present")}
          >
            출근
          </button>
          <button
            className={`${st.filterBtn} ${
              selectedStatus === "late" ? st.active : ""
            }`}
            onClick={() => handleStatusFilter("late")}
          >
            지각
          </button>
          <button
            className={`${st.filterBtn} ${
              selectedStatus === "absent" ? st.active : ""
            }`}
            onClick={() => handleStatusFilter("absent")}
          >
            결근
          </button>
        </div>
      </div>

      {/* 통계 카드 (API 데이터) */}
      <div className={st.attendanceSummary}>
        <div className={st.summaryCard}>
          <div className={st.summaryIcon}>
            <PeopleIcon />
          </div>
          <div className={st.summaryInfo}>
            <span className={st.summaryLabel}>전체 팀원</span>
            <span className={st.summaryValue}>
              {stats?.totalUsers || 0}명
            </span>
          </div>
        </div>
        <div className={st.summaryCard}>
          <div className={`${st.summaryIcon} ${st.success}`}>
            <AccessTimeIcon />
          </div>
          <div className={st.summaryInfo}>
            <span className={st.summaryLabel}>출근</span>
            <span className={st.summaryValue}>
              {stats?.present || 0}명
            </span>
          </div>
        </div>
        <div className={st.summaryCard}>
          <div className={`${st.summaryIcon} ${st.warning}`}>
            <ScheduleIcon />
          </div>
          <div className={st.summaryInfo}>
            <span className={st.summaryLabel}>지각</span>
            <span className={st.summaryValue}>
              {stats?.late || 0}명
            </span>
          </div>
        </div>
        <div className={st.summaryCard}>
          <div className={`${st.summaryIcon} ${st.danger}`}>
            <CloseIcon />
          </div>
          <div className={st.summaryInfo}>
            <span className={st.summaryLabel}>결근</span>
            <span className={st.summaryValue}>
              {stats?.absent || 0}명
            </span>
          </div>
        </div>
      </div>

      {/* 출퇴근 기록 테이블 (API 데이터) */}
      <div className={st.attendanceTable}>
        <div className={st.tableHeader}>
          <div className={st.tableCell}>이름</div>
          <div className={st.tableCell}>부서</div>
          <div className={st.tableCell}>날짜</div>
          <div className={st.tableCell}>출근 시간</div>
          <div className={st.tableCell}>퇴근 시간</div>
          <div className={st.tableCell}>근무 시간</div>
          <div className={st.tableCell}>상태</div>
        </div>
        
        {/* 로딩 상태 */}
        {isLoading ? (
          <div className={st.loadingMessage}>로딩 중...</div>
        ) : attendanceData.length === 0 ? (
          <div className={st.emptyMessage}>출퇴근 기록이 없습니다.</div>
        ) : (
          attendanceData.map((record) => (
            <div key={record.id} className={st.tableRow}>
              <div className={st.tableCell}>
                <div className={st.userInfo}>
                  <div className={st.userAvatar}>
                    {record.userName.charAt(0)}
                  </div>
                  <span>{record.userName}</span>
                </div>
              </div>
              <div className={st.tableCell}>
                <span className={st.departmentBadge}>{record.department}</span>
              </div>
              <div className={st.tableCell}>
                <span className={st.dateText}>
                  {formatDisplayDate(record.date)}
                </span>
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
