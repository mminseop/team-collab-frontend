"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, IconButton, InputAdornment } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  ChatBubbleOutline,
  FolderOutlined,
  BarChartOutlined,
  GroupOutlined,
} from "@mui/icons-material";
import st from "./loginPage.module.scss";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLogin } from "@/hooks/useLogin";

export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const { isLoading } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email, password },
       {
        onSuccess: () => {
          router.replace("/dashboard");
        },
        onError: () => {
          // 일단 인터셉터에서 이미 alert 처리
        },
      }
    );
  };

  return (
    <div className={st.pageWrap}>
      <div className={st.loginContainer}>
        <div className={st.loginCard}>
          <div className={st.logoSection}>
            <div className={st.logoIcon}>TC</div>
            <h1 className={st.logoText}>TeamCollab</h1>
            <p className={st.subtitle}>
              팀 협업 인트라넷에 오신 것을 환영합니다
            </p>
          </div>

          <form onSubmit={handleSubmit} className={st.form}>
            <div className={st.inputGroup}>
              <TextField
                id="email-field"
                label="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: "#f8fafc",
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#ffffff",
                      "& fieldset": {
                        borderColor: "#667eea",
                        borderWidth: "2px",
                      },
                    },
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "14px 16px",
                  },
                }}
              />
            </div>

            <div className={st.inputGroup}>
              <TextField
                id="password-field"
                label="비밀번호"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: "#f8fafc",
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: "#f1f5f9",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#ffffff",
                      "& fieldset": {
                        borderColor: "#667eea",
                        borderWidth: "2px",
                      },
                    },
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "14px 16px",
                  },
                }}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading || loginMutation.isPending}
              sx={{
                marginTop: "0.5rem",
                padding: "14px",
                borderRadius: "10px",
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 4px 14px rgba(102, 126, 234, 0.4)",
                transition: "all 0.3s",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5568d3 0%, #653a8a 100%)",
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.5)",
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  background: "#cbd5e1",
                  color: "#94a3b8",
                  boxShadow: "none",
                },
              }}
            >
              {isLoading || loginMutation.isPending ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </div>

        <div className={st.illustration}>
          <div className={st.illustrationContent}>
            <h2>효율적인 팀 협업을 위한</h2>
            <h2>올인원 플랫폼</h2>
            <div className={st.features}>
              <div className={st.feature}>
                <ChatBubbleOutline className={st.featureIcon} />
                <span>실시간 채팅</span>
              </div>
              <div className={st.feature}>
                <FolderOutlined className={st.featureIcon} />
                <span>파일 공유</span>
              </div>
              <div className={st.feature}>
                <BarChartOutlined className={st.featureIcon} />
                <span>프로젝트 관리</span>
              </div>
              <div className={st.feature}>
                <GroupOutlined className={st.featureIcon} />
                <span>팀 협업</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
