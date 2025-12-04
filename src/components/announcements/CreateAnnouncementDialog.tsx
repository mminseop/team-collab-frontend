"use client";

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import { api } from "@/lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateAnnouncementDialog({ open, onClose, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post("/api/announcements", { title, content });
      alert("공지사항이 작성되었고 Slack에 전송되었습니다!");
      onSuccess();
      onClose();
    } catch  {
      alert("공지사항 작성 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>공지사항 작성</DialogTitle>
      <DialogContent>
        <TextField
          label="제목"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="내용"
          fullWidth
          multiline
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={loading || !title || !content}
          sx={{ mt: 2 }}
        >
          {loading ? "전송 중..." : "작성 및 Slack 전송"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
