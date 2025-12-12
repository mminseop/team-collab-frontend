"use client";

import st from "./SettingsDialog.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { AttendanceRecord } from "@/types/settings";

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

export function AttendanceManagementSettings({
  selectedMonth,
  onMonthChange,
}: AttendanceManagementSettingsProps) {
  const mockAttendanceData: AttendanceRecord[] = [
    {
      id: "1",
      userId: "user1",
      userName: "김철수",
      department: "개발팀",
      date: "2024-12-11",
      checkIn: "09:00",
      checkOut: "18:30",
      workHours: "9h 30m",
      status: "퇴근",
    },
    {
      id: "2",
      userId: "user2",
      userName: "이영희",
      department: "디자인팀",
      date: "2024-12-11",
      checkIn: "09:15",
      checkOut: null,
      workHours: "-",
      status: "지각",
    },
  ];

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
          <button className={st.filterBtn}>전체</button>
          <button className={st.filterBtn}>출근</button>
          <button className={st.filterBtn}>지각</button>
          <button className={st.filterBtn}>결근</button>
        </div>
      </div>

      <div className={st.attendanceSummary}>
        <div className={st.summaryCard}>
          <div className={st.summaryIcon}>
            <PeopleIcon />
          </div>
          <div className={st.summaryInfo}>
            <span className={st.summaryLabel}>전체 팀원</span>
            <span className={st.summaryValue}>24명</span>
          </div>
        </div>
        <div className={st.summaryCard}>
          <div className={`${st.summaryIcon} ${st.success}`}>
            <AccessTimeIcon />
          </div>
          <div className={st.summaryInfo}>
            <span className={st.summaryLabel}>출근</span>
            <span className={st.summaryValue}>20명</span>
          </div>
        </div>
        <div className={st.summaryCard}>
          <div className={`${st.summaryIcon} ${st.warning}`}>
            <ScheduleIcon />
          </div>
          <div className={st.summaryInfo}>
            <span className={st.summaryLabel}>지각</span>
            <span className={st.summaryValue}>3명</span>
          </div>
        </div>
        <div className={st.summaryCard}>
          <div className={`${st.summaryIcon} ${st.danger}`}>
            <CloseIcon />
          </div>
          <div className={st.summaryInfo}>
            <span className={st.summaryLabel}>결근</span>
            <span className={st.summaryValue}>1명</span>
          </div>
        </div>
      </div>

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
        {mockAttendanceData.map((record) => (
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
                className={`${st.statusBadge} ${getStatusColor(record.status)}`}
              >
                {record.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}