import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Header from "../components/Header";
import NextButton from "../components/NextButton";
import AddRoutineModal from "../components/AddRoutineModal";

import HealthImg from "../assets/건강2 1.png";
import SelfDevImg from "../assets/자기계발 1.png";
import RelationshipImg from "../assets/인간관계 2.png";

import FloatingIcon from "../assets/Floating.png";

import StretchIcon from "../assets/스트레칭.png";
import DinnerIcon from "../assets/식단.png";
import SleepIcon from "../assets/취침.png";
import WaterIcon from "../assets/물.png";
import MeditateIcon from "../assets/영양제.png";

import ThreeLineJournalIcon from "../assets/일기.png";
import ReadBookIcon from "../assets/독서.png";
import Study15Icon from "../assets/공부.png";
import PlanTodoIcon from "../assets/우선순위.png";
import ReadNewsIcon from "../assets/신문.png";

import LoveMsgIcon from "../assets/메시지.png";
import ComplimentIcon from "../assets/칭찬.png";
import JournalEmotionIcon from "../assets/기록.png";
import ThinkThanksIcon from "../assets/떠올리기.png";
import CallFamilyIcon from "../assets/말투.png";

const GOAL_OPTIONS = [
  { id: "health", label: "건강", img: HealthImg },
  { id: "selfdev", label: "자기계발", img: SelfDevImg },
  { id: "relationship", label: "인간관계", img: RelationshipImg },
];

const ROUTINE_ICONS = {
  // 건강
  stretch: StretchIcon,
  early_dinner: DinnerIcon,
  sleep8h: SleepIcon,
  drink_water: WaterIcon,
  meditate: MeditateIcon,
  // 자기계발
  three_line_journal: ThreeLineJournalIcon,
  read_book: ReadBookIcon,
  study_15: Study15Icon,
  plan_todo: PlanTodoIcon,
  read_news: ReadNewsIcon,
  // 인간관계
  love_msg: LoveMsgIcon,
  compliment: ComplimentIcon,
  journal_emotion: JournalEmotionIcon,
  think_thanks: ThinkThanksIcon,
  call_family: CallFamilyIcon,
};

const DEFAULT_ROUTINES = {
  health: [
    { id: "stretch", label: "스트레칭하기" },
    { id: "early_dinner", label: "저녁노을 전 식사하기" },
    { id: "sleep8h", label: "8시간 이상 취침하기" },
    { id: "drink_water", label: "아침에 물 한 잔" },
    { id: "meditate", label: "명상하기" },
  ],
  selfdev: [
    { id: "three_line_journal", label: "세 줄 일기쓰기" },
    { id: "read_book", label: "하루 1장 독서하기" },
    { id: "study_15", label: "관심 분야 15분 공부" },
    { id: "plan_todo", label: "오늘 할 일 우선순위" },
    { id: "read_news", label: "뉴스레터 읽기" },
  ],
  relationship: [
    { id: "love_msg", label: "연인에게 메시지" },
    { id: "compliment", label: "칭찬 한 마디" },
    { id: "journal_emotion", label: "감정 일기쓰기" },
    { id: "think_thanks", label: "감사한 사람 떠올리기" },
    { id: "call_family", label: "가족에게 전화" },
  ],
};

