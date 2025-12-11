"use client";

import { Dialog } from "@mui/material";
import st from "./SettingsDialog.module.scss";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import LanguageIcon from "@mui/icons-material/Language";
import PaletteIcon from "@mui/icons-material/Palette";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import TagIcon from "@mui/icons-material/Tag";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { AddMemberModal } from "./AddMemberModal";
import { Department, useDepartments } from "@/hooks/useDepartments";
import { useAddUser } from "@/hooks/useAddUser";

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  userRole?: string;
};

type MenuKey =
  | "account"
  | "notifications"
  | "privacy"
  | "appearance"
  | "language"
  | "slackbot"
  | "integrations"
  | "members"
  | "channels"
  | "departments"
  | "attendance"
  | "myAttendance";

type AddMemberData = {
  email: string;
  name: string;
  password: string;
  departmentId: string;
  role: string;
};

// 임시 출퇴근 데이터 타입
type AttendanceRecord = {
  id: string;
  userId: string;
  userName: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  workHours: string;
  status: "출근" | "지각" | "결근" | "퇴근";
};

export function SettingsDialog({
  open,
  onClose,
  onLogout,
  userRole,
}: SettingsDialogProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("account");
  const [selectedMonth, setSelectedMonth] = useState<string>("2024-12");
  const isAdmin = userRole === "ADMIN";

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const { data: departmentsResponse } = useDepartments();
  const departments: Department[] = departmentsResponse?.data ?? [];

  const addUserMutation = useAddUser();

  const handleAddMember = (data: AddMemberData) => {
    addUserMutation.mutate(data, {
      onSuccess: () => {
        alert("팀원이 성공적으로 추가되었습니다!");
        setIsAddMemberOpen(false);
      },
      onError: (error) => {
        const errorMessage = error || "팀원 추가에 실패했습니다.";
        alert(errorMessage);
      },
    });
  };

  // 임시 출퇴근 데이터 (실제로는 API에서 가져와야 함)
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
    {
      id: "3",
      userId: "user3",
      userName: "박민수",
      department: "기획팀",
      date: "2024-12-11",
      checkIn: "08:50",
      checkOut: "18:00",
      workHours: "9h 10m",
      status: "퇴근",
    },
  ];

  // 내 출퇴근 기록 (임시 데이터)
  const myAttendanceData: AttendanceRecord[] = [
    {
      id: "1",
      userId: "currentUser",
      userName: "홍길동",
      department: "개발팀",
      date: "2024-12-11",
      checkIn: "09:00",
      checkOut: "18:30",
      workHours: "9h 30m",
      status: "퇴근",
    },
    {
      id: "2",
      userId: "currentUser",
      userName: "홍길동",
      department: "개발팀",
      date: "2024-12-10",
      checkIn: "09:05",
      checkOut: "18:20",
      workHours: "9h 15m",
      status: "퇴근",
    },
    {
      id: "3",
      userId: "currentUser",
      userName: "홍길동",
      department: "개발팀",
      date: "2024-12-09",
      checkIn: "09:00",
      checkOut: "18:00",
      workHours: "9h 0m",
      status: "퇴근",
    },
  ];

  const commonMenuItems = [
    { key: "account" as MenuKey, label: "내 계정", icon: <PersonIcon /> },
    {
      key: "myAttendance" as MenuKey,
      label: "내 출퇴근",
      icon: <ScheduleIcon />,
    },
    {
      key: "notifications" as MenuKey,
      label: "알림 설정",
      icon: <NotificationsIcon />,
    },
    {
      key: "privacy" as MenuKey,
      label: "개인정보 및 보안",
      icon: <SecurityIcon />,
    },
    { key: "appearance" as MenuKey, label: "테마 설정", icon: <PaletteIcon /> },
    { key: "language" as MenuKey, label: "언어", icon: <LanguageIcon /> },
    {
      key: "slackbot" as MenuKey,
      label: "SlackBot 연동",
      icon: <SmartToyIcon />,
    },
    {
      key: "integrations" as MenuKey,
      label: "통합 관리",
      icon: <IntegrationInstructionsIcon />,
    },
  ];

  const adminMenuItems = [
    { key: "members" as MenuKey, label: "팀원 관리", icon: <PeopleIcon /> },
    { key: "channels" as MenuKey, label: "채널 관리", icon: <TagIcon /> },
    {
      key: "departments" as MenuKey,
      label: "부서 관리",
      icon: <BusinessIcon />,
    },
    {
      key: "attendance" as MenuKey,
      label: "출퇴근 관리",
      icon: <AccessTimeIcon />,
    },
  ];

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

  const renderContent = () => {
    switch (activeMenu) {
      case "account":
        return (
          <div className={st.contentSection}>
            <h2>내 계정</h2>
            <div className={st.formGroup}>
              <label>이메일</label>
              <input type="email" placeholder="email@example.com" />
            </div>
            <div className={st.formGroup}>
              <label>이름</label>
              <input type="text" placeholder="이름을 입력하세요" />
            </div>
            <div className={st.formGroup}>
              <label>부서</label>
              <input type="text" placeholder="부서명" disabled />
            </div>
            <button className={st.saveBtn}>변경사항 저장</button>
          </div>
        );

      case "myAttendance":
        return (
          <div className={st.contentSection}>
            <h2>내 출퇴근 기록</h2>
            <div className={st.attendanceHeader}>
              <div className={st.monthSelector}>
                <label>조회 월</label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className={st.monthInput}
                />
              </div>
              <div className={st.attendanceStats}>
                <div className={st.statCard}>
                  <span className={st.statLabel}>이번 달 근무일</span>
                  <span className={st.statValue}>20일</span>
                </div>
                <div className={st.statCard}>
                  <span className={st.statLabel}>평균 근무시간</span>
                  <span className={st.statValue}>9h 15m</span>
                </div>
                <div className={st.statCard}>
                  <span className={st.statLabel}>지각</span>
                  <span className={`${st.statValue} ${st.warning}`}>2회</span>
                </div>
              </div>
            </div>

            <div className={st.attendanceTable}>
              <div className={st.tableHeader}>
                <div className={st.tableCell}>날짜</div>
                <div className={st.tableCell}>출근 시간</div>
                <div className={st.tableCell}>퇴근 시간</div>
                <div className={st.tableCell}>근무 시간</div>
                <div className={st.tableCell}>상태</div>
              </div>
              {myAttendanceData.map((record) => (
                <div key={record.id} className={st.tableRow}>
                  <div className={st.tableCell}>
                    <span className={st.dateText}>{record.date}</span>
                  </div>
                  <div className={st.tableCell}>
                    <span className={st.timeText}>{record.checkIn}</span>
                  </div>
                  <div className={st.tableCell}>
                    <span className={st.timeText}>
                      {record.checkOut || "-"}
                    </span>
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
              ))}
            </div>
          </div>
        );

      case "attendance":
        return (
          <div className={st.contentSection}>
            <h2>출퇴근 관리</h2>
            <div className={st.attendanceHeader}>
              <div className={st.monthSelector}>
                <label>조회 월</label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
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
                    <span className={st.departmentBadge}>
                      {record.department}
                    </span>
                  </div>
                  <div className={st.tableCell}>
                    <span className={st.dateText}>{record.date}</span>
                  </div>
                  <div className={st.tableCell}>
                    <span className={st.timeText}>{record.checkIn}</span>
                  </div>
                  <div className={st.tableCell}>
                    <span className={st.timeText}>
                      {record.checkOut || "-"}
                    </span>
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
              ))}
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className={st.contentSection}>
            <h2>알림 설정</h2>
            <div className={st.settingItem}>
              <div className={st.settingInfo}>
                <h3>멘션 알림</h3>
                <p>나를 멘션한 메시지만 알림받기</p>
              </div>
              <label className={st.switch}>
                <input type="checkbox" />
                <span className={st.slider}></span>
              </label>
            </div>
            <div className={st.settingItem}>
              <div className={st.settingInfo}>
                <h3>이메일 알림</h3>
                <p>중요한 업데이트를 이메일로 받습니다</p>
              </div>
              <label className={st.switch}>
                <input type="checkbox" defaultChecked />
                <span className={st.slider}></span>
              </label>
            </div>
            <div className={st.settingItem}>
              <div className={st.settingInfo}>
                <h3>알림음</h3>
                <p>새 메시지 알림음 재생</p>
              </div>
              <label className={st.switch}>
                <input type="checkbox" defaultChecked />
                <span className={st.slider}></span>
              </label>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className={st.contentSection}>
            <h2>개인정보 및 보안</h2>
            <div className={st.formGroup}>
              <label>비밀번호 변경</label>
              <input type="password" placeholder="현재 비밀번호" />
              <input type="password" placeholder="새 비밀번호" />
              <input type="password" placeholder="비밀번호 확인" />
              <button className={st.saveBtn}>비밀번호 변경</button>
            </div>
            <div className={st.settingItem}>
              <div className={st.settingInfo}>
                <h3>2단계 인증</h3>
                <p>계정 보안을 강화합니다</p>
              </div>
              <button className={st.actionBtn}>설정하기</button>
            </div>
            <div className={st.settingItem}>
              <div className={st.settingInfo}>
                <h3>활동 기록</h3>
                <p>내 로그인 기록 확인</p>
              </div>
              <button className={st.actionBtn}>보기</button>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className={st.contentSection}>
            <h2>테마 설정</h2>
            <div className={st.themeOptions}>
              <div className={st.themeCard}>
                <div className={`${st.themePreview} ${st.dark}`}></div>
                <span>다크 모드</span>
              </div>
              <div className={st.themeCard}>
                <div className={`${st.themePreview} ${st.light}`}></div>
                <span>라이트 모드</span>
              </div>
              <div className={st.themeCard}>
                <div className={`${st.themePreview} ${st.auto}`}></div>
                <span>자동</span>
              </div>
            </div>
            <div className={st.settingItem}>
              <div className={st.settingInfo}>
                <h3>메시지 표시 밀도</h3>
                <p>메시지 간격 조정</p>
              </div>
              <select className={st.select}>
                <option>편안함</option>
                <option>보통</option>
                <option>좁게</option>
              </select>
            </div>
          </div>
        );

      case "language":
        return (
          <div className={st.contentSection}>
            <h2>언어</h2>
            <div className={st.formGroup}>
              <label>표시 언어</label>
              <select className={st.select}>
                <option>한국어</option>
                <option>English</option>
                <option>日本語</option>
              </select>
            </div>
            <div className={st.settingItem}>
              <div className={st.settingInfo}>
                <h3>자동 번역</h3>
                <p>다른 언어로 작성된 메시지 자동 번역</p>
              </div>
              <label className={st.switch}>
                <input type="checkbox" />
                <span className={st.slider}></span>
              </label>
            </div>
          </div>
        );

      case "slackbot":
        return (
          <div className={st.contentSection}>
            <h2>SlackBot 연동</h2>
            <div className={st.integrationCard}>
              <div className={st.integrationHeader}>
                <SmartToyIcon fontSize="large" />
                <div>
                  <h3>SlackBot</h3>
                  <p>Slack과 실시간 동기화</p>
                </div>
              </div>
              <button className={st.connectBtn}>연동하기</button>
            </div>
            <div className={st.settingItem}>
              <div className={st.settingInfo}>
                <h3>자동 동기화</h3>
                <p>Slack 메시지 자동으로 가져오기</p>
              </div>
              <label className={st.switch}>
                <input type="checkbox" />
                <span className={st.slider}></span>
              </label>
            </div>
            <div className={st.settingItem}>
              <div className={st.settingInfo}>
                <h3>양방향 메시지</h3>
                <p>TeamCollab에서 작성한 메시지를 Slack으로 전송</p>
              </div>
              <label className={st.switch}>
                <input type="checkbox" />
                <span className={st.slider}></span>
              </label>
            </div>
          </div>
        );

      case "integrations":
        return (
          <div className={st.contentSection}>
            <h2>통합 관리</h2>
            <div className={st.integrationsList}>
              <div className={st.integrationCard}>
                <div className={st.integrationHeader}>
                  <div className={st.integrationIcon}>
                    <EmailIcon fontSize="medium" color="primary" />
                  </div>
                  <div>
                    <h3>Google Workspace</h3>
                    <p>Gmail, Drive, Calendar 연동</p>
                  </div>
                </div>
                <button className={st.connectBtn}>연동하기</button>
              </div>
              <div className={st.integrationCard}>
                <div className={st.integrationHeader}>
                  <div className={st.integrationIcon}>
                    <WidgetsIcon fontSize="medium" color="primary" />
                  </div>
                  <div>
                    <h3>Jira</h3>
                    <p>프로젝트 관리 도구 연동</p>
                  </div>
                </div>
                <button className={st.connectBtn}>연동하기</button>
              </div>
              <div className={st.integrationCard}>
                <div className={st.integrationHeader}>
                  <div className={st.integrationIcon}>
                    <ArticleIcon fontSize="medium" color="primary" />
                  </div>
                  <div>
                    <h3>Notion</h3>
                    <p>문서 및 위키 연동</p>
                  </div>
                </div>
                <button className={st.connectBtn}>연동하기</button>
              </div>
            </div>
          </div>
        );

      case "members":
        return (
          <>
            <div className={st.contentSection}>
              <h2>팀원 관리</h2>
              <div className={st.adminHeader}>
                <button
                  className={st.addBtn}
                  onClick={() => setIsAddMemberOpen(true)}
                >
                  <PeopleIcon fontSize="small" />
                  팀원 초대
                </button>
              </div>
              <div className={st.membersList}>
                <p className={st.placeholder}>팀원 목록이 여기에 표시됩니다.</p>
              </div>
            </div>

            <AddMemberModal
              open={isAddMemberOpen}
              onClose={() => setIsAddMemberOpen(false)}
              onAddMember={handleAddMember}
              departments={departments}
            />
          </>
        );

      case "channels":
        return (
          <div className={st.contentSection}>
            <h2>채널 관리</h2>
            <div className={st.adminHeader}>
              <button className={st.addBtn}>
                <TagIcon fontSize="small" />
                채널 추가
              </button>
            </div>
            <div className={st.channelsList}>
              <p className={st.placeholder}>채널 목록이 여기에 표시됩니다.</p>
            </div>
          </div>
        );

      case "departments":
        return (
          <div className={st.contentSection}>
            <h2>부서 관리</h2>
            <div className={st.adminHeader}>
              <button className={st.addBtn}>
                <BusinessIcon fontSize="small" />
                부서 추가
              </button>
            </div>
            <div className={st.departmentsList}>
              <p className={st.placeholder}>부서 목록이 여기에 표시됩니다.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{ className: st.dialogPaper }}
    >
      <div className={st.settingsContainer}>
        <div className={st.sidebar}>
          <div className={st.sidebarContent}>
            <nav className={st.menuList}>
              {isAdmin && (
                <>
                  <div className={st.menuSectionTitle}>관리자 메뉴</div>
                  {adminMenuItems.map((item) => (
                    <button
                      key={item.key}
                      className={`${st.menuItem} ${
                        activeMenu === item.key ? st.active : ""
                      }`}
                      onClick={() => setActiveMenu(item.key)}
                    >
                      <span className={st.menuIcon}>{item.icon}</span>
                      <span className={st.menuLabel}>{item.label}</span>
                    </button>
                  ))}
                  <div className={st.menuSectionDivider} />
                </>
              )}

              {commonMenuItems.map((item) => (
                <button
                  key={item.key}
                  className={`${st.menuItem} ${
                    activeMenu === item.key ? st.active : ""
                  }`}
                  onClick={() => setActiveMenu(item.key)}
                >
                  <span className={st.menuIcon}>{item.icon}</span>
                  <span className={st.menuLabel}>{item.label}</span>
                </button>
              ))}
            </nav>
            <div className={st.sidebarFooter}>
              <button className={st.logoutBtn} onClick={onLogout}>
                <LogoutIcon />
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        </div>

        <div className={st.content}>
          <button className={st.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
          {renderContent()}
        </div>
      </div>
    </Dialog>
  );
}