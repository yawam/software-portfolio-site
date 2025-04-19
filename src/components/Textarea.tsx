// components/Textarea.tsx
import React from "react";

interface TextareaProps {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ id, onChange, value, label }) => {
  return (
    <div className="relative w-full">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        rows={4}
        className="peer w-full rounded-lg border border-sky-300 bg-zinc-900 px-4 pb-2 pt-6 text-sm text-white placeholder-transparent transition focus:border-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-300"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-3 text-sm text-gray-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-sky-300"
      >
        {label}
      </label>
    </div>
  );
};

export default Textarea;
