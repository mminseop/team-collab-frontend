"use client";

import st from "./dashboard.module.scss";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useChannels } from "@/hooks/useChannels";
import { Channel, GroupedChannels } from "@/types/channel";
import SettingsIcon from "@mui/icons-material/Settings";

export default function DashboardPage() {
  const { data: user, isLoading: userLoading } = useUser();
  const { data: channels = [], isLoading: channelsLoading } = useChannels();

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {}
  );
  const [activeChannel, setActiveChannel] = useState<string>("");

  // 로딩 상태
  if (userLoading || channelsLoading) {
    return <div className={st.loading}>로딩중...</div>;
  }

  // 채널 부서별 그룹핑
  const groupedChannels: GroupedChannels = channels.reduce(
    (acc: GroupedChannels, channel: Channel) => {
      const key = channel.department_id ?? "전체";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(channel);
      return acc;
    },
    {} as GroupedChannels
  );

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !(prev[category] ?? false),
    }));
  };

  return (
    <div className={st.container}>
      <aside className={st.sidebar}>
        <div className={st.serverHeader}>TeamCollab</div>

        <div className={st.channelList}>
          {Object.entries(groupedChannels).map(([deptKey, deptChannels]) => (
            <div key={deptKey} className={st.channelCategory}>
              <div
                className={st.categoryHeader}
                onClick={() => toggleCategory(deptKey)}
              >
                <span
                  className={`${st.arrow} ${
                    openCategories[deptKey] ?? false ? st.open : ""
                  }`}
                >
                  ▶
                </span>
                <span className={st.categoryTitle}>
                  {deptKey === "전체" ? "전체 채널" : `${deptKey} 부서`}
                </span>
              </div>
              <div
                className={`${st.categoryChannels} ${
                  openCategories[deptKey] ?? false ? st.open : ""
                }`}
              >
                {deptChannels.map((channel: Channel) => (
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

        <div className={st.userSection}>
          <div className={st.userAvatar}>{user?.name?.[0] || "U"}</div>
          <div className={st.userInfo}>
            <div className={st.userName}>{user?.name || "로딩중..."}</div>
            <div className={st.userStatus}>온라인</div>
          </div>
          <SettingsIcon className={st.settingsIcon} />
        </div>
      </aside>

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
