"use client";

import st from "./dashboard.module.scss";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useChannels } from "@/hooks/useChannels";
import { Channel } from "@/types/channel";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export default function DashboardPage() {
  const { data: userResponse, isLoading: userLoading } = useUser();
  const { data: channelsResponse, isLoading: channelsLoading } = useChannels();

  const user = userResponse?.user;
  const channels: Channel[] = channelsResponse?.data ?? [];

  // 아코디언 열려있는 카테고리 상태
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );

  // 선택된 채널 상태
  const [activeChannel, setActiveChannel] = useState<string>("");

  if (userLoading || channelsLoading) {
    return <div className={st.loading}>로딩중...</div>;
  }

  // -----------------------------
  // 부서별로 채널 배열을 그룹핑하는 로직
  // 예) { "프론트엔드팀": [채널1, 채널5], "백엔드팀": [채널2, 채널6] ... }
  // department_display_name 없으면 "전체 채널" 키로 저장
  // -----------------------------
  const groupedChannels: Record<string, Channel[]> = channels.reduce(
    (acc: Record<string, Channel[]>, channel: Channel) => {
      const key = channel.department_display_name ?? "전체 채널";
      if (!acc[key]) acc[key] = [];
      acc[key].push(channel);
      return acc;
    },
    {}
  );

  // 카테고리 (부서) 열림/닫힘 토글 핸들러
  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !(prev[category] ?? false),
    }));
  };

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
                {/* MUI 화살표 아이콘 */}
                <span className={st.arrow}>
                  {openCategories[deptName] ? (
                    <ArrowDropDownIcon fontSize="small" />
                  ) : (
                    <ArrowRightIcon fontSize="small" />
                  )}
                </span>
                {/* 부서 이름 표시 */}
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
                      channel.name === activeChannel ? st.active : ""
                    }`}
                    onClick={() => setActiveChannel(channel.name)}
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
          <SettingsIcon className={st.settingsIcon} />
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className={st.mainContent}>
        <div className={st.topBar}>
          <div className={st.channelInfo}>
            <span className={st.hashIcon}>#</span>
            <span className={st.channelTitle}>
              {activeChannel || "채널을 선택하세요"}
            </span>
          </div>
        </div>
        <div className={st.contentArea}>
          <div className={st.welcomeSection}>
            <h1>{activeChannel || "채널을 선택하세요"}</h1>
            <p>
              총 <strong>{channels.length}</strong>개 채널 사용 가능
            </p>
            <p>
              선택된 채널: <strong>{activeChannel}</strong>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
