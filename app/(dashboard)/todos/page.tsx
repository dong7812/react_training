// SSR - Todos 페이지

export default function TodosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">할 일 목록</h1>
      <p className="text-gray-600 mb-4">
        이 페이지는 /todos 경로로 접근할 수 있습니다.
      </p>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Todo 기능 추가 예정</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>할 일 추가</li>
          <li>할 일 완료 표시</li>
          <li>할 일 삭제</li>
          <li>할 일 필터링</li>
        </ul>
      </div>
    </div>
  );
}
