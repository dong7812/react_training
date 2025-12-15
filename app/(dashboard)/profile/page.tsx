"use client";

// SSR - Profile 페이지
import Link from "next/link";
import Toast from "@/app/components/Toast";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const router = useRouter();
  // Form state
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");

// Toast handler
const showToast = (msg: string) => {
  setToast(msg);
  setTimeout(() => setToast(""), 2000);
};

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: userId , password : password}),
    });

    const data = await res.json();

    if (data.ok) {
      showToast("로그인 완료");
      router.push('/');
    } else {
      showToast("로그인 확인 필요");
    }
  } catch (error) {
    showToast("로그인 에러");
  }
};
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>아이디와 비밀번호를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" className="space-y-4"  onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="uid">아이디</Label>
              <Input
                id="uid"
                name="uid"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력하세요"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#05D182]" >
              로그인
            </Button>
          </form>

          <div className="mt-6 flex justify-center items-center gap-4 text-sm text-muted-foreground">
            <Link href="/reset-password" className="hover:text-primary hover:underline">
              비밀번호 찾기
            </Link>
            <span>|</span>
            <Link href="/find-id" className="hover:text-primary hover:underline">
              아이디 찾기
            </Link>
            <span>|</span>
            <Link href="/signUp" className="hover:text-primary hover:underline">
              회원가입
            </Link>
          </div>
        </CardContent>
      </Card>
      {toast && <Toast message={toast} />}
    </div>
  );
}
