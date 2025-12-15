export interface ArticleItem {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  imageUrl: string;
}

export const mockArticles: ArticleItem[] = [
  {
    text1: "작성자: 홍순규",
    text2: "정글 생활 첫 날 후기",
    text3: "2025-12-15",
    text4: "조회수: 123",
    imageUrl: "https://picsum.photos/id/237/200/300"
  },
  {
    text1: "작성자: 이상천",
    text2: "알고리즘 스터디 모집합니다",
    text3: "2025-12-14",
    text4: "조회수: 89",
    imageUrl: "https://picsum.photos/id/238/200/300"
  },
  {
    text1: "작성자: 고경철",
    text2: "Next.js 프로젝트 팁 공유",
    text3: "2025-12-13",
    text4: "조회수: 256",
    imageUrl: "https://picsum.photos/id/239/200/300"
  },
  {
    text1: "작성자: 이동규",
    text2: "정글 맛집 추천해주세요!",
    text3: "2025-12-12",
    text4: "조회수: 342",
    imageUrl: "https://picsum.photos/id/240/200/300"
  }
];
