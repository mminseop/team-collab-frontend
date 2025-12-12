"use client";

import st from "./SettingsDialog.module.scss";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export function SlackBotSettings() {
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
}