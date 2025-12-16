// 백엔드 API에서 받는 Article 타입
export interface Article {
  id: number;
  author: string;
  title: string;
  content: string;
  imageUrl: string | null;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Comment 타입
export interface Comment {
  id: number;
  articleId: number;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
