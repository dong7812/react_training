"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Article } from "../../lib/types";

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function List() {
  const [parent] = useAutoAnimate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 4,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  // 게시글 목록 가져오기
  const fetchArticles = async (page: number = 1) => {
    setPageLoading(true);
    try {
      const response = await fetch(`${API_URL}/article?page=${page}&limit=4`, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('게시글을 불러오는데 실패했습니다');
      }

      const data = await response.json();
      setArticles(data.articles || []);
      setPagination(data.pagination || {
        page: 1,
        limit: 4,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다');
      setArticles([]);
    } finally {
      setPageLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-white text-lg">게시글을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="text-gray-400 text-lg mb-4">아직 작성된 게시글이 없습니다</div>
        <a
          href="/newArticle"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          첫 게시글 작성하기
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          전체 게시글
        </h2>
      </div>

      <ul ref={parent} className="space-y-4">
        {articles.map((article) => (
          <li
            key={article.id}
            onClick={() => window.location.href = `/article/${article.id}`}
            className="group flex justify-between items-center p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors cursor-pointer border border-gray-700 hover:border-gray-600"
          >
            <div className="flex-1">
              <p className="font-semibold mb-2 text-gray-400">
                {article.author}
              </p>
              <p className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                {article.title}
              </p>
              <p className="text-gray-300 mb-3 line-clamp-2">
                {article.content}
              </p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>
                  {new Date(article.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {article.imageUrl && article.imageUrl.startsWith('http') && (
              <div className="ml-6 flex-shrink-0">
                <div className="relative w-48 h-32 rounded-lg overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 192px"
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* 페이징 버튼 */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => fetchArticles(pagination.page - 1)}
          disabled={!pagination.hasPrev || pageLoading}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {pageLoading && pagination.page > 1 ? '...' : '← Prev'}
        </button>

        <div className="flex items-center gap-2 text-white">
          <span className="font-semibold">{pagination.page}</span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-400">{pagination.totalPages}</span>
          {pageLoading && <span className="text-blue-400 text-sm ml-2">로딩 중...</span>}
        </div>

        <button
          onClick={() => fetchArticles(pagination.page + 1)}
          disabled={!pagination.hasNext || pageLoading}
          className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {pageLoading && pagination.hasNext ? '...' : 'Next →'}
        </button>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        총 {pagination.total}개의 게시글
      </p>
    </div>
  );
}
