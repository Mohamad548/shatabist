import { FilterValue } from "@/components/app/products/hooks/type";
import Input from "@/components/base/input";

import clsxm from "@/utils/clsxm";
import React, { useState, useEffect } from "react";

interface DoubleRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  initialMin?: number;
  initialMax?: number;
  onChange?: (min: number, max: number, isInRange: boolean) => void;
  values?: FilterValue[];
}

const DoubleRangeSlider: React.FC<DoubleRangeSliderProps> = ({
  min,
  max,
  step = 1,
  initialMin = min,
  initialMax = max,
  onChange,
  values,
}) => {
  const [range, setRange] = useState({
    min: Math.max(initialMin, min),
    max: Math.min(initialMax, max),
  });

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.max(min, parseFloat(e.target.value));
    if (newMin <= range.max) {
      setRange((prev) => ({ ...prev, min: newMin }));
      onChange?.(newMin, range.max, minPercent > 0 || maxPercent < 100);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.min(max, parseFloat(e.target.value));
    if (newMax >= range.min) {
      setRange((prev) => ({ ...prev, max: newMax }));
      onChange?.(range.min, newMax, minPercent > 0 || maxPercent < 100);
    }
  };

  const minPercent = ((range.min - min) / (max - min)) * 100;
  const maxPercent = ((range.max - min) / (max - min)) * 100;

  useEffect(() => {
    if (onChange) {
      onChange(range.min, range.max, minPercent > 0 || maxPercent < 100);
    }
  }, [range, minPercent, maxPercent, onChange]);

  return (
    <div className="relative flex flex-col w-full">
      <div className="relative flex items-center w-full bg-gray-200 h-1 rounded-md">
        <Input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range.min}
          onChange={handleMinChange}
          inputClassName={`absolute outline-none w-full pointer-events-auto range-min appearance-none bg-transparent pointer -top-4 z-10  ${
            minPercent > max - 100 && "z-20"
          } pointer-events-none`}
        />
        <Input
          type="range"
          min={min}
          max={max}
          step={step}
          inputClassName="absolute w-full outline-none pointer-events-auto range-max appearance-none bg-transparent z-10 -top-4 pointer-events-none"
          value={range.max}
          onChange={handleMaxChange}
        />
        <div
          className={clsxm("absolute h-1 bg-emerald-100/20 rounded")}
          style={{
            right: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
      </div>
      <div className="w-full flex flex-col justify-between mt-4">
        <Input
          parentClassName="flex flex-col-reverse w-full"
          inputClassName="w-full"
          value={range.min}
          onChange={handleMinChange}
          type="number"
          label={values && values[0]?.name}
        />
        <Input
          parentClassName="flex flex-col-reverse w-full"
          inputClassName="w-full"
          value={range.max}
          onChange={handleMaxChange}
          type="number"
          label={values && values[1]?.name}
        />
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
