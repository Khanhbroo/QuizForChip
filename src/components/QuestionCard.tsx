type QuestionCardProps = {
  current: number;
  selectedQuestions: Array<{
    id: number;
    question: string;
    options: string[];
    answer: number;
  }>;
  answers: Record<number, number>;
  handleAnswer: (index: number) => void;
  setCurrent: (n: number) => void;
  missingQuestions: number[];
  setShowMissing: (b: boolean) => void;
  setFinished: (b: boolean) => void;
  goHome: () => void;
  animating: "in" | "out" | null;
  setAnimating: (a: "in" | "out" | null) => void;
  goToQuestion: (n: number) => void;
  shake: boolean;
  setShake: (s: boolean) => void;
};

export default function QuestionCard({
  current,
  selectedQuestions,
  answers,
  handleAnswer,
  setCurrent,
  missingQuestions,
  setShowMissing,
  setFinished,
  goHome,
  animating,
  setAnimating,
  goToQuestion,
  shake,
  setShake,
}: QuestionCardProps) {
  return (
    <div
      className={`
      bg-white w-11/12 md:w-2/3 p-6 rounded-3xl border-4 border-pink-300 shadow-xl
      transition-all duration-300
      ${animating === "out" ? "-translate-x-full opacity-0" : ""}
      ${animating === "in" ? "translate-x-full opacity-0" : ""}
      ${shake ? "animate-shake" : ""}   // ✅ ADD THIS
  `}
      onTransitionEnd={() => setAnimating(null)}
    >
      <h2 className="text-xl font-bold text-pink-700">
        Câu {current + 1} / {selectedQuestions.length}
      </h2>

      <button
        onClick={goHome}
        className="mt-3 px-4 py-2 bg-white border border-pink-400 text-pink-700 rounded-xl hover:bg-pink-200"
      >
        🏠 Về trang chủ
      </button>

      <p className="mt-4 text-pink-900 text-lg font-semibold">
        {selectedQuestions[current].question}
      </p>

      <div className="mt-5 grid gap-3">
        {selectedQuestions[current].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className={`p-3 bg-pink-200 hover:bg-pink-300 rounded-xl border ${
              answers[current] === i
                ? "ring-4 ring-green-400 border-green-600 bg-green-200"
                : "border-pink-400"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        {current > 0 && (
          <button
            onClick={() => goToQuestion(current - 1)}
            className="px-4 py-2 bg-white border border-pink-400 text-pink-700 rounded-xl hover:bg-pink-200"
          >
            ⬅ Quay lại
          </button>
        )}

        <div className="flex justify-between items-center mt-6">
          {/* Câu tiếp theo */}
          {current < selectedQuestions.length - 1 && (
            <button
              onClick={() => goToQuestion(current + 1)}
              className="px-4 py-2 bg-green-300 hover:bg-green-400 text-green-900 rounded-xl"
            >
              Câu tiếp theo ➡
            </button>
          )}

          {/* Hoàn thành */}
          {current === selectedQuestions.length - 1 && (
            <button
              onClick={() => {
                if (missingQuestions.length === 0) {
                  setFinished(true);
                  setShowMissing(false);
                } else {
                  setShowMissing(true);
                  setShake(true); // ✅ run shake
                  setTimeout(() => setShake(false), 500);
                }
              }}
              className="px-4 py-2 bg-green-300 hover:bg-green-400 text-green-900 rounded-xl"
            >
              ✅ Hoàn thành Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
