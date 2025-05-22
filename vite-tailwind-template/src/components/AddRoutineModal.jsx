import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import CheckIcon from "../assets/check-icon.png"; // 기본 프리뷰용 아이콘
import PencilIcon from "../assets/pen.png";
import HouseIcon from "../assets/school.png";
import BookIcon from "../assets/book.png";
import SunIcon from "../assets/sun.png";
import PlateIcon from "../assets/plate.png";
import MoneyIcon from "../assets/money.png";
import RunIcon from "../assets/run.png";
import FamilyIcon from "../assets/lotus.png";

const ICON_OPTIONS = [
  { id: "pencil", src: PencilIcon },
  { id: "house", src: HouseIcon },
  { id: "book", src: BookIcon },
  { id: "sun", src: SunIcon },
  { id: "plate", src: PlateIcon },
  { id: "money", src: MoneyIcon },
  { id: "run", src: RunIcon },
  { id: "family", src: FamilyIcon },
];

export default function AddRoutineModal({ onClose, onCreate }) {
  // phase: 'icon' → 'confirm'
  const [phase, setPhase] = useState("icon");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
  const userId = localStorage.getItem("userId");

  const handleIconConfirm = () => {
    if (selectedIcon) setPhase("confirm");
  };

  const handleAdd = async () => {
    if (!label.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/routines?userId=${encodeURIComponent(userId)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            routineList: [label.trim()], // <-- 여기를 이렇게
          }),
        }
      );
      const { result: newId } = await res.json();
      // 부모에 새 루틴 전달 후 모달 닫기
      onCreate({ id: newId, name: label.trim() });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* 헤더 */}
      <header className="h-12 flex items-center justify-center border-b bg-white relative">
        <button
          onClick={onClose}
          className="absolute left-4 p-2 bg-gray-100 rounded-lg"
        >
          <FaArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-medium text-gray-800">루틴 추가하기</h1>
      </header>

      <div className="flex-1 flex flex-col items-center pt-6 px-4">
        {/* 아이콘 프리뷰 */}
        <div className="w-28 h-28 rounded-full border-2 border-green-200 bg-green-50 flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-full border border-gray-300 bg-white flex items-center justify-center">
            <img
              src={
                phase === "icon"
                  ? selectedIcon
                    ? ICON_OPTIONS.find((i) => i.id === selectedIcon).src
                    : CheckIcon
                  : ICON_OPTIONS.find((i) => i.id === selectedIcon).src
              }
              className="w-8 h-8"
              alt="preview"
            />
          </div>
        </div>

        {/* 입력창 */}
        <input
          type="text"
          placeholder="루틴을 입력해주세요."
          disabled={phase === "icon"}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className={
            `w-full max-w-[320px] h-12 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 ` +
            (phase === "icon"
              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed mb-6"
              : "bg-white border-gray-300 text-gray-900 mb-4")
          }
        />

        {/* 아이콘 목록 (원형, 크기 더 키움, 버튼 바로 위에 배치) */}
        {phase === "icon" && (
          <div className="grid grid-cols-4 gap-x-6 gap-y-4 mt-auto mb-1">
            {ICON_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedIcon(opt.id)}
                className={`w-20 h-20 bg-white rounded-full border border-gray-200 flex items-center justify-center transition-transform ${
                  selectedIcon === opt.id
                    ? "ring-2 ring-[#898D9E] scale-105"
                    : "hover:scale-105"
                }`}
              >
                <img
                  src={opt.src}
                  alt={opt.id}
                  className="w-14 h-14 object-contain"
                />
              </button>
            ))}
          </div>
        )}

        {/* 하단 버튼 */}
        {phase === "icon" ? (
          <button
            onClick={handleIconConfirm}
            disabled={!selectedIcon}
            className={
              `w-full max-w-[328px] mx-auto h-12 rounded-[24px] text-base font-medium mt-8 mb-10 transition-colors ` +
              (selectedIcon
                ? "bg-yellow-300 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed")
            }
          >
            선택 완료
          </button>
        ) : (
          <button
            onClick={handleAdd}
            disabled={!label.trim() || loading}
            className={
              `w-full max-w-[328px] mx-auto h-12 rounded-[24px] text-base font-medium mt-auto mb-10 transition-colors ` +
              (label.trim()
                ? "bg-green-400 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed")
            }
          >
            {loading ? "추가 중…" : "추가하기"}
          </button>
        )}
      </div>
    </div>
  );
}
