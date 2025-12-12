"use client";

import st from "./SettingsDialog.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import LanguageIcon from "@mui/icons-material/Language";
import PaletteIcon from "@mui/icons-material/Palette";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import TagIcon from "@mui/icons-material/Tag";
import BusinessIcon from "@mui/icons-material/Business";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { MenuKey, MenuItem } from "@/types/settings";

type MenuSidebarProps = {
  activeMenu: MenuKey;
  onMenuChange: (menu: MenuKey) => void;
  onLogout: () => void;
  isAdmin: boolean;
};

const commonMenuItems: MenuItem[] = [
  { key: "account", label: "내 계정", icon: <PersonIcon /> },
  { key: "myAttendance", label: "내 출퇴근", icon: <ScheduleIcon /> },
  { key: "notifications", label: "알림 설정", icon: <NotificationsIcon /> },
  { key: "privacy", label: "개인정보 및 보안", icon: <SecurityIcon /> },
  { key: "appearance", label: "테마 설정", icon: <PaletteIcon /> },
  { key: "language", label: "언어", icon: <LanguageIcon /> },
  { key: "slackbot", label: "SlackBot 연동", icon: <SmartToyIcon /> },
  { key: "integrations", label: "통합 관리", icon: <IntegrationInstructionsIcon /> },
];

const adminMenuItems: MenuItem[] = [
  { key: "members", label: "팀원 관리", icon: <PeopleIcon /> },
  { key: "channels", label: "채널 관리", icon: <TagIcon /> },
  { key: "departments", label: "부서 관리", icon: <BusinessIcon /> },
  { key: "attendance", label: "출퇴근 관리", icon: <AccessTimeIcon /> },
];

export function MenuSidebar({
  activeMenu,
  onMenuChange,
  onLogout,
  isAdmin,
}: MenuSidebarProps) {
  return (
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
                  onClick={() => onMenuChange(item.key)}
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
              onClick={() => onMenuChange(item.key)}
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
  );
}