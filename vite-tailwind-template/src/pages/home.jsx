import React from "react";
import Header from "../components/Header";
import BottomBar from "../components/BottomBar";
import Checklist from "../components/Checklist";

const home = () => {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-[360px] relative bg-[#ffffff]">
        <Header />
        <div>
          <div className="pb-[20px] mt-[56px] py-[24px] px-[20px]">
            <div className="flex items-center gap-2">
              <span className="bg-[#DEF7F1] text-[#3B4159] text-[20px] font-semibold font-pretendard text-center inline-flex items-center mb-[19px]">
                루프님, 오늘도 힘내세요!
                <img src="/assets/hug.svg" alt="icon" className="w-4 h-4" />
              </span>
            </div>
            <p className="text-[#888] text-[16px] font-normal font-pretendard">
              설정한 목표 키워드
            </p>

            <p className="mt-1 text-[20px] font-semibold text-[#3B4159] font-pretendard">
              <span className="inline-block bg-[#DEF7F1] px-1 mb-[19px]">
                건강
              </span>
            </p>

            <div className="flex gap-2">
              <div className="flex flex-col items-center gap-2 p-2 rounded bg-[#F8FDFC]">
                <p className="text-[#3B4159] text-[16px] font-semibold font-pretendard text-center self-stretch">
                  D+1
                </p>
                <p className="text-[#3B4159] text-[12px] font-normal font-pretendard text-center self-stretch">
                  루틴 시작한지
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 p-2 rounded bg-[#F8FDFC]">
                <p className="text-[#3B4159] text-[16px] font-semibold font-pretendard text-center self-stretch">
                  12
                </p>
                <p className="text-[#3B4159] text-[12px] font-normal font-pretendard text-center self-stretch">
                  누적 실천일
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#F8FDFC] min-h-[calc(100vh-300px)] px-5 pt-4 pb-28">
            <p className="text-[#3B4159] text-[16px] font-semibold font-pretendard pb-[16px]">
              Today{" "}
              <span className="text-[#888] text-[12px] font-normal font-pretendard">
                2025.05.18
              </span>
            </p>
            <Checklist icon="/assets/walking.svg" text="30분 이상 걷기" />
            <Checklist icon="/assets/walking.svg" text="30분 이상 걷기" />

            <Checklist icon="/assets/walking.svg" text="30분 이상 걷기" />
          </div>
        </div>
        <BottomBar />
      </div>
    </div>
  );
};

export default home;
