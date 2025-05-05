import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function CustomDropdown({
  trigger,
  items,
  isActive,
  align = "start",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical tablet/mobile breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      let left = rect.left;

      // Prevent dropdown from going off-screen on mobile
      if (isMobile) {
        const dropdownWidth = 180; // Width of dropdown
        if (left + dropdownWidth > windowWidth) {
          left = windowWidth - dropdownWidth - 10; // 10px padding from edge
        }
      }

      setPosition({
        top: rect.bottom,
        left: left,
      });
    }
  };

  useEffect(() => {
    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    // Add click outside listener for mobile
    if (isMobile) {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isMobile]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      updatePosition();
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 400);
    }
  };

  const handleClick = (e) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      updatePosition();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      ref={dropdownRef}
    >
      <div ref={triggerRef}>{trigger}</div>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            zIndex: 99999,
            width: "fit",
          }}
          className={`transition-all duration-200 ${
            isMobile ? "shadow-lg" : ""
          }`}
        >
          <div className="mt-2 bg-white shadow-lg rounded-xl p-1 border border-gray-200">
            <div
              className="py-1 max-h-[300px] overflow-y-auto"
              onMouseEnter={() => {
                if (!isMobile && timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="p-0"
                  onClick={() => {
                    if (isMobile) {
                      setIsOpen(false);
                    }
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
