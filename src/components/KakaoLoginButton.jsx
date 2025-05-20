import { useEffect, useState } from 'react';
import { FaComment } from 'react-icons/fa';

export default function KakaoLoginButton({ className = '' }) {
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

  const handleLogin = async () => {
    setLoading(true);
    try {
      // 1. 백엔드에서 카카오 로그인 URI 조회
      const res = await fetch(`${apiBase}/api/request`);
      if (!res.ok) throw new Error('로그인 URL 조회 실패');
      const loginUrl = await res.text();
      // 2. 카카오 로그인 페이지로 리디렉트
      window.location.href = loginUrl;
    } catch (error) {
      console.error('Kakao login request error:', error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full h-full flex items-center justify-center bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#191919] font-semibold text-base rounded-full transition"
    >
      <FaComment className="w-6 h-6 mr-2" />
      카카오로 시작하기
    </button>
  );
}
