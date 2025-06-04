// Button.jsx
import React from 'react';

const Button = ({ Text, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(Text.toLowerCase())}
      className={`${isSelected ? "bg-black text-white" : "bg-[#fff] text-black"} font-normal py-2 px-4 rounded-[8px] tracking-tight text-[10px] md:text-[12px]`}
    >
      {Text}
    </button>
  );
};

export default Button;
