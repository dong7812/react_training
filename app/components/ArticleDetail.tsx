"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Article } from "../../lib/types";
import CommentSection from "./CommentSection";

interface ArticleDetailProps {
  articleId: string;
}

export default function ArticleDetail({ articleId }: ArticleDetailProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${API_URL}/article/${articleId}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('게시글을 찾을 수 없습니다');
        }

        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-white text-lg">게시글을 불러오는 중...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="text-red-400 text-lg mb-4">{error || '게시글을 찾을 수 없습니다'}</div>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          목록으로
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => window.history.back()}
        className="mb-4 text-gray-400 hover:text-white transition-colors"
      >
        ← 목록으로
      </button>

      {/* 게시글 내용 */}
      <article className="bg-gray-800 rounded-lg p-8 border border-gray-700">
        {/* 제목 */}
        <h1 className="text-3xl font-bold text-white mb-4">{article.title}</h1>

        {/* 메타 정보 */}
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-6 pb-6 border-b border-gray-700">
          <span className="font-semibold text-gray-300">{article.author}</span>
          <span>
            {new Date(article.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* 이미지 */}
        {article.imageUrl && article.imageUrl.startsWith('http') && (
          <div className="mb-6">
            <div className="relative w-full h-96 rounded-lg overflow-hidden">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 896px"
                unoptimized
              />
            </div>
          </div>
        )}

        {/* 본문 */}
        <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>
      </article>

      {/* 댓글 섹션 */}
      <CommentSection articleId={article.id} />
    </div>
  );
}
