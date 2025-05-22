import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import BottomBar from "../components/BottomBar";
import Checklist from "../components/Checklist";

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [today, setToday] = useState("");
  const [dPlus, setDPlus] = useState(0);
  const [achieveDays, setAchieveDays] = useState(0);
  const [routines, setRoutines] = useState([]);

  const userId = new URLSearchParams(window.location.search).get("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 사용자 정보 조회
        const userRes = await axios.get("/user", { params: { userId } });
        const userData = userRes.data.result;
        setUserInfo(userData);

        // 홈 정보 조회 (키워드 + 루틴 리스트)
        const homeRes = await axios.get("/home", { params: { userId } });
        const homeData = homeRes.data.result;

        setRoutines(
          homeData.routines.map((routine, index) => ({
            id: index,
            text: routine,
            icon: "/assets/walking.svg",
          }))
        );

        // 날짜 포맷
        const today = new Date();
        const formattedDate = today.toISOString().slice(0, 10);
        setToday(formattedDate);

        // D+N 계산
        const startDate = new Date(userData.keyword?.routines?.[0]?.createdAt);
        const diffTime = today - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        setDPlus(diffDays >= 0 ? `D+${diffDays}` : "D-?");

        // 누적 실천일 계산 (성공한 루틴 수)
        const totalSuccess =
          userData.keyword?.routines?.filter((r) => r.status === "SUCCESS")
            .length || 0;
        setAchieveDays(totalSuccess);
      } catch (err) {
        console.error("데이터 조회 실패", err);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-[360px] relative bg-[#ffffff]">
        <Header />
        <div>
          <div className="pb-[20px] mt-[56px] py-[24px] px-[20px]">
            <div className="flex items-center gap-2">
              <span className="bg-[#DEF7F1] text-[#3B4159] text-[20px] font-semibold font-pretendard text-center inline-flex items-center mb-[19px]">
                {userInfo?.name || "사용자"}님, 오늘도 힘내세요!
                <img src="/assets/hug.svg" alt="icon" className="w-4 h-4" />
              </span>
            </div>
            <p className="text-[#888] text-[16px] font-normal font-pretendard">
              설정한 목표 키워드
            </p>
            <p className="mt-1 text-[20px] font-semibold text-[#3B4159] font-pretendard">
              <span className="inline-block bg-[#DEF7F1] px-1 mb-[19px]">
                {userInfo?.keyword?.content || "키워드 없음"}
              </span>
            </p>

            <div className="flex gap-2">
              <div className="flex flex-col items-center gap-2 p-2 rounded bg-[#F8FDFC]">
                <p className="text-[#3B4159] text-[16px] font-semibold font-pretendard text-center self-stretch">
                  {dPlus}
                </p>
                <p className="text-[#3B4159] text-[12px] font-normal font-pretendard text-center self-stretch">
                  루틴 시작한지
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 p-2 rounded bg-[#F8FDFC]">
                <p className="text-[#3B4159] text-[16px] font-semibold font-pretendard text-center self-stretch">
                  {achieveDays}
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
                {today}
              </span>
            </p>
            {routines.map((routine) => (
              <Checklist
                key={routine.id}
                icon={routine.icon}
                text={routine.text}
              />
            ))}
          </div>
        </div>
        <BottomBar />
      </div>
    </div>
  );
};

export default Home;
