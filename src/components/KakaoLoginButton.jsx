// src/components/KakaoLoginButton.jsx
import React, { useEffect, useState } from 'react';

export default function KakaoLoginButton({ onSuccess, onFailure }) {
  const [ready, setReady] = useState(false);
  const kakaoKey = import.meta.env.VITE_KAKAO_KEY;
  const SDK_URL = 'https://developers.kakao.com/sdk/js/kakao.min.js';

  useEffect(() => {
    // 1) SDK 스크립트가 없으면 추가
    if (!document.querySelector(`script[src="${SDK_URL}"]`)) {
      const script = document.createElement('script');
      script.src = SDK_URL;
      script.async = true;
      script.onload = () => initKakao();
      document.body.appendChild(script);
    } else {
      // 이미 로드되어 있으면 바로 초기화
      initKakao();
    }

    function initKakao() {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(kakaoKey);
        console.log('💛 Kakao SDK initialized');
      }
      setReady(true);
    }
  }, [kakaoKey]);

  const handleLogin = () => {
    if (!ready || !window.Kakao.Auth) {
      console.error('Kakao SDK가 아직 준비되지 않았습니다.');
      return;
    }

    window.Kakao.Auth.login({
      throughTalk: false,
      scope: 'profile_nickname, profile_image',
      success: authObj => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: user => onSuccess?.(user),
          fail: err  => onFailure?.(err),
        });
      },
      fail: err => onFailure?.(err),
    });
  };

  return (
    <button
      onClick={handleLogin}
      disabled={!ready}
      style={{
        padding: '0.5rem 1rem',
        background: ready ? '#FEE500' : '#ddd',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: ready ? 'pointer' : 'not-allowed'
      }}
    >
      {ready ? '카카오로 시작하기' : '로딩 중...'}
    </button>
  );
}
