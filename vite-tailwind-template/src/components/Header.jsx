import { useNavigate } from "react-router-dom";

const Header = () => {
  const pathname = window.location.pathname;
  //const navigate = useNavigate();

  const showBackButton = !(
    pathname.includes("home") ||
    pathname.includes("report") ||
    pathname.includes("mypage")
  );

  const renderCenterContent = () => {
    if (pathname.includes("routine/add")) return "루틴추가하기";
    if (pathname.includes("home"))
      return <img src="/assets/logo.svg" alt="logo" className="h-6" />;
    if (pathname.includes("report")) return "월별 리포트";
    if (pathname.includes("mypage")) return "마이페이지";
    if (pathname.includes("lookback")) return "되돌아보기";
    return "";
  };

  return (
    <div
      className="fixed top-0 w-full flex justify-between items-center max-w-[360px] bg-[#F8FDFC] pt-[20px] pb-[12px] px-[20px] z-50"
      style={{ boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.08)" }}
    >
      <div className="w-6 h-6">
        {showBackButton ? (
          <img
            src="/assets/backbutton.svg"
            alt="back"
            className="w-full h-full cursor-pointer"
            //onClick={() => navigate(-1)}
          />
        ) : null}
      </div>
      <div className="text-base font-semibold">{renderCenterContent()}</div>
      <div className="w-6 h-6"></div>
    </div>
  );
};

export default Header;
