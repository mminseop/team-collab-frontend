export type MenuKey =
  | "account"
  | "notifications"
  | "privacy"
  | "appearance"
  | "language"
  | "slackbot"
  | "integrations"
  | "members"
  | "channels"
  | "departments"
  | "attendance"
  | "myAttendance";

export type AttendanceRecord = {
  id: string;
  userId: string;
  userName: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  workHours: string;
  status: "출근" | "지각" | "결근" | "퇴근";
};

export type AddMemberData = {
  email: string;
  name: string;
  password: string;
  departmentId: string;
  role: string;
};

export type MenuItem = {
  key: MenuKey;
  label: string;
  icon: React.ReactNode;
};