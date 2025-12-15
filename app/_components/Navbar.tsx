export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white h-[60px] flex items-center px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* 로고 */}
        <a href="/" className="flex items-center font-bold text-xl">
          JUNGLE
        </a>

        {/* 메뉴 (가로 정렬) */}
        <ul className="flex gap-6 list-none">
          <li>
            <a href="/" className="hover:text-gray-300 transition-colors">
              홈
            </a>
          </li>
          <li>
            <a href="/todos" className="hover:text-gray-300 transition-colors">
              할 일
            </a>
          </li>
          <li>
            <a href="/profile" className="hover:text-gray-300 transition-colors">
              프로필
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
