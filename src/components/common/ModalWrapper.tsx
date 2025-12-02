"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import st from "./ModalWrapper.module.scss";

type ModalWrapperProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitText?: string;
  isSubmitting?: boolean;
};

export function ModalWrapper({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitText = "저장",
  isSubmitting = false,
}: ModalWrapperProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ className: st.dialogPaper }} // 스타일 클래스를 꼭 지정
    >
      <DialogTitle className={st.dialogTitle}>{title}</DialogTitle>
      <DialogContent dividers className={st.dialogContent}>
        {children}
      </DialogContent>
      <DialogActions className={st.dialogActions}>
        <Button onClick={onClose} disabled={isSubmitting}>
          취소
        </Button>
        {onSubmit && (
          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "저장 중…" : submitText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
