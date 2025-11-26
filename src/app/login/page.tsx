"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";
import st from "./loginPage.module.scss";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoading(true);
    try {
      // 가짜 이메일/비밀번호 체크
      if (email === "admin" && password === "admin") {
        router.replace("/dashboard"); // 성공 시 대시보드 이동
      } else {
        alert("이메일 또는 비밀번호가 잘못되었습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={st.pageWrap}>
      <div className={st.loginCard}>
        <div className={st.logoText} onClick={() => router.push("/")}>
          TeamCollab
        </div>
        <form onSubmit={handleSubmit} className={st.form}>
          <TextField
            label="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </div>
    </div>
  );
}
