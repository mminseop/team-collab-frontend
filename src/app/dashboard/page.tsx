"use client";
import st from "./dashboard.module.scss";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import TagIcon from "@mui/icons-material/Tag";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import BrushIcon from "@mui/icons-material/Brush";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

// 타입 정의
type CategoryKey = "channels" | "frontend" | "backend" | "planning" | "design";

interface CategoryState {
  channels: boolean;
  frontend: boolean;
  backend: boolean;
  planning: boolean;
  design: boolean;
}

export default function DashboardPage() {
  const [openCategories, setOpenCategories] = useState<CategoryState>({
    channels: true,
    frontend: true,
    backend: true,
    planning: true,
    design: true,
  });

  const [activeChannel, setActiveChannel] = useState<string>("전체");

  const toggleCategory = (category: CategoryKey) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className={st.container}>
      {/* 사이드바 */}
      <aside className={st.sidebar}>
        <div className={st.serverHeader}>TeamCollab</div>

        <div className={st.channelList}>
          {/* 전체 채널 */}
          <div className={st.channelCategory}>
            <div
              className={st.categoryHeader}
              onClick={() => toggleCategory("channels")}
            >
              <span
                className={`${st.arrow} ${
                  openCategories.channels ? st.open : ""
                }`}
              >
                ▶
              </span>
              <span className={st.categoryTitle}>전체 채널</span>
            </div>
            <div
              className={`${st.categoryChannels} ${
                openCategories.channels ? st.open : ""
              }`}
            >
              <div
                className={`${st.channelItem} ${
                  activeChannel === "전체" ? st.active : ""
                }`}
                onClick={() => setActiveChannel("전체")}
              >
                <TagIcon className={st.channelIcon} />
                <span className={st.channelName}>전체</span>
              </div>
              <div
                className={`${st.channelItem} ${
                  activeChannel === "공지사항" ? st.active : ""
                }`}
                onClick={() => setActiveChannel("공지사항")}
              >
                <DashboardIcon className={st.channelIcon} />
                <span className={st.channelName}>공지사항</span>
              </div>
            </div>
          </div>

          {/* 프론트엔드 */}
          <div className={st.channelCategory}>
            <div
              className={st.categoryHeader}
              onClick={() => toggleCategory("frontend")}
            >
              <span
                className={`${st.arrow} ${
                  openCategories.frontend ? st.open : ""
                }`}
              >
                ▶
              </span>
              <span className={st.categoryTitle}>프론트엔드</span>
            </div>
            <div
              className={`${st.categoryChannels} ${
                openCategories.frontend ? st.open : ""
              }`}
            >
              <div
                className={`${st.channelItem} ${
                  activeChannel === "프론트-일반" ? st.active : ""
                }`}
                onClick={() => setActiveChannel("프론트-일반")}
              >
                <CodeIcon className={st.channelIcon} />
                <span className={st.channelName}>일반</span>
              </div>
              <div
                className={`${st.channelItem} ${
                  activeChannel === "프론트-코드리뷰" ? st.active : ""
                }`}
                onClick={() => setActiveChannel("프론트-코드리뷰")}
              >
                <CodeIcon className={st.channelIcon} />
                <span className={st.channelName}>코드리뷰</span>
              </div>
            </div>
          </div>

          {/* 백엔드 */}
          <div className={st.channelCategory}>
            <div
              className={st.categoryHeader}
              onClick={() => toggleCategory("backend")}
            >
              <span
                className={`${st.arrow} ${
                  openCategories.backend ? st.open : ""
                }`}
              >
                ▶
              </span>
              <span className={st.categoryTitle}>백엔드</span>
            </div>
            <div
              className={`${st.categoryChannels} ${
                openCategories.backend ? st.open : ""
              }`}
            >
              <div
                className={`${st.channelItem} ${
                  activeChannel === "백엔드-일반" ? st.active : ""
                }`}
                onClick={() => setActiveChannel("백엔드-일반")}
              >
                <StorageIcon className={st.channelIcon} />
                <span className={st.channelName}>일반</span>
              </div>
              <div
                className={`${st.channelItem} ${
                  activeChannel === "백엔드-API" ? st.active : ""
                }`}
                onClick={() => setActiveChannel("백엔드-API")}
              >
                <StorageIcon className={st.channelIcon} />
                <span className={st.channelName}>API</span>
              </div>
            </div>
          </div>

          {/* 기획 */}
          <div className={st.channelCategory}>
            <div
              className={st.categoryHeader}
              onClick={() => toggleCategory("planning")}
            >
              <span
                className={`${st.arrow} ${
                  openCategories.planning ? st.open : ""
                }`}
              >
                ▶
              </span>
              <span className={st.categoryTitle}>기획</span>
            </div>
            <div
              className={`${st.categoryChannels} ${
                openCategories.planning ? st.open : ""
              }`}
            >
              <div
                className={`${st.channelItem} ${
                  activeChannel === "기획-일반" ? st.active : ""
                }`}
                onClick={() => setActiveChannel("기획-일반")}
              >
                <LightbulbIcon className={st.channelIcon} />
                <span className={st.channelName}>일반</span>
              </div>
              <div
                className={`${st.channelItem} ${
                  activeChannel === "기획-회의" ? st.active : ""
                }`}
                onClick={() => setActiveChannel("기획-회의")}
              >
                <PeopleIcon className={st.channelIcon} />
                <span className={st.channelName}>회의</span>
              </div>
            </div>
          </div>

          {/* 디자인 */}
          <div className={st.channelCategory}>
            <div
              className={st.categoryHeader}
              onClick={() => toggleCategory("design")}
            >
              <span
                className={`${st.arrow} ${
                  openCategories.design ? st.open : ""
                }`}
              >
                ▶
              </span>
              <span className={st.categoryTitle}>디자인</span>
            </div>
            <div
              className={`${st.categoryChannels} ${
                openCategories.design ? st.open : ""
              }`}
            >
              <div
                className={`${st.channelItem} ${
                  activeChannel === "디자인-일반" ? st.active : ""
                }`}
                onClick={() => setActiveChannel("디자인-일반")}
              >
                <BrushIcon className={st.channelIcon} />
                <span className={st.channelName}>일반</span>
              </div>
              <div
                className={`${st.channelItem} ${
                  activeChannel === "디자인-피드백" ? st.active : ""
                }`}
                onClick={() => setActiveChannel("디자인-피드백")}
              >
                <BarChartIcon className={st.channelIcon} />
                <span className={st.channelName}>피드백</span>
              </div>
            </div>
          </div>
        </div>

        {/* 유저 섹션 */}
        <div className={st.userSection}>
          <div className={st.userAvatar}>관</div>
          <div className={st.userInfo}>
            <div className={st.userName}>관리자</div>
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
            <span className={st.channelTitle}>{activeChannel}</span>
          </div>
        </div>

        <div className={st.contentArea}>
          <div className={st.welcomeSection}>
            <h1>관리자 패널</h1>
            <p>팀 협업 인트라넷에 오신 것을 환영합니다</p>
            <button>대시보드 보기</button>
          </div>

          <div className={st.notificationBanner}>
            <span>새 알림 확인</span>
            <button>확인하기</button>
          </div>

          <div className={st.welcomeSection}>
            <p>
              선택된 채널: <strong>{activeChannel}</strong>
            </p>
            <p>여기에 채널별 콘텐츠가 표시됩니다.</p>
          </div>
        </div>
      </main>
    </div>
  );
}