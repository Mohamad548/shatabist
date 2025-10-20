import React from "react";

const SpeedometerChart = ({ value }: { value: number }) => {
  // مقدار ورودی باید بین 300 تا 900 باشد
  const calculateRotation = (index: number) => ((index - 300) * 180) / 600 - 90;

  return (
    <div className="relative max-w-[200px] max-h-[150px] min-w-52">
      <svg width="100%" height="100%" viewBox="0 0 300 150">
        {Array.from({ length: 900 }).map((_, index) => (
          <line
            key={index}
            x1="145"
            y1="1"
            x2="145"
            y2="60"
            stroke={
              index < 300
                ? "#ddd"
                : index <= 460
                  ? "#DE3700"
                  : index <= 520
                    ? "#F58B00"
                    : index <= 580
                      ? "#ffd200"
                      : index <= 640
                        ? "#92E000"
                        : "#2AA10F"
            }
            strokeWidth="2"
            transform={`rotate(${calculateRotation(index)} 150 150)`} // محور چرخش
          />
        ))}
        {/* نشانگر اصلاح‌شده با نوک مثلث به سمت بیرون */}
        <path
          d="M 150 25 L 155 150 L 140 150 Z M 148 161 L 140 150 L 155 150 L 148 161M 150 25 L 155 150 L 140 150 Z M 147 158 L 140 150 L 155 150 L 148 158" // مسیر مثلث برای نشانگر با نوک در بالا
          fill="#bfbfbf"
          transform={`rotate(${calculateRotation(value)} 150 150)`} // چرخش نشانگر
        />
      </svg>
      <div className="absolute -bottom-5 left-0 right-0 text-center font-bold text-gray-900">
        {value}
      </div>
      <h3 className="absolute -left-1 bottom-7 -rotate-[68deg] text-[9px] font-Bold text-white">
        خیلی ضعیف
      </h3>
      <h3 className="absolute left-[36px] top-[21px] -rotate-[36deg] text-[9px] font-Bold text-white">
        ضعیف
      </h3>
      <h3 className="absolute left-[60px] top-2 -rotate-[20deg] text-[9px] font-Bold text-white">
        متوسط
      </h3>
      <h3 className="absolute left-[92px] top-1 rotate-[5deg] text-[9px] font-Bold text-white">
        خوب
      </h3>
      <h3 className="absolute right-3 bottom-[45px] rotate-[55deg] text-[9px] font-Bold text-white">
        خیلی خوب
      </h3>
      <h3 className="absolute -left-8 -bottom-[9px] font-Bold text-gray-700">
        300
      </h3>
      <h3 className="absolute left-0 bottom-[69px] font-Bold text-sm text-gray-700">
        460
      </h3>
      <h3 className="absolute left-8 -top-[10px] font-Bold text-sm text-gray-700">
        520
      </h3>
      <h3 className="absolute left-[65px] -top-[19px] font-Bold text-sm text-gray-700">
        580
      </h3>
      <h3 className="absolute right-16 -top-[18px] font-Bold text-sm text-gray-700">
        640
      </h3>
      <h3 className="absolute -right-7 -bottom-[5px] font-Bold text-gray-700">
        900
      </h3>
    </div>
  );
};

export default SpeedometerChart;
