// SSR - 게시글 상세 페이지

import ArticleDetail from "../../../components/ArticleDetail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleDetail articleId={id} />
    </div>
  );
}
