"use client";

import st from "./SettingsDialog.module.scss";

export function AppearanceSettings() {
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
}