import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import NextButton from '../components/NextButton';

export default function UserInfoPage() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  // 로그인 후 저장된 userId를 localStorage 등에서 가져옵니다.
  const userId = localStorage.getItem('userId');

 useEffect(() => {
    async function fetchProfile() {
      // 개발 환경에서는 백엔드 호출을 건너뛰고 바로 폼을 보여줌
      if (import.meta.env.DEV) {
        setLoading(false);
        return;
      }
      if (!userId) {
        navigate('/login');
        return;
      }
      try {
        // 기존 회원정보 조회 (GET /user?userId={userId})
        const res1 = await fetch(`http://localhost:8080/user?userId=${userId}`);
        if (!res1.ok) throw new Error('회원정보 조회 실패');
        const data1 = await res1.json();
        const userInfo = data1.result;
        if (userInfo?.name && userInfo?.gender) {
          // 2) 회원정보는 있는데 루틴이 있는지 확인
          const res2 = await fetch(`http://localhost:8080/home?userId=${userId}`);
          if (!res2.ok) throw new Error('홈 정보 조회 실패');
          const data2 = await res2.json();
          const routines = data2.result?.routines || [];
          if (routines.length > 0) {
            navigate('/', { replace: true });
            return;
          }
          // 루틴 없으면 생성 단계로
          navigate('/routine/create', { replace: true });
          return;
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [userId, navigate]);

  const handleNext = async () => {
    if (!userId) return;
    try {
      // 회원정보 입력 (POST /api/member/info)
      const res = await fetch('http://localhost:8080/api/member/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, name, gender }),
      });
      if (!res.ok) throw new Error('회원정보 저장 실패');
      navigate('/routine/create');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  
    if (loading) {
    return <p className="p-4 text-center">로딩 중...</p>;
  }

  return (
    <div className="relative min-h-screen bg-white">
      <Header showBack />

      {/* 진행 바: 사용자 정보 단계가 1/4 임을 나타냅니다 */}
      <div className="mt-2 w-full h-1 bg-gray-200">
        <div className="w-1/4 h-full bg-green-400" />
      </div>

      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold text-gray-800">
          나는 어떤 사람인지 알려주세요!
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          루틴을 추천하는데 도움이 돼요.
        </p>

        {/* 이름 입력 필드 */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-green-400"
          />
        </div>

        {/* 성별 선택 버튼 */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">성별</label>
          <div className="mt-2 flex space-x-4">
            <button
              type="button"
              onClick={() => setGender('MALE')}
              className={`flex-1 py-2 rounded-lg border text-center ${
                gender === 'MALE'
                  ? 'bg-green-100 border-green-400'
                  : 'border-gray-300'
              }`}
            >
              남
            </button>
            <button
              type="button"
              onClick={() => setGender('FEMALE')}
              className={`flex-1 py-2 rounded-lg border text-center ${
                gender === 'FEMALE'
                  ? 'bg-green-100 border-green-400'
                  : 'border-gray-300'
              }`}
            >
              여
            </button>
          </div>
        </div>
      </div>

      {/* 다음 버튼: 이름과 성별이 모두 입력되어야 활성화 */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-white">
        <NextButton onClick={handleNext} disabled={!name || !gender} label="다음" />
      </div>
    </div>
  );
}