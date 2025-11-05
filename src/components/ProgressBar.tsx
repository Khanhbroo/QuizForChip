type ProgressBarProps = {
  selectedQuestions: Array<any>;
  answers: Record<number, number>;
  current: number;
  setCurrent: (num: number) => void;
};

export default function ProgressBar({
  selectedQuestions,
  answers,
  current,
  setCurrent,
}: ProgressBarProps) {
  return (
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
  );
}
