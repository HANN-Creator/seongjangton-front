import React, { useState } from "react";

const Checklist = ({ icon, text, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex flex-row items-start gap-[10px] justify-between p-3 rounded-[8px] border border-[#EBEBEB] bg-white mb-3">
      <div className="flex items-center gap-2">
        <img
          src={icon}
          alt="icon"
          className="w-[24px] h-[24px] aspect-square"
        />
        <span className="text-[#3B4159] text-[16px] font-normal font-pretendard">
          {text}
        </span>
      </div>
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
          checked ? "bg-[#ACEBDC] border-[#ACEBDC]" : "border-[#ACEBDC]"
        }`}
        onClick={() => setChecked(!checked)}
      >
        {checked && (
          <img src="/assets/checked.svg" alt="checked" className="w-3 h-3" />
        )}
      </div>
    </div>
  );
};

export default Checklist;
