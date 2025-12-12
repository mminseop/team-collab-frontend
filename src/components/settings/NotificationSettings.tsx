"use client";

import st from "@/components/common/SettingsDialog.module.scss";

export function NotificationSettings() {
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
}