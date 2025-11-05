import { useState, useEffect, useRef } from "react";
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
  const [questionStart, setQuestionStart] = useState(Date.now());
  const [fastMode, setFastMode] = useState(false);
  const [fastTimer, setFastTimer] = useState<number | null>(null);
  const fastRef = useRef<HTMLDivElement | null>(null);

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
    const now = Date.now();
    const elapsed = (now - questionStart) / 1000; // tính giây trả lời

    // ✅ Nếu trả lời dưới 10 giây → kích hoạt hiệu ứng
    if (elapsed < 10) {
      setFastMode(true);

      // clear timer cũ nếu đang tồn tại
      if (fastTimer) {
        clearTimeout(fastTimer);
      }

      const t = setTimeout(() => {
        setFastMode(false);
      }, 700); // animation 0.7s rất mượt

      setFastTimer(t);
    }

    // ✅ Lưu đáp án
    const newAnswers = { ...answers, [current]: index };
    setAnswers(newAnswers);

    // ✅ Nếu chưa phải câu cuối → chuyển câu có animation
    if (current < selectedQuestions.length - 1) {
      setAnimating("out");

      setTimeout(() => {
        setCurrent(current + 1);
        setAnimating("in");
        setQuestionStart(Date.now()); // ✅ reset thời gian câu mới
      }, 250);
    } else {
      // ✅ Đã đến câu cuối → không auto nộp
      if (missingQuestions.length === 0) {
        setShowMissing(false);
      } else {
        setShowMissing(true);
      }
    }
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
    setShowMissing(false);
    setAnimating(null);
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
    fastMode,
    fastRef,
  };
}
