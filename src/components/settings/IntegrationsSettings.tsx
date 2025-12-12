"use client";

import st from "@/components/common/SettingsDialog.module.scss";
import EmailIcon from "@mui/icons-material/Email";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ArticleIcon from "@mui/icons-material/Article";

export function IntegrationsSettings() {
  return (
    <div className={st.contentSection}>
      <h2>통합 관리</h2>
      <div className={st.integrationsList}>
        <div className={st.integrationCard}>
          <div className={st.integrationHeader}>
            <div className={st.integrationIcon}>
              <EmailIcon fontSize="medium" color="primary" />
            </div>
            <div>
              <h3>Google Workspace</h3>
              <p>Gmail, Drive, Calendar 연동</p>
            </div>
          </div>
          <button className={st.connectBtn}>연동하기</button>
        </div>
        <div className={st.integrationCard}>
          <div className={st.integrationHeader}>
            <div className={st.integrationIcon}>
              <WidgetsIcon fontSize="medium" color="primary" />
            </div>
            <div>
              <h3>Jira</h3>
              <p>프로젝트 관리 도구 연동</p>
            </div>
          </div>
          <button className={st.connectBtn}>연동하기</button>
        </div>
        <div className={st.integrationCard}>
          <div className={st.integrationHeader}>
            <div className={st.integrationIcon}>
              <ArticleIcon fontSize="medium" color="primary" />
            </div>
            <div>
              <h3>Notion</h3>
              <p>문서 및 위키 연동</p>
            </div>
          </div>
          <button className={st.connectBtn}>연동하기</button>
        </div>
      </div>
    </div>
  );
}