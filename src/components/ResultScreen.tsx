type ResultScreenProps = {
  score: number;
  selectedQuestions: Array<{
    id: number;
    question: string;
    options: string[];
    answer: number;
  }>;
  answers: Record<number, number>;
};

export default function ResultScreen({
  score,
  selectedQuestions,
  answers,
}: ResultScreenProps) {
  return (
    <div className="w-11/12 md:w-3/4">
      <div className="bg-white p-6 rounded-3xl border-4 border-pink-400 shadow-xl text-center">
        <h2 className="text-3xl text-pink-700 font-bold mb-3">
          🎉 Hoàn thành rồi! 🎉
        </h2>
        <p className="text-xl text-pink-900">
          Bạn trả lời đúng <b className="text-pink-600">{score}</b> /{" "}
          {selectedQuestions.length} câu
        </p>

        {/* ✅ COMMENT THEO ĐIỂM */}
        <div className="mt-4 text-lg font-semibold text-pink-700">
          {score < 10 && <p>Chưa tài đâu con ạ, còn phải học thêm nhé 😏</p>}

          {score >= 10 && score < 15 && (
            <p>Cũng được đó 😌 cố thêm tí nữa là tài</p>
          )}

          {score >= 15 && score < 20 && <p>Ghê nha! Học bổng gọi tên 🎓⚡</p>}

          {score >= 20 && score < 25 && <p>Siêu cấp tốc độ! 🧠💨 Quá dữ!</p>}

          {score === 25 && (
            <p className="text-green-600 text-xl font-extrabold">
              Vô đối! 🚀🔥 Google và tôi cũng xin thua bạn 🤯
            </p>
          )}
        </div>

        <button
          className="mt-6 px-6 py-3 bg-pink-300 hover:bg-pink-400 rounded-2xl text-pink-900 font-bold"
          onClick={() => window.location.reload()}
        >
          Chơi lại
        </button>
      </div>

      <div className="mt-8 bg-white p-5 rounded-3xl border-4 border-pink-300 shadow-xl">
        <h3 className="text-2xl font-bold text-pink-700">
          ✅ Đáp án & phân tích
        </h3>

        <div className="mt-4 flex flex-col gap-5">
          {selectedQuestions.map((q, i) => (
            <div
              key={q.id}
              className="p-4 rounded-2xl border border-pink-200 bg-pink-50"
            >
              <p className="font-semibold text-pink-900">
                <b>Câu {i + 1}:</b> {q.question}
              </p>

              <ul className="mt-2">
                {q.options.map((opt, idx) => {
                  const correct = idx === q.answer;
                  const userPick = answers[i] === idx;
                  return (
                    <li
                      key={idx}
                      className={`p-2 mt-1 rounded-lg border ${
                        correct
                          ? "bg-green-200 border-green-500 text-green-800 font-bold"
                          : userPick
                          ? "bg-red-200 border-red-500 text-red-800 font-semibold"
                          : "bg-white"
                      }`}
                    >
                      {opt}
                      {correct && " ✅"}
                      {userPick && !correct && " ❌"}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
