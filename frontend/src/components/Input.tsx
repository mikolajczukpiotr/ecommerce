import React from "react";

interface InputProps {
  id: string;
  name: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput: React.FC<InputProps> = ({
  id,
  name,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <input
        id={id}
        type="text"
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full border text-black border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
      />
    </div>
  );
};

export default CustomInput;
