"use client";
import clsxm from "@/utils/clsxm";
import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface AccordionProps {
  title: React.ReactNode; // تغییر داده شد تا لینک هم بتواند باشد
  children: React.ReactNode;
  isSelected?: boolean; // اضافه کردن پراپ isSelected
  itemLast?: string | number;
  itemRange?: string | number;
  classname?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isSelected,
  itemLast,
  itemRange,
  classname,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.maxHeight = "0px";
      }
    }
  }, [isOpen]);

  return (
    <div
      className={clsxm(
        "border-t",
        itemLast === itemRange && "border-b",
        classname
      )}
    >
      <button
        className="w-full pt-4 mb-4 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-4 items-center">
          <h3 className="text-sm md:text-base">{title}</h3>
          {isSelected && (
            <span className="flex w-2 h-2 bg-emerald-500 rounded-full"></span>
          )}{" "}
          {/* نمایش div سبز رنگ */}
        </div>
        {isOpen ? (
          <FaChevronUp className="text-gray-700" />
        ) : (
          <FaChevronDown className="text-gray-700" />
        )}
      </button>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
      >
        <div className="pb-5">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
