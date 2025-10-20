import clsxm from "@/utils/clsxm";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";
import Input from "../input";

type DropdownProps = {
  items: string[];
  label: string;
  name: string;
  onSelect?: (item: string) => void;
  required?: boolean;
  classNameBody?: string;
  disabled?: boolean;
  classNameLabel?: string;
};

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  label,
  name,
  classNameLabel,
  required = false,
  classNameBody,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null); // ایجاد رفرنس
  const formContext = useFormContext();
  const { setValue, trigger, formState, watch, register } = formContext || {};
  const selectedItem = formContext ? watch(name) : localValue;

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleItemClick = (item: string) => {
    if (formContext) {
      setValue!(name, item);
      trigger!(name);
    } else {
      setLocalValue(item);
      onSelect?.(item);
    }
    setIsOpen(false);
  };

  const error = formContext?.formState.errors[name]?.message as string;

  // بستن دراپ‌دان با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef} // اختصاص رفرنس به کامپوننت
      className={clsxm("relative flex flex-col gap-2", classNameBody)}
    >
      <label className={clsxm("", classNameLabel)}>{label}</label>
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex justify-between py-3 items-center w-full min-w-40 rounded-md border border-gray-300 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <span>{selectedItem || label}</span>
        <FiChevronDown
          className={`w-5 h-5 text-gray-500 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute top-16 z-10 w-full bg-white border rounded-md shadow-lg overflow-auto ring-black px-4">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {formContext && (
        <Input
          type="hidden"
          register={register!(name, {
            ...(required && { required: `${label} الزامی است` }),
          })}
          value={selectedItem || ""}
        />
      )}

      {error && (
        <span className="absolute -bottom-3 text-red-500 text-xs">{error}</span>
      )}
    </div>
  );
};
