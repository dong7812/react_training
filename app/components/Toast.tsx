export default function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm shadow-lg animate-fade-in-up">
      {message}
    </div>
  );
}