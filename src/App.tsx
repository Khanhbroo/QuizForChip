import { useState, useEffect } from "react";
import { questions } from "./questions";

function App() {
  const [quizSet, setQuizSet] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(1500);
  const [finished, setFinished] = useState(false);
  const [showMissing, setShowMissing] = useState(false);

  const selectedQuestions = quizSet
    ? questions.slice((quizSet - 1) * 25, quizSet * 25)
    : [];

  const missingQuestions = selectedQuestions
    .map((_, idx) => idx)
    .filter((i) => answers[i] === undefined);

  useEffect(() => {
    if (!quizSet) return;

    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quizSet]);

  const formatTime = () =>
    `${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
      .toString()
      .padStart(2, "0")}`;

  const handleAnswer = (index: number) => {
    setAnswers({ ...answers, [current]: index });
  };

  const score = Object.keys(answers).filter(
    (q) => answers[parseInt(q)] === selectedQuestions[parseInt(q)].answer
  ).length;

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center gap-12 py-10">
      <h1 className="text-4xl font-bold text-pink-600 drop-shadow mb-3">
        🌸 Quiz Kiến Thức E-Commerce 🌸
      </h1>

      {/* ✅ Chọn bộ Quiz */}
      {!quizSet && (
        <div className="bg-white p-6 rounded-3xl border-4 border-pink-300 shadow-xl animate-fade text-center w-96">
          <h2 className="text-2xl text-pink-700 font-bold mb-4">
            Chọn bộ câu hỏi
          </h2>
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
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
      )}

      {/* ✅ Khi bắt đầu Quiz */}
      {quizSet && !finished && (
        <>
          {/* ✅ Thời gian */}
          <div className="text-xl font-semibold text-pink-700">
            ⏳ Thời gian còn lại:{" "}
            <span className="font-bold">{formatTime()}</span>
          </div>

          {/* ✅ Thanh progress 25 ô */}
          <div className="flex flex-wrap justify-center gap-1 w-11/12 md:w-2/3">
            {selectedQuestions.map((_, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isCurrent = idx === current;

              return (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`
                    w-7 h-7 rounded-md border transition 
                    ${
                      isAnswered
                        ? "bg-green-300 border-green-600"
                        : "bg-white border-gray-400"
                    }
                    ${isCurrent ? "ring-2 ring-pink-500 scale-110" : ""}
                  `}
                />
              );
            })}
          </div>

          {/* ✅ Câu hỏi card */}
          <div className="bg-white w-11/12 md:w-2/3 mt-4 p-6 rounded-3xl border-4 border-pink-300 shadow-xl animate-fade">
            <h2 className="text-xl font-bold text-pink-700">
              Câu {current + 1} / {selectedQuestions.length}
            </h2>

            {/* ✅ Nút Trang Chủ */}
            <button
              onClick={() => {
                setQuizSet(null);
                setAnswers({});
                setCurrent(0);
                setFinished(false);
                setTimeLeft(1500);
              }}
              className="mt-3 px-4 py-2 bg-white border border-pink-400 text-pink-700 rounded-xl hover:bg-pink-200 active:scale-95 transition"
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
                  className={`p-3 bg-pink-200 hover:bg-pink-300 text-pink-900 font-semibold rounded-xl border transition active:scale-95 ${
                    answers[current] === i
                      ? "ring-4 ring-green-400 border-green-600 bg-green-200"
                      : "border-pink-400"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* ✅ Điều hướng Câu */}
            <div className="flex justify-between items-center mt-6">
              {current > 0 ? (
                <button
                  onClick={() => setCurrent(current - 1)}
                  className="px-4 py-2 bg-white border border-pink-400 text-pink-700 font-semibold rounded-xl hover:bg-pink-200 active:scale-95 transition"
                >
                  ⬅ Quay lại
                </button>
              ) : (
                <div></div>
              )}

              {current < selectedQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrent(current + 1)}
                  className="px-4 py-2 bg-pink-300 hover:bg-pink-400 text-pink-900 font-semibold rounded-xl border border-pink-400 active:scale-95 transition"
                >
                  Tiếp tục ➡
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (missingQuestions.length === 0) {
                      setFinished(true);
                    } else {
                      setShowMissing(true);
                    }
                  }}
                  className="px-4 py-2 bg-green-300 hover:bg-green-400 text-green-900 font-bold rounded-xl border border-green-500 active:scale-95 transition"
                >
                  ✅ Hoàn thành Quiz
                </button>
              )}
            </div>
          </div>

          {/* ✅ Popup báo thiếu câu */}
          {showMissing && (
            <div className="mt-6 bg-white p-6 rounded-3xl border-4 border-red-400 shadow-xl text-center animate-fade">
              <h2 className="text-2xl font-bold text-red-600 mb-3">
                ⚠ Bạn còn thiếu {missingQuestions.length} câu!
              </h2>

              <p className="text-pink-900 font-semibold">
                Chọn câu để quay lại:
              </p>

              <div className="grid grid-cols-5 gap-3 mt-4">
                {selectedQuestions.map((_, idx) => {
                  const isAnswered = answers[idx] !== undefined;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrent(idx);
                        setShowMissing(false);
                      }}
                      className={`p-3 rounded-xl border text-sm font-bold ${
                        isAnswered
                          ? "bg-green-200 border-green-600 text-green-800"
                          : "bg-red-200 border-red-500 text-red-800"
                      }`}
                    >
                      Câu {idx + 1}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowMissing(false)}
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold text-gray-700"
              >
                Đóng
              </button>
            </div>
          )}
        </>
      )}

      {/* ✅ Kết quả */}
      {quizSet && finished && (
        <div className="w-11/12 md:w-3/4 mt-10">
          <div className="bg-white p-6 rounded-3xl border-4 border-pink-400 shadow-xl text-center">
            <h2 className="text-3xl text-pink-700 font-bold mb-3">
              🎉 Hoàn thành rồi! 🎉
            </h2>

            <p className="text-xl text-pink-900">
              Bạn trả lời đúng <b className="text-pink-600">{score}</b> /{" "}
              {selectedQuestions.length} câu
            </p>

            <button
              className="mt-6 px-6 py-3 bg-pink-300 hover:bg-pink-400 rounded-2xl text-pink-900 font-bold"
              onClick={() => window.location.reload()}
            >
              Chơi lại
            </button>
          </div>

          {/* ✅ Đáp án & phân tích */}
          <div className="mt-8 bg-white p-5 rounded-3xl border-4 border-pink-300 shadow-xl">
            <h3 className="text-2xl font-bold text-pink-700">
              ✅ Đáp án & phân tích
            </h3>

            <div className="mt-4 flex flex-col gap-5">
              {selectedQuestions.map((q, i) => {
                const userAnswer = answers[i];
                const correctIndex = q.answer;

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl border border-pink-200 bg-pink-50"
                  >
                    <p className="font-semibold text-pink-900">
                      <b>Câu {i + 1}:</b> {q.question}
                    </p>

                    <ul className="mt-2">
                      {q.options.map((opt, idx) => {
                        const isCorrect = idx === correctIndex;
                        const isUserPick = userAnswer === idx;

                        return (
                          <li
                            key={idx}
                            className={`p-2 mt-1 rounded-lg border ${
                              isCorrect
                                ? "bg-green-200 border-green-500 text-green-800 font-bold"
                                : isUserPick
                                ? "bg-red-200 border-red-500 text-red-800 font-semibold"
                                : "bg-white"
                            }`}
                          >
                            {opt}
                            {isCorrect && " ✅"}
                            {isUserPick && !isCorrect && " ❌"}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
