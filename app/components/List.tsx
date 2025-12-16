"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Article } from "../../lib/types";

export default function List() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 게시글 목록 가져오기
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
        const response = await fetch(`${API_URL}/article`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('게시글을 불러오는데 실패했습니다');
        }

        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
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

  if (articles.length === 0) {
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
          전체 게시글 ({articles.length})
        </h2>
      </div>

      <ul className="space-y-4">
        {articles.map((article) => (
          <li
            key={article.id}
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
                <span>조회수 {article.viewCount}</span>
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
    </div>
  );
}
