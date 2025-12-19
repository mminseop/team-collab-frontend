"use client";

import st from "./dashboard.module.scss";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useChannels } from "@/hooks/useChannels";
import { Channel } from "@/types/channel";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SettingsDialog } from "@/components/common/SettingsDialog";
import { useLogout } from "@/hooks/useLogout";
import { AnnouncementPanel } from "@/components/announcements/AnnouncementPanel";
import { TeamTasksPanel } from "@/components/tasks/TeamTasksPanel";

export default function DashboardPage() {
  const {
    data: userResponse,
    isLoading: userLoading,
    error: userError,
  } = useUser();
  const { data: channelsResponse, isLoading: channelsLoading } = useChannels();
  const logoutMutation = useLogout();

  const user = userResponse?.user;
  const channels: Channel[] = channelsResponse?.data ?? [];

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // 아코디언 열려있는 카테고리 상태
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  // 선택된 채널 상태
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  // 보호 라우팅: user 없거나 에러 시 로그인 페이지로
  useEffect(() => {
    if (logoutMutation.isPending || userError || (!userLoading && !user)) {
      window.location.href = "/";
    }
  }, [userError, userLoading, user, logoutMutation.isPending]);

  // 로딩 중
  if (userLoading || channelsLoading) {
    return <div className={st.loading}>로딩중...</div>;
  }

  // user 없음
  if (!user) {
    window.location.href = "/";
    return null;
  }

  // 부서별로 채널 배열을 그룹핑
  const groupedChannels: Record<string, Channel[]> = channels.reduce(
    (acc: Record<string, Channel[]>, channel: Channel) => {
      const key = channel.department_display_name ?? "전체 채널";
      if (!acc[key]) acc[key] = [];
      acc[key].push(channel);
      return acc;
    },
    {}
  );

  // 카테고리 열림/닫힘 토글
  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !(prev[category] ?? false),
    }));
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // 선택된 채널이 tasks-all인지 확인
  const isTasksAllChannel = activeChannel?.name === "tasks-all";

  return (
    <div className={st.container}>
      {/* 사이드바 */}
      <aside className={st.sidebar}>
        <div className={st.serverHeader}>TeamCollab</div>
        <div className={st.channelList}>
          {Object.entries(groupedChannels).map(([deptName, deptChannels]) => (
            <div key={deptName} className={st.channelCategory}>
              <div
                className={st.categoryHeader}
                onClick={() => toggleCategory(deptName)}
              >
                <span className={st.arrow}>
                  {openCategories[deptName] ? (
                    <ArrowDropDownIcon fontSize="small" />
                  ) : (
                    <ArrowRightIcon fontSize="small" />
                  )}
                </span>
                <span className={st.categoryTitle}>{deptName}</span>
              </div>
              <div
                className={`${st.categoryChannels} ${
                  openCategories[deptName] ? st.open : ""
                }`}
              >
                {deptChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className={`${st.channelItem} ${
                      channel.id === activeChannel?.id ? st.active : ""
                    }`}
                    onClick={() => setActiveChannel(channel)}
                  >
                    <span className={st.channelName}>
                      {channel.display_name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 유저 정보 섹션 */}
        <div className={st.userSection}>
          <div className={st.userAvatar}>{user?.name?.[0] || "U"}</div>
          <div className={st.userInfo}>
            <div className={st.userName}>{user?.name || "로딩중..."}</div>
            <div className={st.userStatus}>온라인</div>
          </div>
          <SettingsIcon
            className={st.settingsIcon}
            onClick={() => setIsSettingsOpen(true)}
          />
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className={st.mainContent}>
        <div className={st.topBar}>
          <div className={st.channelInfo}>
            <span className={st.hashIcon}>#</span>
            <span className={st.channelTitle}>
              {activeChannel?.display_name || "채널을 선택하세요"}
            </span>
          </div>
        </div>

        <div className={st.contentArea}>
          {activeChannel ? (
            isTasksAllChannel ? (
              // tasks-all 채널이면 TeamTasksPanel 렌더링
              <TeamTasksPanel userRole={user.role} />
            ) : (
              // 그 외 채널이면 AnnouncementPanel 렌더링
              <AnnouncementPanel
                channelId={activeChannel.id}
                userRole={user.role}
                userId={user.id}
              />
            )
          ) : (
            <div className={st.welcomeSection}>
              <h1>채널을 선택하세요</h1>
              <p>
                총 <strong>{channels.length}</strong>개 채널 사용 가능
              </p>
            </div>
          )}
        </div>
      </main>

      {/* 설정 모달 */}
      <SettingsDialog
        open={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onLogout={handleLogout}
        userRole={user?.role}
      />
    </div>
  );
}