import React from "react";

const BottomBar = () => {
  return (
    <div className="fixed bottom-0 w-full flex justify-between items-center bg-white pt-4 pb-8 px-[46px] z-50">
      <div>
        <img src="/assets/report.svg" alt="report" className="w-6 h-6" />
      </div>
      <div>
        <img src="/assets/home.svg" alt="home" className="w-6 h-6" />
      </div>
      <div>
        <img src="/assets/mypage.svg" alt="mypage" className="w-6 h-6" />
      </div>
    </div>
  );
};

export default BottomBar;
