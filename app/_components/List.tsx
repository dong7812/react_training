"use client";
import { useState } from "react";
import Image from "next/image";
import { ArticleItem, mockArticles } from "../../lib/mockData";

export default function List() {
  const [article, setArticle] = useState<ArticleItem[]>(mockArticles);
  const [value, setValue] = useState("");

  const addTodo = () => {
    const newArticle: ArticleItem = {
      text1: "작성자: 신규",
      text2: value || "제목 없음",
      text3: new Date().toLocaleDateString('ko-KR'),
      text4: "조회수: 0",
      imageUrl: "https://picsum.photos/id/241/200/300"
    };
    setArticle([...article, newArticle]);
    setValue("");
  };

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={addTodo} className="bg-[#ffffff]">추가</button>

      <ul>
        {article.map((item, i) => (
          <li key={i} className="group flex justify-between items-center mb-6 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <div>
              <p className="font-semibold mb-2 text-[#808080]">{item.text1}</p>
              <p className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">{item.text2}</p>
              <p className="font-semibold mb-2 text-[#BEBEBE]">{item.text3}</p>
              <p className="font-semibold mb-2 text-[#808080]">{item.text4}</p>
            </div>
            <div>
              <Image
                src={item.imageUrl}
                alt="게시글 이미지"
                width={200}
                height={80}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
