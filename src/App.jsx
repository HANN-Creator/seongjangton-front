import React, { useState } from 'react';
import KakaoLoginButton from './components/KakaoLoginButton';
import './index.css'

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      {user ? (
        <div className="text-center">
          <img
            src={user.kakao_account.profile.profile_image_url}
            alt="프로필"
            className="w-12 h-12 rounded-full mx-auto mb-2"
          />
          <h2 className="text-xl font-semibold">
            환영합니다, {user.properties.nickname}님!
          </h2>
        </div>
      ) : (
        <KakaoLoginButton
          onSuccess={setUser}
          onFailure={setError}
        />
      )}
      {error && (
        <p className="text-red-600">
          로그인 오류: {error.message || JSON.stringify(error)}
        </p>
      )}
    </div>
  );
}