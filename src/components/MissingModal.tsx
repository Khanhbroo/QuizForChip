import React from "react";

type MissingModalProps = {
  missingQuestions: number[];
  answers: Record<number, number>;
  selectedQuestions: Array<any>;
  setCurrent: (i: number) => void;
  setShowMissing: (b: boolean) => void;
};

export default function MissingModal({
  missingQuestions,
  answers,
  selectedQuestions,
  setCurrent,
  setShowMissing,
}: MissingModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animation-fade"
      onClick={() => setShowMissing(false)} // click nền để đóng
    >
      <div
        className="bg-white p-6 rounded-3xl border-4 border-red-400 shadow-2xl w-[90%] md:w-[500px] text-center animate-fade"
        onClick={(e) => e.stopPropagation()} // chặn click bên trong
      >
        <h2 className="text-2xl font-bold text-red-600 mb-3">
          ⚠ Bạn còn thiếu {missingQuestions.length} câu!
        </h2>

        <p className="text-pink-900 font-semibold">
          Nhấn vào câu bạn chưa làm để chọn lại:
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
                className={`p-3 rounded-xl border font-bold transition active:scale-95 ${
                  done
                    ? "bg-green-200 border-green-600 text-green-800"
                    : "bg-red-200 border-red-600 text-red-800"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowMissing(false)}
          className="mt-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
