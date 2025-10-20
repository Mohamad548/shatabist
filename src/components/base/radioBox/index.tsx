import Input from "@/components/base/input";
import IconSize from "@/constants/icon-size";
import clsxm from "@/utils/clsxm";
import Image from "next/image";
import React from "react";

type SwitchOptionType = {
  id: number;
  name: string;
  selectedOption: number | null;
  onChange: (id: number) => void;
  classNameInputSorting?: string;
  classNameParentSorting?: string;
  type?: string;
  classNameLabel?: string;
  classNameCheckmark?: string;
};

const RadioBox = ({
  id,
  name,
  selectedOption,
  onChange,
  classNameInputSorting,
  classNameParentSorting,
  type,
  classNameLabel,
  classNameCheckmark,
}: SwitchOptionType) => {
  const handleClick = () => {
    onChange(id);
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleClick}>
      <div
        className={clsxm(
          "h-5 w-5 py-1 px-1 rounded-md border border-gray-200",
          selectedOption === id && "bg-emerald-500 hover:bg-emerald-600 transition-all duration-300",
          classNameCheckmark,
        )}
      >
        {selectedOption === id && (
          <Image
            alt={name}
            width={IconSize.xs}
            height={IconSize.xs}
            src="/svg/tick.svg"
          />
        )}
      </div>
      <Input
        parentClassName={clsxm("flex", classNameParentSorting)}
        id={id.toString()}
        label={name}
        inputClassName={clsxm("sr-only ", classNameInputSorting)}
        type={type}
        nameInput="sortingOptions"
        checked={selectedOption === id}
        onChange={handleClick}
        classNameLabel={classNameLabel}
      />
    </div>
  );
};

export default RadioBox;
