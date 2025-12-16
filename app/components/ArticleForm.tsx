"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Toast from "@/app/components/Toast";

interface ArticleFormData {
  title: string;
  content: string;
  imageFile: File | null;
}

export default function ArticleForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    content: "",
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  // Toast handler
const showToast = (msg: string) => {
  setToast(msg);
  setTimeout(() => setToast(""), 2000);
};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });

      // 이미지 미리보기
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let imageUrl = "";
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      // 1. 이미지 업로드 (선택사항)
      if (formData.imageFile) {
        const formDataImage = new FormData();
        formDataImage.append("file", formData.imageFile);

        const imageResponse = await fetch(`${API_URL}/files/upload`, {
          method: "POST",
          credentials: "include", // 쿠키 포함
          body: formDataImage,
        });

        if (!imageResponse.ok) {
          throw new Error("이미지 업로드 실패");
        }

        const imageResult = await imageResponse.json();
        imageUrl = imageResult.file.url; // S3 전체 URL
      }

      // 2. 게시글 생성
      const articleData = {
        nickName: user?.nickname || "익명",
        main: formData.title,
        sub: formData.content,
        imageUrl: imageUrl,
      };

      const articleResponse = await fetch(`${API_URL}/article/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(articleData),
      });

      if (!articleResponse.ok) {
        throw new Error("게시글 작성 실패");
      }

      // 성공 - 홈으로 리다이렉트
      showToast("게시글이 작성되었습니다!");
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "작성 중 오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* 제목 */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          제목
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="제목을 입력하세요"
        />
      </div>

      {/* 내용 */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          내용
        </label>
        <textarea
          id="content"
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          placeholder="내용을 입력하세요"
        />
      </div>

      {/* 이미지 업로드 */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
          이미지 (선택)
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* 이미지 미리보기 */}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="미리보기"
              className="max-w-full h-auto max-h-64 rounded-lg border border-gray-300"
            />
          </div>
        )}
      </div>

      {/* 제출 버튼 */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "작성 중..." : "게시글 작성"}
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          취소
        </button>
      </div>
    </form>
  );
}
