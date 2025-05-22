import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Report = () => {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-full max-w-[360px] relative bg-[#ffffff]">
        <Header />

        {/* 실제 리포트 내용 삽입 위치 */}

        {/* 전구 버튼 + 말풍선 */}
        <div className="fixed bottom-24 right-4 z-50 max-w-[360px] w-full flex justify-end pr-4">
          <div className="relative flex items-end gap-2">
            {/* 말풍선 이미지 */}
            <img
              src="/assets/speechballon.svg"
              alt="말풍선"
              className="w-40 h-auto drop-shadow-md"
            />

            {/* 전구 버튼 */}
            <button className="w-12 h-12 bg-yellow-200 rounded-full shadow-md flex items-center justify-center">
              <img
                src="assets/bulb.svg"
                alt="전구 아이콘"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Report;
