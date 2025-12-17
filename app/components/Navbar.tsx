"use client";

import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, loading, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white h-[60px] flex items-center px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* 로고 */}
        <a href="/" className="flex items-center font-bold text-xl">
          JUNGLE
        </a>

        {/* 메뉴 (가로 정렬) */}
        <ul className="flex gap-6 list-none items-center">
          <li>
            <a href="/" className="hover:text-gray-300 transition-colors">
              홈
            </a>
          </li>
          <li>
          <>
          {isAuthenticated ? (
            <a href="/newArticle" className="hover:text-gray-300 transition-colors">
            글쓰기
          </a>
          ) : (
            <a href="/sign" className="hover:text-gray-300 transition-colors">
              글쓰기
            </a>
          )}
          </>
          </li>

          {/* 로딩 중이 아닐 때만 표시 */}
          {!loading && (
            <>
              {isAuthenticated ? (
                <>
                  {/* 로그인된 경우 */}
                  <li className="text-gray-400">
                    {user?.nickname}님
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="hover:text-gray-300 transition-colors bg-transparent border-none cursor-pointer text-white"
                    >
                      로그아웃
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {/* 로그인 안된 경우 */}
                  <li>
                    <a href="/sign" className="hover:text-gray-300 transition-colors">
                      로그인
                    </a>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
