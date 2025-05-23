import React, { useState } from "react";
import Header from "../components/Header";
import NextButton from "../components/NextButton";

const Remind = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  const difficulties = ["시간 부족", "의욕 부족", "낮은 동기부여", "효과 부족"];
  const reasons = [
    "목표에 맞는 루틴 구성",
    "성취감",
    "스스로에 대한 피드백",
    "뚜렷한 목표 설정",
  ];

  const selectSingle = (item, setter) => {
    setter((prev) => (prev === item ? "" : item));
  };

  const baseBtnClass =
    "h-[40px] w-auto px-3 mb-[2px] rounded-[8px] text-[16px] text-center font-normal text-[#3B4159] bg-white border border-[#EBEBEB] outline-none focus:outline-none hover:border-[#898D9E] transition-all flex items-center justify-center";

  const selectedBtnClass =
    "bg-[#F3F6FB] border-[2px] !border-[#898D9E] text-[#3B4159]";

  return (
    <div className="w-full min-h-screen flex justify-center bg-white mt-[80px]">
      <div className="w-full max-w-[360px] relative">
        <Header title="되돌아보기" />

        <div className="px-5 pb-28">
          <h2 className="text-[20px] font-semibold text-[#3B4159] mb-1">
            나를 되돌아볼 수 있는 시간이에요.
          </h2>
          <p className="text-[16px] font-normal text-[#888888] mb-[40px]">
            이번 달 나의 모습을 떠올리며 아래의 질문에 답변을 선택해 주세요.
          </p>

          <div className="mb-12">
            <h3 className="text-[#3B4159] text-sm font-medium mb-4">
              루틴을 실천할 때 가장 어려웠던 점은 무엇인가요?
            </h3>
            <div className="flex flex-wrap gap-[10px] text-[16px]">
              {difficulties.map((item) => (
                <button
                  key={item}
                  onClick={() => selectSingle(item, setSelectedDifficulty)}
                  className={`${baseBtnClass} ${
                    selectedDifficulty === item ? selectedBtnClass : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-[22px]">
            <h3 className="text-[#3B4159] text-sm font-medium mb-4">
              루틴을 계속 이어갈 수 있었던 이유는 무엇인가요?
            </h3>
            <div className="flex flex-wrap gap-[10px]">
              {reasons.map((item) => (
                <button
                  key={item}
                  onClick={() => selectSingle(item, setSelectedReason)}
                  className={`${baseBtnClass} ${
                    selectedReason === item ? selectedBtnClass : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <NextButton
            label="답변 완료"
            onClick={() => console.log("제출")}
            disabled={!selectedDifficulty || !selectedReason}
          />
        </div>
      </div>
    </div>
  );
};

export default Remind;