export default function GoalsPage() {
  const [phase, setPhase] = useState("keyword");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [routines, setRoutines] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8080";
  const userId = localStorage.getItem("userId");

  // 1) 키워드 저장하고, 프론트 기본 리스트로 전환
  const handleKeywordNext = async () => {
    if (!selectedKeyword) return;
    setLoading(true);
    setError(null);
    try {
      // 키워드만 저장
      const res = await fetch(
        `${apiBase}/api/${userId}/keyword?keyword=${encodeURIComponent(
          selectedKeyword
        )}`,
        { method: "POST" }
      );
      if (!res.ok) throw new Error("키워드 저장 실패");

      // 추천 루틴은 프론트 기본 리스트에서 불러오기
      setRoutines(DEFAULT_ROUTINES[selectedKeyword] || []);
      setPhase("routines");
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2) 추천 루틴 토글
  const toggle = (id) => {
    setSelected((curr) =>
      curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id]
    );
  };

  // 4) 선택된 루틴 저장하고 다음으로
  const handleRoutinesNext = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const routineList = selected
        .map((id) => routines.find((r) => r.id === id)?.label)
        .filter((name) => name);
      const res = await fetch(
        `${apiBase}/routines?userId=${encodeURIComponent(userId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ routineList }),
        }
      );
      if (!res.ok) {
        const text = await res.text();
        console.error("Error response:", text);
        throw new Error("루틴 저장 실패");
      }

      // 선택된 루틴 객체 배열만 뽑아서
      const selectedRoutines = routines
        .filter((r) => selected.includes(r.id))
        .map((r) => ({
          id: r.id,
          label: r.label,
          icon: ROUTINE_ICONS[r.id],
        }));

      // state로 넘겨줍니다.
      navigate("/routine/create", {
        state: { routines: selectedRoutines },
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewRoutine = (created) => {
    setRoutines((r) => [...r, { id: created.id, label: created.name }]);
    setSelected((s) => [...s, created.id]);
    setShowAddModal(false);
  };

  if (loading) return <div className="p-4 text-center">처리 중...</div>;

  return (
    <div className="min-h-screen bg-white">
      <Header showBack />

      <div className="mt-2 w-full h-1 bg-gray-200">
        <div className="w-3/4 h-full bg-[#ACEBDC]" />
      </div>

      <div className="px-4 mt-6 flex flex-col items-center">
        {phase === "keyword" && (
          <>
            <h2 className="text-lg font-semibold mb-1">
              현재 이루고 싶은 목표를 알려주세요.
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              목표 키워드에 맞는 루틴을 추천해드릴게요!
            </p>
            {GOAL_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setSelectedKeyword(o.id)}
                className={`
                    flex justify-between items-center
                    w-[320px] px-[20px] py-[12px] mb-4
                    border-2 rounded-lg focus:outline-none focus:border-[#898D9E]
                    ${
                      selectedKeyword === o.id
                        ? "border-[#898D9E] text-gray-900"
                        : "border-gray-300"
                    }
                    `}
              >
                <span className="text-base font-medium">{o.label}</span>
                <img
                  src={o.img}
                  alt={o.label}
                  className="flex-shrink-0 w-[160px] h-auto"
                />
              </button>
            ))}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-white">
              <NextButton
                onClick={handleKeywordNext}
                disabled={!selectedKeyword}
                label="다음"
              />
            </div>
          </>
        )}

        {phase === "routines" && (
          <>
            <img
              src={GOAL_OPTIONS.find((o) => o.id === selectedKeyword)?.img}
              alt={selectedKeyword}
              className="w-32 h-auto mt-6 mx-auto"
            />
            <div className="px-4 mt-1">
              <h2 className="text-lg font-semibold">이런 루틴은 어때요?</h2>
              <p className="mt-1 mb-6 text-sm text-gray-600">
                루틴은 최대 8개까지 선택할 수 있어요.
              </p>

              <div className="flex flex-col space-y-3">
                {routines.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`flex items-center w-[320px] px-4 py-3 mx-auto border rounded-lg focus:outline-none ${
                      selected.includes(item.id)
                        ? "border-[#898D9E] border-[2px] bg-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <img
                      src={ROUTINE_ICONS[item.id]}
                      alt={item.label}
                      className="w-6 h-6 mr-3 flex-shrink-0"
                    />
                    <span className="text-base text-gray-900">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 커스텀 루틴 추가 버튼 (노란색 원형 +) */}
            <button
              onClick={() => setShowAddModal(true)}
              className="fixed bottom-24 right-6 bg-transparent p-0"
            >
              <img
                src={FloatingIcon}
                alt="루틴 추가"
                className="w-14 h-14 object-contain"
              />
            </button>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-white">
              <NextButton
                onClick={handleRoutinesNext}
                disabled={selected.length === 0}
                label="다음"
              />
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {/* ▶︎ AddRoutineModal 렌더링 */}
      {showAddModal && (
        <AddRoutineModal
          onClose={() => setShowAddModal(false)}
          onCreate={handleNewRoutine}
        />
      )}
    </div>
  );
}
