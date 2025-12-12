"use client";

import st from "@/components/common/SettingsDialog.module.scss";

export function AccountSettings() {
  return (
    <div className={st.contentSection}>
      <h2>내 계정</h2>
      <div className={st.formGroup}>
        <label>이메일</label>
        <input type="email" placeholder="email@example.com" />
      </div>
      <div className={st.formGroup}>
        <label>이름</label>
        <input type="text" placeholder="이름을 입력하세요" />
      </div>
      <div className={st.formGroup}>
        <label>부서</label>
        <input type="text" placeholder="부서명" disabled />
      </div>
      <button className={st.saveBtn}>변경사항 저장</button>
    </div>
  );
}