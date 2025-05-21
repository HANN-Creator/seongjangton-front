import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OAuthCallbackPage({ onLogin }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId    = params.get('userId');
    const isNewUser = params.get('isNewUser') === 'true';

    if (userId) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('isNewUser', isNewUser);
      onLogin?.({ userId, isNewUser });
      navigate(isNewUser ? '/member/info' : '/userinfo', { replace: true });
    } else {
      navigate('/userinfo', { replace: true });
    }
  }, [location.search, navigate, onLogin]);

  return <div>로그인 처리 중...</div>;
}