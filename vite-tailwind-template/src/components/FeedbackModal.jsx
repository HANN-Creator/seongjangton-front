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
        <div className="flex justify-center items-center mb-6">
          <img className="w-8" src="/assets/bulb.svg"></img>
          <h3 className="text-lg font-bold text-[#3B4159]  text-center">
            앞으로는 이렇게 해보세요!
          </h3>
        </div>

        <ul className="text-sm text-[#3B4159] space-y-4">
          {[...selectedDifficulties, ...selectedReasons].map((key) => (
            <li key={key}>
              <p className="text-[#3B4159] font-[Pretendard] text-[12px] font-bold leading-normal mb-2">
                • {feedbackMap[key].title}
              </p>
              <p className="text-[#3B4159] font-[Pretendard] text-[12px] font-normal leading-normal">
                {feedbackMap[key].body}
              </p>
            </li>
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
