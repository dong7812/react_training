// SSR - Profile 페이지
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>아이디와 비밀번호를 입력하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="uid">아이디</Label>
              <Input
                id="uid"
                name="uid"
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
            <Link href="/join" className="hover:text-primary hover:underline">
              회원가입
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
