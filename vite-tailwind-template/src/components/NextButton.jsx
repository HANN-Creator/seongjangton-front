export default function NextButton({
  onClick,
  disabled = false,
  label = "다음",
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 mt-4 text-base font-medium rounded-full shadow-sm transition ease-in-out duration-150 focus:outline-none ${
        disabled
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-green-100 text-[#3B4159] hover:bg-green-200"
      }`}
    >
      {label}
    </button>
  );
}
