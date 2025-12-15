// SSR => Server Side Rendering
// 이 페이지는 서버에서 렌더링
import List from "./_components/List";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="container mx-auto px-4 py-40">
      <h1 className="align-center text-center text-5xl font-bold mb-4 text-white"># 정글 커뮤니티</h1>
      </div>
      <div>
        <List/>
      </div>
    </div>
  );
}
