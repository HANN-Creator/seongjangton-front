import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Remind = () => {
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedReasons, setSelectedReasons] = useState([]);

  const difficulties = ["시간 부족", "의욕 부족", "낮은 동기부여", "효과 부족"];

  const reasons = [
    "목표에 맞는 루틴 구성",
    "성취감",
    "스스로에 대한 피드백",
    "뚜렷한 목표 설정",
  ];

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-white mt-[80px]">
      <div className="w-full max-w-[360px] relative">
        <Header title="되돌아보기" />

        <div className="px-5 py-6">
          <h2 className="text-[#3B4159] text-[16px] font-semibold mb-1">
            나를 되돌아볼 수 있는 시간이에요.
          </h2>
          <p className="text-[#3B4159] text-[12px] mb-6">
            이번 달 나의 모습을 떠올리며 아래의 질문에 답변을 선택해 주세요.
          </p>

          <div className="mb-4">
            <h3 className="text-[#3B4159] text-sm font-medium mb-2">
              루틴을 실천할 때 가장 어려웠던 점은 무엇인가요?
            </h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    toggleSelection(
                      item,
                      selectedDifficulties,
                      setSelectedDifficulties
                    )
                  }
                  className={`px-3 py-1 rounded-md border text-sm ${
                    selectedDifficulties.includes(item)
                      ? "bg-[#F3F6FB] border-[#3B4159] text-[#3B4159]"
                      : "bg-white border-[#D9D9D9] text-[#3B4159]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#3B4159] text-sm font-medium mb-2">
              루틴을 계속 이어갈 수 있었던 이유는 무엇인가요?
            </h3>
            <div className="flex flex-wrap gap-2">
              {reasons.map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    toggleSelection(item, selectedReasons, setSelectedReasons)
                  }
                  className={`px-3 py-1 rounded-md border text-sm ${
                    selectedReasons.includes(item)
                      ? "bg-[#F3F6FB] border-[#3B4159] text-[#3B4159]"
                      : "bg-white border-[#D9D9D9] text-[#3B4159]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button className="w-full bg-[#B9E4DC] text-[#3B4159] py-3 rounded-full text-sm font-semibold">
            답변 완료
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Remind;
