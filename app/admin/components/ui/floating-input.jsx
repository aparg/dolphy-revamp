"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export const FloatingLabelInput = ({
  id,
  label,
  type = "text",
  className,
  value,
  onChange,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        className={cn(
          "block px-4 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
          error && "border-red-500 focus:border-red-600",
          className
        )}
        placeholder=" "
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",
          error && "text-red-500 peer-focus:text-red-600",
          isFocused && "text-blue-600",
          value && "scale-75 -translate-y-4 top-2"
        )}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};
