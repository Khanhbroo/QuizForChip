import { useState, useEffect } from "react";
import { questions } from "../questions";

export function useQuiz() {
  const [quizSet, setQuizSet] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(1500);
  const [finished, setFinished] = useState(false);
  const [showMissing, setShowMissing] = useState(false);
  const [animating, setAnimating] = useState<"in" | "out" | null>(null);
  const [shake, setShake] = useState(false);

  const selectedQuestions = quizSet
    ? questions.slice((quizSet - 1) * 25, quizSet * 25)
    : [];

  const missingQuestions = selectedQuestions
    .map((_, idx) => idx)
    .filter((i) => answers[i] === undefined);

  const score = Object.keys(answers).filter(
    (q) => answers[parseInt(q)] === selectedQuestions[parseInt(q)].answer
  ).length;

  const handleAnswer = (index: number) => {
    // lưu đáp án
    const newAnswers = { ...answers, [current]: index };
    setAnswers(newAnswers);

    // Không auto submit ở câu cuối
    if (current === selectedQuestions.length - 1) {
      // Chỉ lưu đáp án rồi dừng
      // ✅ Không animation, không finish
      return;
    }

    // Nếu chưa phải câu cuối → chạy animation chuyển
    setAnimating("out");
    setTimeout(() => {
      setCurrent(current + 1);
      setAnimating("in");
    }, 250);
  };

  const goToQuestion = (index: number) => {
    // animation out
    setAnimating("out");

    setTimeout(() => {
      setCurrent(index);
      setAnimating("in");
    }, 250);
  };

  const goHome = () => {
    setQuizSet(null);
    setAnswers({});
    setCurrent(0);
    setFinished(false);
    setTimeLeft(1500);
  };

  useEffect(() => {
    if (!quizSet) return;

    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, quizSet]);

  return {
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
    shake,
    setShake,
    goToQuestion,
  };
}
