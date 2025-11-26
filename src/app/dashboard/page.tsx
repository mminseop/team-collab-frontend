"use client";

import st from "./dashboard.module.scss";
import { Typography, Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

export default function DashboardPage() {
  return (
    <div className={st.container}>
      <aside className={st.sidebar}>
        <Typography variant="h6" style={{ marginBottom: 24 }}>
          관리자 패널
        </Typography>

        <div className={st.sidebarItem}>
          <DashboardIcon /> 대시보드
        </div>
        <div className={st.sidebarItem}>
          <PeopleIcon /> 사용자 관리
        </div>
        <div className={st.sidebarItem}>
          <BarChartIcon /> 통계
        </div>
        <div className={st.sidebarItem}>
          <SettingsIcon /> 설정
        </div>
      </aside>

      <main style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <header className={st.header}>TeamCollab</header>

        <div className={st.content}>
          <div className={st.card}>
            <Button variant="outlined" sx={{ mt: 1 }}>
              새 알림 확인
            </Button>
          </div>

          <div className={st.card}>
           sadadsasd
          </div>
        </div>
      </main>
    </div>
  );
}
