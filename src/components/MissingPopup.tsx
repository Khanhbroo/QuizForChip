type MissingPopupProps = {
  missingQuestions: number[];
  answers: Record<number, number>;
  selectedQuestions: Array<any>;
  setCurrent: (i: number) => void;
  setShowMissing: (b: boolean) => void;
};

export default function MissingPopup({
  missingQuestions,
  answers,
  selectedQuestions,
  setCurrent,
  setShowMissing,
}: MissingPopupProps) {
  return (
    <div className="mt-6 bg-white p-6 rounded-3xl border-4 border-red-400 shadow-xl text-center animate-fade">
      <h2 className="text-2xl font-bold text-red-600 mb-3">
        ⚠ Bạn còn thiếu {missingQuestions.length} câu!
      </h2>

      <p className="text-pink-900 font-semibold">
        Nhấn để quay lại câu cần làm:
      </p>

      <div className="grid grid-cols-5 gap-3 mt-4">
        {selectedQuestions.map((_, idx) => {
          const done = answers[idx] !== undefined;
          return (
            <button
              key={idx}
              onClick={() => {
                setCurrent(idx);
                setShowMissing(false);
              }}
              className={`p-3 rounded-xl border font-bold ${
                done
                  ? "bg-green-200 border-green-600 text-green-800"
                  : "bg-red-200 border-red-600 text-red-800"
              }`}
            >
              Câu {idx + 1}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setShowMissing(false)}
        className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold"
      >
        Đóng
      </button>
    </div>
  );
}
