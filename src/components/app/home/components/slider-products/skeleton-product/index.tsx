import React from "react";
import clsxm from "@/utils/clsxm";

const SkeletonProduct = () => {
  return (
    <div
      className={clsxm("flex bg-gray-100 flex-col rounded-md mt-16 md:mr-40")}
    >
      <div className="animate-pulse w-full mt-3 flex justify-between items-center md:px-10">
        <div className="bg-gray-400/50  h-9 w-28 rounded-xl"></div>
        <div className="bg-slate-400/50 h-9 w-40 rounded-lg"></div>
      </div>

      <div className="animate-pulse w-full bg-gray-100 rounded-r-md py-6 pr-4 flex gap-6">
        <div className="w-full flex gap-6 overflow-hidden relative">
          {/* Tailwind responsive classes for card layout */}
          <div className="flex overflow-hidden  gap-6 w-full">
            {Array(6)
              .fill("")
              .map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 p-4  min-w-60 rounded-md flex gap-2 flex-col items-start w-full"
                >
                  <div className="w-full h-52 bg-gray-400/50  rounded-md"></div>
                  <div className="w-full h-10 bg-gray-400/50  rounded-md mt-4"></div>
                  <div className="flex w-full h-6 gap-16">
                    <div className="w-3/4 h-full bg-gray-400/50  rounded-md mt-2"></div>
                    <div className="w-2/4 h-full bg-gray-400/50  rounded-md mt-2"></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProduct;
