import React, { useState } from "react";
import Header from "../components/Header";
import NextButton from "../components/NextButton";
import FeedbackModal from "../components/FeedbackModal";

const Remind = () => {
  // 선택된 항목 상태 관리
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부

  // 질문 항목 배열
  const difficulties = ["시간 부족", "의욕 부족", "낮은 동기부여", "효과 부족"];
  const reasons = [
    "목표에 맞는 루틴 구성",
    "성취감",
    "스스로에 대한 피드백",
    "뚜렷한 목표 설정",
  ];

  // 항목별 피드백 텍스트 매핑
  const feedbackMap = {
    "시간 부족": {
      title: "시간이 부족하셨나요?",
      body: "매일 자기 전 5분도 활용해 루틴을 실천해보세요. 정해진 틀 안에서 시작하면 실천 가능성이 높아져요.",
    },
    "의욕 부족": {
      title: "의욕이 부족하셨나요?",
      body: "루틴과 현재 목표의 연결고리를 떠올려 보세요. 연결고리가 선명하면 루틴에 의욕이 생겨요.",
    },
    "낮은 동기부여": {
      title: "동기부여가 잘 되지 않았나요?",
      body: "가장 부담없고 쉬운 루틴부터 시작해보세요. 작은 성공 경험은 루틴의 동기가 될 수 있어요.",
    },
    "효과 부족": {
      title: "루틴의 효과가 부족하다고 느끼셨나요?",
      body: "루틴을 통해 얻고 싶은 구체적인 변화를 떠올려 보세요. 원하는 변화가 명확하면 동기가 생겨요.",
    },
    "목표에 맞는 루틴 구성": {
      title: "목표에 맞는 루틴 구성",
      body: "루틴이 현재 목표 달성에 어떤 도움을 주고 있는지 되짚어보세요. 목표에 적합한 루틴은 동기를 유지시켜 줘요.",
    },
    성취감: {
      title: "성취감",
      body: "스스로에게 작지만 의미 있는 보상을 시도해보세요. 성취의 기쁨은 루틴 지속의 큰 힘이 돼요.",
    },
    "스스로에 대한 피드백": {
      title: "스스로에 대한 피드백",
      body: "루틴을 하며 느끼는 점을 기록해보세요. 루틴의 가치와 의미를 발견할 수 있어요.",
    },
    "뚜렷한 목표 설정": {
      title: "뚜렷한 목표 설정",
      body: "명확하고 방향성 있는 목표는 루틴 실천의 강력한 이유가 될 수 있어요.",
    },
  };

  // 버튼 하나만 선택되도록 토글 로직
  const selectSingle = (item, setter) => {
    setter((prev) => (prev === item ? "" : item));
  };

  // 버튼 공통 스타일 클래스
  const baseBtnClass =
    "h-[40px] w-auto px-3 mb-[2px] rounded-[8px] text-[16px] text-center font-normal text-[#3B4159] bg-white border border-[#EBEBEB] outline-none focus:outline-none hover:border-[#898D9E] transition-all flex items-center justify-center";

  // 선택된 버튼 스타일 클래스
  const selectedBtnClass =
    "bg-[#F3F6FB] border-[2px] !border-[#898D9E] text-[#3B4159]";

  return (
    <div className=" w-full flex justify-center bg-white mt-[80px]">
      <div className="w-full max-w-[360px] relative">
        {/* 상단 제목 헤더 */}
        <Header title="되돌아보기" />

        {/* 질문 영역과 하단 버튼을 감싸는 컨테이너 */}
        <div className="h-[800px] justify-between flex flex-col">
          <div className="px-5">
            {/* 타이틀 및 설명 */}
            <h2 className="text-[20px] font-semibold text-[#3B4159] mb-1">
              나를 되돌아볼 수 있는 시간이에요.
            </h2>
            <p className="text-[16px] font-normal text-[#888888] mb-[40px]">
              이번 달 나의 모습을 떠올리며 아래의 질문에 답변을 선택해 주세요.
            </p>

            {/* 첫 번째 질문 - 어려웠던 점 */}
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

            {/* 두 번째 질문 - 지속 가능 이유 */}
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
          </div>

          {/* 답변 완료 버튼 */}
          <div className="mb-[42px]">
            <NextButton
              label="답변 완료"
              onClick={() => setShowModal(true)}
              disabled={!selectedDifficulty || !selectedReason} // 두 항목 모두 선택해야 활성화
            />
          </div>
        </div>
      </div>

      {/* 피드백 모달 */}
      {showModal && (
        <FeedbackModal
          selectedDifficulties={[selectedDifficulty]} // 배열 형태로 전달
          selectedReasons={[selectedReason]}
          feedbackMap={feedbackMap}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Remind;
