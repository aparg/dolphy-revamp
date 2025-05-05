"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Notification = ({
  message,
  type = "success",
  onClose,
  className,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "error":
        return "bg-red-50 text-red-600 border-red-200";
      case "warning":
        return "bg-yellow-50 text-yellow-600 border-yellow-200";
      case "info":
        return "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return "bg-green-50 text-green-600 border-green-200";
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 rounded-lg border",
        getTypeStyles(),
        className
      )}
      role="alert"
    >
      <span className="text-sm font-medium">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 inline-flex items-center justify-center rounded-full p-0.5 hover:bg-opacity-20 hover:bg-gray-900 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
