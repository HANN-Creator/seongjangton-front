import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { format } from "date-fns";

const Report = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const routines = [
    { icon: "🚿", label: "아침에 물 한 잔", percent: 80 },
    { icon: "🚿", label: "아침에 물 한 잔", percent: 60 },
    { icon: "🚿", label: "아침에 물 한 잔", percent: 40 },
    { icon: "🚿", label: "아침에 물 한 잔", percent: 0 },
    { icon: "🚿", label: "아침에 물 한 잔", percent: 80 },
  ];

  const getBoxes = (percent) => {
    const filled = Math.floor(percent / 20);
    return Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className={`w-[24px] h-[24px] rounded-md ${
          i < filled ? "bg-teal-200" : "bg-gray-200"
        }`}
      ></div>
    ));
  };

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-[360px] relative bg-white">
        <Header />

        {/* 날짜 네비게이션 */}
        <div className="flex justify-center items-center gap-2 mt-[80.5px]">
          <button
            onClick={prevMonth}
            className="w-[20px] h-[20px] aspect-square text-[#3B4159] text-xl flex justify-center items-center bg-transparent border-none outline-none ring-0 focus:outline-none"
          >
            &lt;
          </button>
          <span className="text-[#3B4159] mt-1 text-[16px] font-[Pretendard] font-semibold">
            {format(currentMonth, "yyyy년 MM월")}
          </span>
          <button
            onClick={nextMonth}
            className="w-[20px] h-[20px] aspect-square text-[#3B4159] text-xl flex justify-center items-center bg-transparent border-none outline-none ring-0 focus:outline-none"
          >
            &gt;
          </button>
        </div>

        {/* 루틴 리스트 */}
        <div className="px-5 py-5 bg-white">
          <div className="space-y-2">
            {routines.map((routine, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xl">{routine.icon}</span>
                <span className="text-sm w-[120px] text-[#3B4159] font-normal font-[Pretendard]">
                  {routine.label}
                </span>
                <span className="text-sm w-[30px] text-[#3B4159] font-normal font-[Pretendard]">
                  {routine.percent}%
                </span>
                <div className="flex gap-1">{getBoxes(routine.percent)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 투두 아래 민트 배경 구역 */}
        <div className="min-h-[calc(100vh-300px)] w-full bg-[#F9FCFC]"></div>

        {/* 말풍선 + 전구 */}
        <div className="fixed bottom-[120px] right-[40px] z-50 flex flex-col items-end gap-2">
          <div className="relative w-[152px] h-[61px]">
            <img
              src="/assets/speechballoon.svg"
              alt="말풍선"
              className="w-full h-full"
            />
            <div className="absolute top-[10px] left-[8px] right-[8px] text-[12px] leading-tight text-center text-[#3c3c3c] font-medium">
              한 달동안 루틴을 실천하며
              <br />
              느낀 점을 알려주세요!
            </div>
          </div>
          <img src="/assets/bulb.svg" alt="전구 아이콘" />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Report;
