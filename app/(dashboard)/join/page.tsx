"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function JoinPage() {
  const router = useRouter();

  // Form state
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [idChecked, setIdChecked] = useState(false);
  const [checkIdMsg, setCheckIdMsg] = useState("");
  const [toast, setToast] = useState("");


  // Toast handler
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  // Check ID duplicate
  const handleCheckId = async () => {
    if (!userId.trim()) {
      showToast("아이디를 입력하세요");
      return;
    }

    try {
      const res = await fetch("/api/check/id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: userId }),
      });

      const data = await res.json();

      if (data.ok) {
        setCheckIdMsg("사용 가능한 아이디입니다.");
        setIdChecked(true);
      } else {
        setCheckIdMsg("이미 사용 중인 아이디입니다.");
        setIdChecked(false);
        showToast("다른 아이디를 입력하세요");
      }
    } catch (error) {
      showToast("중복 확인 요청 실패");
      setIdChecked(false);
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !password || !fullName || !nickName) {
      showToast("모든 필드를 입력하세요");
      return;
    }

    if (!idChecked) {
      showToast("아이디 중복 확인을 완료하세요");
      return;
    }

    try {
      const res = await fetch("/api/add/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: userId,
          pw: password,
          name: fullName,
          nickName: nickName,
        }),
      });

      if (res.ok) {
        showToast("회원 가입이 완료되었습니다");
        setTimeout(() => router.push("/profile"), 1000);
      } else {
        showToast("회원 가입에 실패했습니다");
      }
    } catch (error) {
      showToast("회원 가입에 실패했습니다");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-xl">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">회원가입</CardTitle>
            <CardDescription>필수 정보를 입력하하세요.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* 아이디 */}
              <div>
                <Label htmlFor="userId">아이디</Label>
                <div className="mt-1 flex gap-2">
                  <Input
                    id="userId"
                    value={userId}
                    onChange={(e) => {
                      setUserId(e.target.value);
                      setIdChecked(false);
                      setCheckIdMsg("");
                    }}
                    placeholder="아이디를 입력"
                    autoComplete="username"
                    required
                  />
                  <Button
                    type="button"
                    onClick={handleCheckId}
                    className="shrink-0 bg-[#05D182] hover:bg-[#04b871]"
                  >
                    중복 확인
                  </Button>
                </div>
                <p className="mt-1 text-xs text-gray-500">영문/숫자 4~20자 권장</p>
                {checkIdMsg && (
                  <p className={`mt-1 text-xs ${idChecked ? "text-green-600" : "text-red-600"}`}>
                    {checkIdMsg}
                  </p>
                )}
              </div>

              {/* 비밀번호 */}
              <div>
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-16"
                    placeholder="비밀번호"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 px-2 text-sm text-gray-500"
                  >
                    {showPassword ? "숨기기" : "표시"}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">영문/숫자/특수문자 조합 8자 이상 권장</p>
              </div>

              {/* 이름 */}
              <div>
                <Label htmlFor="fullName">이름</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="이름"
                  autoComplete="name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="nickName">닉네임</Label>
                <Input
                  id="nickName"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                  placeholder="닉네임"
                  autoComplete="name"
                  required
                />
              </div>

              {/* 가입하기 */}
              <div className="pt-2">
                <Button
                  type="submit"
                //   disabled={!idChecked}
                  className="w-full bg-[#05D182] hover:bg-[#04b871] py-6 text-base font-semibold"
                >
                  가입하기
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm shadow-lg">
            {toast}
          </div>
        )}
      </main>
    </div>
  );
}
