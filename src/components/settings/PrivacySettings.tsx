"use client";

import st from "@/components/common/SettingsDialog.module.scss";

export function PrivacySettings() {
  return (
    <div className={st.contentSection}>
      <h2>개인정보 및 보안</h2>
      <div className={st.formGroup}>
        <label>비밀번호 변경</label>
        <input type="password" placeholder="현재 비밀번호" />
        <input type="password" placeholder="새 비밀번호" />
        <input type="password" placeholder="비밀번호 확인" />
        <button className={st.saveBtn}>비밀번호 변경</button>
      </div>
      <div className={st.settingItem}>
        <div className={st.settingInfo}>
          <h3>2단계 인증</h3>
          <p>계정 보안을 강화합니다</p>
        </div>
        <button className={st.actionBtn}>설정하기</button>
      </div>
      <div className={st.settingItem}>
        <div className={st.settingInfo}>
          <h3>활동 기록</h3>
          <p>내 로그인 기록 확인</p>
        </div>
        <button className={st.actionBtn}>보기</button>
      </div>
    </div>
  );
}