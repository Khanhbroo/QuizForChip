import QuizSelector from "./components/QuizSelector";
import ProgressBar from "./components/ProgressBar";
import QuestionCard from "./components/QuestionCard";
import ResultScreen from "./components/ResultScreen";
import MissingPopup from "./components/MissingPopup";
import { useQuiz } from "./hooks/useQuiz";
import MissingModal from "./components/MissingModal";

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
  } = useQuiz();

  return (
    <div
      className={`
         min-h-screen flex flex-col items-center gap-12 py-10 transition-colors duration-500
        ${
          score / (selectedQuestions.length || 1) >= 0.8
            ? "bg-green-100"
            : "bg-pink-100"
        }
      `}
    >
      <h1 className="text-4xl font-bold text-pink-600 drop-shadow">
        🌸 Quiz Kiến Thức E-Commerce 🌸
      </h1>

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
