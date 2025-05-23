import React, { useState } from "react";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import NextButton from "../components/NextButton";

export default function RoutineEdit() {
  const [routine, setRoutine] = useState(""); // 루틴 내용
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // 삭제 모달 표시 여부

  const handleSave = () => {
    console.log("루틴 저장:", routine);
  };

  const handleDelete = () => {
    console.log("루틴 삭제됨");
    setShowDeleteConfirm(false);
  };

  return (
    <div className="w-full h-[800px] flex justify-center bg-white">
      <div className="w-full max-w-[360px] relative mt-20">
        <Header title="루틴 수정하기" />

        <div className="flex flex-col items-between justify-between h-[720px] px-5">
          {/* 이미지 영역 */}
          <div className="flex flex-col items-center px-5 ">
            <img
              src="/assets/walk.svg"
              alt="아이콘"
              className="w-[88px] h-[88px] mb-6"
            />

            {/* 루틴 입력 */}
            <TextInput
              value={routine}
              onChange={(e) => setRoutine(e.target.value)}
              placeholder="루틴을 입력해주세요."
              className="w-[320px] h-[42px] text-center"
            />
          </div>
          <div className="pb-11">
            {/* 삭제 버튼 */}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full border-[2px] border-[#ACEBDC] text-[#3B4159] text-center font-semibold text-[16px]  py-3 rounded-full"
            >
              이 루틴 삭제하기
            </button>

            {/* 수정 완료 버튼 */}
            <NextButton
              label="수정 완료"
              onClick={handleSave}
              disabled={routine.trim() === ""}
            />
          </div>
        </div>

        {/* 삭제 확인 모달 */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 bg-[#00000066] flex items-center justify-center">
            <div className="bg-white rounded-xl w-[320px] p-6 text-center mb-[150px]">
              <p className="text-[#3B4159] text-[20px] font-semibold  text-center mb-2">
                이 루틴을 정말로 삭제할까요?
              </p>
              <p className="text-[#888888] text-[16px] font-normal  text-center mb-[21px]">
                한 번 삭제한 루틴은 다시 복구할 수 없어요.
              </p>
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 border-[2px] py-2 border border-[#FFEA9A] rounded-full text-[#3B4159] text-sm"
                >
                  취소
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2 bg-[#FFEA9A] rounded-full text-[#3B4159] font-semibold text-sm"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
