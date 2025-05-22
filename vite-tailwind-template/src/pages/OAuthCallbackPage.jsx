import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
      console.error("카카오 인증 코드가 없습니다.");
      return;
    }

    // 백엔드로 코드 전송 → 토큰 교환 & 회원 저장
    fetch(`/api/member/kakao?code=${code}`)
      .then((res) => res.json())
      .then(({ result }) => {
        // 예: result.id 에 사용자 ID가 돌아온다고 가정
        localStorage.setItem("userId", result.id);
        navigate("/userinfo", { replace: true });
      })
      .catch((err) => {
        console.error("OAuthCallback 에러:", err);
      });
  }, [navigate]);

  return <div>로그인 처리 중… 잠시만 기다려주세요.</div>;
}
