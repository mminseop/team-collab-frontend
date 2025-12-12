"use client";

import st from "@/components/common/SettingsDialog.module.scss";
import PeopleIcon from "@mui/icons-material/People";
import { AddMemberModal } from "@/components/common/AddMemberModal";
import { Department } from "@/hooks/useDepartments";
import { AddMemberData } from "@/types/settings";

type MembersSettingsProps = {
  isAddMemberOpen: boolean;
  onOpenAddMember: () => void;
  onCloseAddMember: () => void;
  onAddMember: (data: AddMemberData) => void;
  departments: Department[];
};

export function MembersSettings({
  isAddMemberOpen,
  onOpenAddMember,
  onCloseAddMember,
  onAddMember,
  departments,
}: MembersSettingsProps) {
  return (
    <>
      <div className={st.contentSection}>
        <h2>팀원 관리</h2>
        <div className={st.adminHeader}>
          <button className={st.addBtn} onClick={onOpenAddMember}>
            <PeopleIcon fontSize="small" />
            팀원 초대
          </button>
        </div>
        <div className={st.membersList}>
          <p className={st.placeholder}>팀원 목록이 여기에 표시됩니다.</p>
        </div>
      </div>

      <AddMemberModal
        open={isAddMemberOpen}
        onClose={onCloseAddMember}
        onAddMember={onAddMember}
        departments={departments}
      />
    </>
  );
}