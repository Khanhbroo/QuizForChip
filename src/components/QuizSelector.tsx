export default function QuizSelector({
  setQuizSet,
}: {
  setQuizSet: (num: number) => void;
}) {
  return (
    <div className="bg-white p-6 rounded-3xl border-4 border-pink-300 shadow-xl animate-fade text-center w-96">
      <h2 className="text-2xl text-pink-700 font-bold mb-4">Chọn bộ câu hỏi</h2>

      <div className="flex flex-col gap-3">
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            className="p-3 bg-pink-200 hover:bg-pink-300 font-semibold rounded-xl border border-pink-400 active:scale-95"
            onClick={() => setQuizSet(num)}
          >
            Bộ Quiz {num} (Câu {(num - 1) * 25 + 1} → {num * 25})
          </button>
        ))}
      </div>
    </div>
  );
}
