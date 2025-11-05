import QuizSelector from "./components/QuizSelector";
import ProgressBar from "./components/ProgressBar";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import MissingModal from "./components/MissingModal";
import { useQuiz } from "./hooks/useQuiz";
import { useEffect, useRef } from "react";

export default function App() {
  const {
    quizSet,
    setQuizSet,
    current,
    setCurrent,
    answers,
    handleAnswer,
    selectedQuestions,
    missingQuestions,
    timeLeft,
    finished,
    setFinished,
    showMissing,
    setShowMissing,
    score,
    goHome,
    animating,
    setAnimating,
    goToQuestion,
    shake,
    setShake,
    fastMode,
  } = useQuiz();

  // hiệu ứng nhanh
  const fastRef = useRef<HTMLDivElement | null>(null);
  const speedRef = useRef<HTMLDivElement | null>(null);
  const ultraRef = useRef<HTMLDivElement | null>(null);

  // Tạo spark 1 lần khi fastMode bật
  useEffect(() => {
    if (!fastMode) return;

    // Trigger CSS animation
    const play = (ref: any, css: string) => {
      if (!ref.current) return;
      ref.current.classList.remove(css);
      void ref.current.offsetWidth;
      ref.current.classList.add(css);
    };

    play(fastRef, "animate-pop");
    play(speedRef, "animate-fire-blast");
    play(ultraRef, "animate-rocket-fly");

    // tạo spark chỉ 1 lần khi fastMode kích hoạt
    const sparkContainer = document.getElementById("spark-container");
    if (sparkContainer) {
      sparkContainer.innerHTML = "";
      for (let i = 0; i < 6; i++) {
        const spark = document.createElement("div");
        spark.className = "spark";
        spark.style.left = `${40 + Math.random() * 20}%`;
        spark.style.top = `${60 + (Math.random() * 20 - 10)}%`;
        spark.textContent = "✨";
        sparkContainer.appendChild(spark);
      }

      // Tự biến mất sau 1s
      setTimeout(() => {
        sparkContainer.innerHTML = "";
      }, 800);
    }
  }, [fastMode]);

  return (
    <div
      className={`
    min-h-screen w-full
    flex flex-col items-center
    gap-8 sm:gap-12
    py-6 sm:py-10
    px-2
    relative
    transition-colors duration-200
    ${fastMode ? "bg-green-100" : "bg-pink-100"}
  `}
    >
      <h1 className="text-4xl font-bold text-pink-600 drop-shadow">
        🌸 Quiz Kiến Thức E-Commerce 🌸
      </h1>

      {/* ⭐ cực nhanh */}
      <div
        ref={fastRef}
        className="
    absolute 
    left-1/2 -translate-x-1/2
    top-[30%] sm:top-[20%] lg:top-[25%]
    opacity-0 pointer-events-none
    text-green-600 
    text-2xl sm:text-3xl lg:text-4xl 
    font-bold text-nowrap
  "
      >
        ⭐ Nhanh ghê! 😎
      </div>

      {/* 🔥 lửa bùng mạnh */}
      <div
        ref={speedRef}
        className="
    absolute 
    left-1/2 -translate-x-1/2
    bottom-[20%] sm:bottom-[18%] lg:bottom-[16%]
    opacity-0 pointer-events-none
    text-red-600 
    text-4xl sm:text-5xl lg:text-6xl 
    drop-shadow-lg
  "
      >
        🔥
      </div>

      {/* 🚀 bay ngang */}
      <div
        ref={ultraRef}
        className="
    absolute 
    top-[45%] sm:top-[48%] lg:top-[50%]
    left-[10%] sm:left-[12%] lg:left-[15%]
    opacity-0 pointer-events-none
    text-blue-600 
    text-4xl sm:text-5xl lg:text-6xl 
    drop-shadow-lg
  "
      >
        🚀
      </div>

      {/* container tia lửa */}
      <div
        id="spark-container"
        className="pointer-events-none absolute inset-0 flex justify-center items-center"
      ></div>

      {!quizSet && <QuizSelector setQuizSet={setQuizSet} />}

      {quizSet && !finished && (
        <>
          <div className="text-xl font-semibold text-pink-700">
            ⏳ Thời gian còn lại: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>

          <ProgressBar
            selectedQuestions={selectedQuestions}
            answers={answers}
            current={current}
            setCurrent={setCurrent}
          />

          <QuestionCard
            current={current}
            selectedQuestions={selectedQuestions}
            answers={answers}
            handleAnswer={handleAnswer}
            setCurrent={setCurrent}
            missingQuestions={missingQuestions}
            setShowMissing={setShowMissing}
            setFinished={setFinished}
            goHome={goHome}
            animating={animating}
            setAnimating={setAnimating}
            goToQuestion={goToQuestion}
            shake={shake}
            setShake={setShake}
          />

          {showMissing && missingQuestions.length > 0 && (
            <MissingModal
              missingQuestions={missingQuestions}
              answers={answers}
              selectedQuestions={selectedQuestions}
              setCurrent={setCurrent}
              setShowMissing={setShowMissing}
            />
          )}
        </>
      )}

      {quizSet && finished && (
        <ResultScreen
          score={score}
          selectedQuestions={selectedQuestions}
          answers={answers}
        />
      )}
    </div>
  );
}
