import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "로그인 | TeamCollab",
};

export default async function LoginPage() {
  return <LoginForm />;
}
