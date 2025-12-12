"use client";

import st from "./SettingsDialog.module.scss";
import BusinessIcon from "@mui/icons-material/Business";

export function DepartmentsSettings() {
  return (
    <div className={st.contentSection}>
      <h2>부서 관리</h2>
      <div className={st.adminHeader}>
        <button className={st.addBtn}>
          <BusinessIcon fontSize="small" />
          부서 추가
        </button>
      </div>
      <div className={st.departmentsList}>
        <p className={st.placeholder}>부서 목록이 여기에 표시됩니다.</p>
      </div>
    </div>
  );
}