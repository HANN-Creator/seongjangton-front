import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoalsPage from "./pages/GoalsPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import UserInfoPage from "./pages/UserInfoPage";
import RoutineCreate from "./pages/RoutineCreate";
import RoutineEdit from "./pages/RoutineEdit";
import RoutineDetail from "./pages/RoutineDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Report from "./pages/Report";
import Remind from "./pages/Remind";

export default function App() {
  const isLoggedIn = Boolean(localStorage.getItem("userId"));

  return (
    <BrowserRouter>
      {/* 로그인 전용 화면 */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/kakao" element={<OAuthCallbackPage />} />
        <Route path="/userinfo" element={<UserInfoPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/routine/create" element={<RoutineCreate />} />

        {/* 인증된 사용자만 접근 */}
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <>
                <Header />
                <main className="pb-16">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/routine/edit/:id" element={<RoutineEdit />} />
                    <Route path="/routine/:id" element={<RoutineDetail />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/remind" element={<Remind />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
