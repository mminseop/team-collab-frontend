"use client";

import { Dialog } from "@mui/material";
import st from "./SettingsDialog.module.scss";
import { useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { MenuSidebar } from "@/components/settings/MenuSidebar";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { MyAttendanceSettings } from "@/components/settings/MyAttendanceSettings";
import { AttendanceManagementSettings } from "@/components/settings/AttendanceManagementSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { PrivacySettings } from "@/components/settings/PrivacySettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";
import { LanguageSettings } from "@/components/settings/LanguageSettings";
import { SlackBotSettings } from "@/components/settings/SlackBotSettings";
import { IntegrationsSettings } from "@/components/settings/IntegrationsSettings";
import { MembersSettings } from "@/components/settings/MembersSettings";
import { ChannelsSettings } from "@/components/settings/ChannelsSettings";
import { DepartmentsSettings } from "@/components/settings/DepartmentsSettings";
import { Department, useDepartments } from "@/hooks/useDepartments";
import { useAddUser } from "@/hooks/useAddUser";
import { MenuKey, AddMemberData } from "@/types/settings";

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  userRole?: string;
};

export function SettingsDialog({
  open,
  onClose,
  onLogout,
  userRole,
}: SettingsDialogProps) {
  const [activeMenu, setActiveMenu] = useState<MenuKey>("account");

  const currentMonth = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }, []);

  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  const isAdmin = userRole === "ADMIN";

  const { data: departmentsResponse } = useDepartments();
  const departments: Department[] = departmentsResponse?.data ?? [];

  const addUserMutation = useAddUser();

  const handleAddMember = (data: AddMemberData) => {
    addUserMutation.mutate(data, {
      onSuccess: () => {
        alert("팀원이 성공적으로 추가되었습니다!");
        setIsAddMemberOpen(false);
      },
      onError: (error) => {
        const errorMessage = error || "팀원 추가에 실패했습니다.";
        alert(errorMessage);
      },
    });
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "account":
        return <AccountSettings />;

      case "myAttendance":
        return (
          <MyAttendanceSettings
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
        );

      case "attendance":
        return (
          <AttendanceManagementSettings
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
        );

      case "notifications":
        return <NotificationSettings />;

      case "privacy":
        return <PrivacySettings />;

      case "appearance":
        return <AppearanceSettings />;

      case "language":
        return <LanguageSettings />;

      case "slackbot":
        return <SlackBotSettings />;

      case "integrations":
        return <IntegrationsSettings />;

      case "members":
        return (
          <MembersSettings
            isAddMemberOpen={isAddMemberOpen}
            onOpenAddMember={() => setIsAddMemberOpen(true)}
            onCloseAddMember={() => setIsAddMemberOpen(false)}
            onAddMember={handleAddMember}
            departments={departments}
          />
        );

      case "channels":
        return <ChannelsSettings />;

      case "departments":
        return <DepartmentsSettings />;

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{ className: st.dialogPaper }}
    >
      <div className={st.settingsContainer}>
        <MenuSidebar
          activeMenu={activeMenu}
          onMenuChange={setActiveMenu}
          onLogout={onLogout}
          isAdmin={isAdmin}
        />

        <div className={st.content}>
          <button className={st.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
          {renderContent()}
        </div>
      </div>
    </Dialog>
  );
}
