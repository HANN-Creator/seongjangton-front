import React from "react";

const Checklist = ({ icon, text, checked }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl px-3 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <img src={icon} alt="icon" className="w-6 h-6" />
        <span className="text-base text-gray-800">{text}</span>
      </div>
      <div
        className={`w-6 h-6 rounded-full border-2 ${
          checked ? "bg-[#ACEBDC] border-[#ACEBDC]" : "border-[#ACEBDC]"
        }`}
      ></div>
    </div>
  );
};

export default Checklist;
