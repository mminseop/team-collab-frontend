"use client";

import { useState } from "react";
import { TextField, MenuItem, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ModalWrapper } from "./ModalWrapper";
import st from "./AddMemberModal.module.scss";

type AddMemberModalProps = {
  open: boolean;
  onClose: () => void;
  onAddMember: (data: { 
    email: string; 
    name: string; 
    password: string; 
    departmentId: string; 
    role: string 
  }) => void;
  departments: { id: number; name: string }[];
  isLoading?: boolean;
};

export function AddMemberModal({ 
  open, 
  onClose, 
  onAddMember, 
  departments, 
  isLoading = false 
}: AddMemberModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [departmentId, setDepartmentId] = useState("");
  const [role, setRole] = useState("MEMBER");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    onAddMember({ email, name, password, departmentId, role });
  };

  const handleClose = () => {
    // 모달 닫을 때 상태 초기화
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setDepartmentId("");
    setRole("MEMBER");
    onClose();
  };

  return (
    <ModalWrapper 
      open={open} 
      onClose={handleClose} 
      title="팀원 추가" 
      onSubmit={handleSubmit} 
      isSubmitting={isLoading}
      submitText="팀원 초대"
    >
      <div className={st.formContainer}>
        <div className={st.formGroup}>
          <TextField 
            label="이메일" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            fullWidth 
            required 
            type="email"
            placeholder="email@example.com"
            className={st.discordInput}
          />
        </div>
        
        <div className={st.formGroup}>
          <TextField 
            label="이름" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            fullWidth 
            required
            placeholder="이름을 입력하세요"
            className={st.discordInput}
          />
        </div>

        <div className={st.formGroup}>
          <TextField 
            label="비밀번호" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            fullWidth 
            required 
            type={showPassword ? "text" : "password"}
            placeholder="8자 이상 입력하세요"
            className={st.discordInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className={st.formGroup}>
          <TextField 
            label="비밀번호 확인" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            fullWidth 
            required 
            type={showConfirmPassword ? "text" : "password"}
            placeholder="비밀번호를 다시 입력하세요"
            error={confirmPassword !== "" && password !== confirmPassword}
            helperText={
              confirmPassword !== "" && password !== confirmPassword 
                ? "비밀번호가 일치하지 않습니다" 
                : ""
            }
            className={st.discordInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className={st.formGroup}>
          <TextField
            select
            label="부서"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            fullWidth
            required
            className={st.discordInput}
          >
            <MenuItem value="">부서를 선택하세요</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id.toString()}>
                {dept.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className={st.formGroup}>
          <TextField
            select
            label="권한"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            required
            className={st.discordInput}
          >
            <MenuItem value="MEMBER">팀원 (MEMBER)</MenuItem>
            <MenuItem value="ADMIN">관리자 (ADMIN)</MenuItem>
          </TextField>
        </div>
      </div>
    </ModalWrapper>
  );
}