import React, { useState } from "react";
import Input from "@/components/base/input";

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ checked = false, onChange }) => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(checked);

  const handleToggle = () => {
    setIsSwitchOn((prev) => !prev); // معکوس کردن وضعیت قبلی
    if (onChange) {
      onChange(!isSwitchOn); // ارسال وضعیت معکوس به onChange
    }
  };

  return (
    <>
      <Input
        type="checkbox"
        checked={checked}
        inputClassName="sr-only"
        onChange={handleToggle}
        parentClassName="relative"
      />
      <div
        className={`relative h-6 w-11 flex items-center rounded-full transition-colors duration-300 cursor-pointer ${
          checked ? "bg-emerald-500" : "bg-gray-200"
        }`}
        onClick={handleToggle}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
            checked ? "-translate-x-1" : "-translate-x-5"
          }`}
        />
      </div>
    </>
  );
};

export default Switch;
