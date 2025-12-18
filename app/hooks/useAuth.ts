"use client";

import { useState, useEffect, useCallback } from 'react';

type User = {
  id: string;
  nickname: string;
} | null;

export function useAuth() {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // 로그인 상태 확인
  const checkAuth = useCallback(async () => {
    console.log('🔍 checkAuth 실행 중...');
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include',  // 쿠키 전송
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 로그아웃
  const logout = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setUser(null);
        window.location.replace('/sign');  // 히스토리에 추가하지 않고 이동
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    checkAuth();

    // bfcache(뒤로가기 캐시) 문제 해결: 뒤로가기 시 인증 상태 다시 확인
    const handlePageShow = (event: PageTransitionEvent) => {
      // persisted가 true면 bfcache에서 복원된 것
      if (event.persisted) {
        console.log('🔄 페이지가 bfcache에서 복원됨. 인증 상태 재확인...');
        checkAuth();
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [checkAuth]);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
    refetch: checkAuth,  // 로그인 후 상태 새로고침용
  };
}
