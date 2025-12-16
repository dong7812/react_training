"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Comment } from "../../lib/types";

interface CommentSectionProps {
  articleId: number;
}

export default function CommentSection({ articleId }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  // 댓글 목록 조회
  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_URL}/comment?articleId=${articleId}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  // 댓글 작성
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          articleId,
          author: user?.nickname || '익명',
          content: content.trim(),
        }),
      });

      if (response.ok) {
        setContent('');
        fetchComments(); // 댓글 목록 새로고침
      }
    } catch (error) {
      console.error('Failed to create comment:', error);
    } finally {
      setLoading(false);
    }
  };

  // 댓글 삭제
  const handleDelete = async (commentId: number) => {
    if (!confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`${API_URL}/comment/${commentId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        fetchComments(); // 댓글 목록 새로고침
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        댓글 ({comments.length})
      </h2>

      {/* 댓글 작성 폼 */}
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요"
          rows={3}
          className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '작성 중...' : '댓글 작성'}
          </button>
        </div>
      </form>

      {/* 댓글 목록 */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-8">댓글이 비었어요!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-gray-800 rounded-lg border border-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="font-semibold text-white">{comment.author}</span>
                  <span className="text-gray-500 text-sm ml-2">
                    {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                {user?.nickname === comment.author && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    삭제
                  </button>
                )}
              </div>
              <p className="text-gray-300 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
