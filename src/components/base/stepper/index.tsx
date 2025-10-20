import clsxm from "@/utils/clsxm";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

interface Step {
  id?: number;
  label: string;
  defaultIcon?: string;
  activeIcon?: string;
  completedIcon?: string;
  href?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep?: number | null;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep = steps.some((step) => step.href) ? null : 0,
  setCurrentStep,
}) => {
  const hasHref = steps.some((step) => step.href);
  const pathname = usePathname();
  const currentHrefIndex = hasHref
    ? steps.findIndex((step) => step.href === pathname)
    : -1;

  const handleStepClick = (index: number) => {
    if (!hasHref && setCurrentStep) {
      setCurrentStep(index);
    }
  };

  return (
    <div
      className={clsxm(
        "flex items-center relative overflow-hidden",
        hasHref
          ? "md:max-w-[80%] lg:max-w-[60%] md:m-auto px-4 justify-center"
          : "justify-between",
      )}
    >
      {steps.map((step, index) => {
        const isActive =
          index === currentStep || (hasHref && index === currentHrefIndex);

        const isCompleted = hasHref
          ? currentHrefIndex > -1 && index < currentHrefIndex
          : currentStep !== null && index < currentStep;

        const isVisibleInMobile = hasHref
          ? Math.abs(index - currentHrefIndex) <= 1
          : Math.abs(index - (currentStep || 0)) <= 1;

        const isVisibleInLg = hasHref
          ? Math.abs(index - currentHrefIndex) <=
            (index === 0 || index === steps.length - 1 ? 1 : 2)
          : Math.abs(index - (currentStep || 0)) <= 2;

        const iconSrc = isActive
          ? step.activeIcon || step.defaultIcon
          : isCompleted
            ? step.completedIcon || step.defaultIcon
            : step.defaultIcon;

        return (
          <div
            key={index}
            className={clsxm(
              "flex-1 flex items-center relative",
              hasHref
                ? isVisibleInLg
                  ? "block"
                  : "hidden"
                : isVisibleInMobile
                  ? "block"
                  : "hidden",
              `lg:${!hasHref && isVisibleInLg ? "block" : "hidden"} ${
                hasHref ? "lg:block" : "xl:block"
              }
            `,
            )}
          >
            {/* مرحله */}
            <div
              className={clsxm(
                "relative flex flex-col items-center",
                hasHref ? "" : "cursor-pointer  h-20 ",
              )}
              onClick={() => handleStepClick(index)}
            >
              <div
                className={clsxm(
                  "flex border overflow-hidden items-center justify-center z-10 text-white font-regular",
                  hasHref
                    ? isActive
                      ? "bg-emerald-500 py-1 md:p-4 md:gap-2 flex-col rounded-lg min-w-20 md:min-w-32"
                      : isCompleted
                        ? "border-emerald-500 py-1 bg-white text-emerald-500 md:p-4 md:gap-2 flex-col rounded-lg min-w-20 md:min-w-32"
                        : "bg-white text-black py-1 md:p-4 md:gap-2 flex-col rounded-lg min-w-20 md:min-w-32"
                    : isActive
                      ? "border-emerald-500 text-emerald-500 bg-white w-8 h-8 rounded-full"
                      : isCompleted
                        ? "bg-emerald-500 w-8 h-8 rounded-full"
                        : "bg-gray-300 w-8 h-8 rounded-full",
                )}
              >
                {iconSrc ? (
                  <div className="relative w-4 md:w-6 h-8">
                    <Image
                      src={iconSrc}
                                fill
    style={{ objectFit: "contain" }}
                      alt={step.label}
                      quality={100}
                      className="rounded-xl"
                    />
                  </div>
                ) : (
                  index + 1
                )}
                {hasHref ? (
                  <h3 className="font-Medium text-[10px] md:text-sm">
                    {step.label}
                  </h3>
                ) : (
                  ""
                )}
              </div>
              {!hasHref && (
                <span
                  className={`text-xs sm:w-32 w-24 md:w-24  2xl:w-32 text-center absolute top-10 ${
                    isActive ? "text-emerald-500 font-bold" : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              )}
            </div>

            {/* خط اتصال بین مراحل */}
            {index < steps.length - 1 && (
              <div
                className={clsxm(
                  "w-full absolute right-1/2 z-0",
                  hasHref
                    ? "bottom-6 md:top-12 h-[2px] bg-gray-400"
                    : "top-4 h-[1px] bg-gray-400",
                )}
              >
                <div
                  className={clsxm(
                    "transition-all duration-300",
                    isCompleted ? "bg-emerald-500 h-[2px]" : "bg-gray-300",
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
