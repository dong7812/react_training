// SSR - 게시글 작성 페이지

import ArticleForm from "../../components/ArticleForm";

export default function NewArticlePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">
          새 게시글 작성
        </h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <ArticleForm />
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">작성 가이드</h3>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>제목과 내용은 필수 항목입니다</li>
            <li>이미지는 선택사항입니다 (JPG, PNG, GIF 지원)</li>
            <li>로그인한 사용자만 게시글을 작성할 수 있습니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
