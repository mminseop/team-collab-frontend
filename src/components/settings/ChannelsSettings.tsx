"use client";

import st from "@/components/common/SettingsDialog.module.scss";
import TagIcon from "@mui/icons-material/Tag";

export function ChannelsSettings() {
  return (
    <div className={st.contentSection}>
      <h2>채널 관리</h2>
      <div className={st.adminHeader}>
        <button className={st.addBtn}>
          <TagIcon fontSize="small" />
          채널 추가
        </button>
      </div>
      <div className={st.channelsList}>
        <p className={st.placeholder}>채널 목록이 여기에 표시됩니다.</p>
      </div>
    </div>
  );
}