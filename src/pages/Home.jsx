import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaRunning } from 'react-icons/fa';

export default function Home() {
  const [routines, setRoutines] = useState([
    { id: 1, label: '30분 이상 걷기', done: false },
    { id: 2, label: '30분 이상 걷기', done: false },
    { id: 3, label: '30분 이상 걷기', done: false },
    { id: 4, label: '30분 이상 걷기', done: false },
    { id: 5, label: '30분 이상 걷기', done: false },
  ]);

  const toggleDone = id => {
    setRoutines(routines.map(r =>
      r.id === id ? { ...r, done: !r.done } : r
    ));
  };

  return (
    <div className="relative min-h-screen bg-green-50 pb-16">
      {/* 상단 헤더 */}
      <Header title="루틴" />

      <div className="px-4 pt-6">
        {/* 인사 및 키워드 */}
        <h1 className="text-2xl font-bold">루프님, 오늘도 힘내세요! 🍀</h1>
        <p className="text-sm text-gray-600 mt-1">설정한 루틴 키워드</p>
        <p className="text-lg font-semibold mt-1">건강</p>

        {/* 통계 */}
        <div className="flex items-center mt-4 space-x-6">
          <div>
            <p className="text-xl font-bold">D+1</p>
            <p className="text-xs text-gray-500">연속 실천</p>
          </div>
          <div>
            <p className="text-xl font-bold">12</p>
            <p className="text-xs text-gray-500">총 실천</p>
          </div>
        </div>

        {/* 오늘 루틴 리스트 */}
        <div className="mt-6">
          <h2 className="text-sm font-medium text-gray-700">Today 2025.05.18</h2>
          <ul className="mt-3 space-y-4">
            {routines.map(item => (
              <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaRunning className="text-green-400" />
                  <span className="text-base">{item.label}</span>
                </div>
                <button
                  onClick={() => toggleDone(item.id)}
                  className={`h-5 w-5 rounded-full border-2 transition-colors duration-200 ${
                    item.done
                      ? 'bg-green-400 border-green-400'
                      : 'border-gray-300'
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 하단 내비게이션 */}
      <Footer />
    </div>
  );
}
