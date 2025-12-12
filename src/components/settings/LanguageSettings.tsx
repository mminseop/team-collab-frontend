"use client";

import st from "@/components/common/SettingsDialog.module.scss";

export function LanguageSettings() {
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
}