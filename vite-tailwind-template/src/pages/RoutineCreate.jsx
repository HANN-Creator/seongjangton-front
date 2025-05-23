import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DoneIcon from "../assets/Done.png";

export default function RoutineCreate() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const routines = state?.routines || [];

  return (
    <div className="min-h-screen flex flex-col bg-white px-4 pt-4">
      {/* 뒤로가기 버튼 */}
      <div className="h-12 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2">
          <FaArrowLeft size={20} className="text-gray-600" />
        </button>
      </div>

      {/* 제목 및 안내 텍스트 */}
      <h1 className="text-center text-xl font-semibold text-gray-900 mt-2">
        루틴이 완성되었어요!
      </h1>
      <p className="mt-1 text-center text-sm text-gray-600">
        아래의 루틴을 매일 실천해볼까요?
      </p>

      {/* 루틴 리스트 */}
      <div className="mt-6 space-y-3 flex-1">
        {routines.map((r) => (
          <div
            key={r.id}
            className="relative w-full max-w-[280px] mx-auto bg-white border border-gray-200 rounded-lg shadow"
          >
            {/* 체크 아이콘: 박스 외곽에 절대 위치 */}
            <img
              src={DoneIcon}
              alt="완료 아이콘"
              className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-6"
            />
            {/* 루틴 아이콘과 텍스트 */}
            <div className="flex items-center pl-4 py-3">
              {r.icon && (
                <img
                  src={r.icon}
                  alt={r.label}
                  className="w-6 h-6 mr-3 flex-shrink-0"
                />
              )}
              <span className="text-base text-gray-900">{r.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 실천하러 가기 버튼 */}
      <button
        onClick={() => navigate("/")}
        className="mb-8 w-full max-w-md h-12 bg-[#ACEBDC] rounded-full mx-auto text-center text-gray-900 font-medium shadow-md"
      >
        실천하러 가기
      </button>
    </div>
  );
}
