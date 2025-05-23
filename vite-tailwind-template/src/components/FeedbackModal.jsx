import React from "react";

const FeedbackModal = ({
  selectedDifficulties,
  selectedReasons,
  feedbackMap,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[320px] absolute top-[23%]">
        <h3 className="text-lg font-bold text-[#3B4159] mb-4">
          앞으로는 이렇게 해보세요!
        </h3>
        <ul className="text-sm text-[#3B4159] space-y-2 list-disc pl-5">
          {selectedDifficulties.map((d) => (
            <li key={d}>{feedbackMap[d]}</li>
          ))}
          {selectedReasons.map((r) => (
            <li key={r}>{feedbackMap[r]}</li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="w-full bg-[#FFEA9A] text-[#3B4159] mt-4 py-2 rounded-full font-semibold"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
