import React, { useState } from "react";
import NextButton from "../components/NextButton";
import Header from "../components/Header";

const Remind = () => {
  const difficulties = ["시간 부족", "의욕 부족", "낮은 동기부여", "효과 부족"];
  const reasons = [
    "목표에 맞는 루틴 구성",
    "성취감",
    "스스로에 대한 피드백",
    "뚜렷한 목표 설정",
  ];

  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-[360px] bg-white flex flex-col min-h-screen">
        <Header title="되돌아보기" />

        <div className="flex-grow px-5 py-6">
          <h2 className="text-base font-semibold text-[#3B4159] mb-1">
            나를 되돌아볼 수 있는 시간이에요.
          </h2>
          <p className="text-sm text-[#9FA4B0] mb-6">
            이번 달 나의 모습을 떠올리며 아래의 질문에 답변을 선택해주세요.
          </p>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#3B4159] mb-3">
              루틴을 실천할 때 가장 어려웠던 점은 무엇인가요?
            </h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    setSelectedDifficulty(
                      selectedDifficulty === item ? "" : item
                    )
                  }
                  className={`px-4 py-2 rounded-full border text-sm ${
                    selectedDifficulty === item
                      ? "bg-[#F5F7FA] text-[#3B4159] border-[#3B4159]"
                      : "bg-white text-[#3B4159] border-[#E0E3E7]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-[#3B4159] mb-3">
              루틴을 계속 이어갈 수 있었던 이유는 무엇인가요?
            </h3>
            <div className="flex flex-wrap gap-2">
              {reasons.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    setSelectedReason(selectedReason === item ? "" : item)
                  }
                  className={`px-4 py-2 rounded-full border text-sm ${
                    selectedReason === item
                      ? "bg-[#F5F7FA] text-[#3B4159] border-[#3B4159]"
                      : "bg-white text-[#3B4159] border-[#E0E3E7]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <NextButton
            className="absolute bottom-0"
            label="답변 완료"
            onClick={() =>
              console.log({
                selectedDifficulty,
                selectedReason,
              })
            }
            disabled={!selectedDifficulty || !selectedReason}
          />
        </div>
      </div>
    </div>
  );
};

export default Remind;
