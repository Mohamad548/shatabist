import Button from "@/components/base/button";
import React from "react";

function Done({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPreviousStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  return (
    <div>
      <div className=" mx-52 mt-10 grid grid-cols-2 gap-4 place-items-center"></div>
      <div className="flex z-10 gap-4 justify-end w-full md:my-4  md:w-auto  fixed md:static left-0 right-0  bg-white bottom-0 px-5 py-2 md:py-0 md:px-0">
        <Button
          className="py-3 md:px-10 text-gray-500 flex flex-col gap-1 items-center hover:bg-gray-100 transition-all w-full md:w-auto rounded-md font-Medium text-base border-2"
          onClick={goToPreviousStep}
        >
          <h3 className="text-sm flex justify-center">مرحله قبلی</h3>
          <h4 className="text-xs text-gray-400 group-hover:text-emerald-100">
            {/* ({steps[selectedIndex]?.prevButtonLabel}) */}
          </h4>
        </Button>

        <Button
          className="group hover:bg-emerald-500 border flex flex-col gap-1 items-center hover:text-white border-emerald-500 py-3 transition duration-300 md:px-16 text-emerald-500 w-full md:w-auto rounded-md font-Medium text-base"
          onClick={goToNextStep}
        >
          <h3 className="text-sm flex justify-center">تایید و ادامه</h3>
          <h4 className="text-xs text-gray-400 group-hover:text-emerald-100">
            {/* ({steps[selectedIndex]?.nextButtonLabel}) */}
          </h4>
        </Button>
      </div>
    </div>
  );
}

export default Done;
