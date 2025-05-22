export default function TextInput({
  value,
  placeholder = "",
  onChange,
  className = "",
  ...props
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`
        w-[320px] h-[48px]
        px-4
        border border-gray-300 rounded-lg
        focus:outline-none focus:ring-[2px] focus:ring-[#898D9E]
        placeholder-gray-400
        ${className}
      `}
      {...props}
    />
  );
}
