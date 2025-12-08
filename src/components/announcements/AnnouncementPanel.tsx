"use client";

import st from "./AnnouncementPanel.module.scss";
import { useState, useRef, useEffect } from "react";
import {
  useAnnouncements,
  useCreateAnnouncement,
  useDeleteAnnouncement,
} from "@/hooks/useAnnouncements";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import CampaignIcon from "@mui/icons-material/Campaign";

interface AnnouncementPanelProps {
  channelId?: number;
  userRole: string;
  userId: number;
}

export const AnnouncementPanel = ({
  channelId,
  userRole,
  userId,
}: AnnouncementPanelProps) => {
  const [content, setContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: announcements, isLoading } = useAnnouncements(channelId);
  const createMutation = useCreateAnnouncement();
  const deleteMutation = useDeleteAnnouncement();

  const isAdmin = userRole === "ADMIN";

  const list = announcements ?? [];

  // 스크롤을 맨 아래로
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [announcements]);

  // textarea 자동 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !isAdmin) return;

    try {
      await createMutation.mutateAsync({
        content: content.trim(),
        channel_id: channelId,
      });
      setContent("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("공지사항 작성 실패:", error);
      alert("공지사항 작성에 실패했습니다.");
    }
  };

  const handleDelete = async (announcementId: number) => {
    if (!confirm("이 공지사항을 삭제하시겠습니까?")) return;

    try {
      await deleteMutation.mutateAsync(announcementId);
    } catch (error) {
      console.error("공지사항 삭제 실패:", error);
      alert("공지사항 삭제에 실패했습니다.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className={st.container}>
        <div className={st.loading}>로딩중...</div>
      </div>
    );
  }

  return (
    <div className={st.container}>
      {/* 메시지 목록 */}
      <div className={st.messageList}>
        {list.length === 0 ? (
          <div className={st.emptyState}>
            <CampaignIcon className={st.emptyIcon} />
            <p>아직 공지사항이 없습니다.</p>
            {isAdmin && <p>첫 번째 공지사항을 작성해보세요!</p>}
          </div>
        ) : (
          list.map((announcement) => (
            <div key={announcement.id} className={st.message}>
              <div className={st.messageHeader}>
                <div className={st.avatar}>
                  {announcement.author_name?.[0]?.toUpperCase() || "A"}
                </div>
                <div className={st.messageInfo}>
                  <div className={st.authorInfo}>
                    <span className={st.authorName}>
                      {announcement.author_name}
                    </span>
                    {announcement.author_role === "ADMIN" && (
                      <span className={st.adminBadge}>관리자</span>
                    )}
                    <span className={st.timestamp}>
                      {formatDate(announcement.created_at)}
                    </span>
                  </div>
                  <div className={st.messageContent}>
                    {announcement.content}
                  </div>
                </div>
                {(isAdmin || announcement.author_id === userId) && (
                  <button
                    className={st.deleteButton}
                    onClick={() => handleDelete(announcement.id)}
                    disabled={deleteMutation.isPending}
                    title="삭제"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 (관리자만) */}
      {isAdmin ? (
        <form className={st.inputArea} onSubmit={handleSubmit}>
          <div className={st.inputWrapper}>
            <textarea
              ref={textareaRef}
              className={st.textarea}
              placeholder="공지사항을 입력하세요... (Shift+Enter: 줄바꿈, Enter: 전송)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={createMutation.isPending}
              rows={1}
            />
            <button
              type="submit"
              className={st.sendButton}
              disabled={!content.trim() || createMutation.isPending}
              title="전송"
            >
              <SendIcon />
            </button>
          </div>
        </form>
      ) : (
        <div className={st.readOnlyNotice}>
          <CampaignIcon fontSize="small" />
          <span>관리자만 공지사항을 작성할 수 있습니다.</span>
        </div>
      )}
    </div>
  );
};
