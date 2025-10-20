import React from "react";
import clsxm from "@/utils/clsxm";

const SkeletonAmazing = () => {
  return (
    <div className={clsxm(" flex mr-4 bg-green-500 md:mx-40 rounded-md")}>
      <div className=" animate-pulse md:w-1/5  min-w-30  my-6  ">
        <div className="flex flex-col  justify-center   items-center h-full  rounded-md mx-6">
          <div className="w-20 h-20 border-8 border-gray-400 bg-gray-400 rounded-full opacity-40 flex items-center justify-center">
            {/* <div className='bg-gray-300 w-10 h-10 rounded-br-2xl  rounded-tl-2xl'></div> */}
          </div>
          <div className="flex mt-4 flex-col gap-1 px-4 justify-center w-full items-center">
            <div className="h-7 w-28 bg-gray-400/50  rounded-md"></div>
            <div className="h-7 w-28 bg-gray-400/50  rounded-md"></div>
            <div className="h-7 w-28 bg-gray-400/50  rounded-md"></div>
          </div>
          <div className="h-6 w-4/5 bg-gray-400/50 mt-10 px-10 rounded-md" />
        </div>
      </div>

      <div className=" animate-pulse  md:w-4/5 bg-green-500 overflow-hidden rounded-l-md py-6 flex gap-6">
        {/* Skeleton for 4.5 product cards */}
        <div className="w-full flex gap-6 overflow-hidden">
          {/* Full product skeleton cards */}
          {Array(4)
            .fill("")
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-4 rounded-md flex  min-w-72  gap-2 flex-col items-start w-full"
              >
                <div className="w-full h-52 bg-gray-400 rounded-md"></div>
                <div className="w-full h-10 bg-gray-400 rounded-md mt-4"></div>
                <div className="flex w-full h-6 gap-16">
                  <div className="w-3/4 h-full bg-gray-400 rounded-md mt-2"></div>
                  <div className="w-2/4 h-full bg-gray-400 rounded-md mt-2"></div>
                </div>
                <div className="flex w-full h-6 gap-16">
                  <div className="w-2/4 h-full bg-gray-400 rounded-md mt-2"></div>
                  <div className="w-3/4 h-full bg-gray-400 rounded-md mt-2"></div>
                </div>
              </div>
            ))}

          {/* Half product skeleton card */}
          <div className="bg-gray-100 py-4 pr-4 rounded-r-md flex flex-col items-start w-1/2">
            <div className="w-full h-52 bg-gray-400 rounded-r-md"></div>
            <div className="w-full h-10  bg-gray-400 rounded-r-md mt-4"></div>
            <div className="w-1/2 h-6 bg-gray-400 rounded-md mt-2"></div>
            <div className="w-1/4 h-6 bg-gray-400 rounded-md mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonAmazing;
