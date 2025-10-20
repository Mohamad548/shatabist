import AddressesCard from "@/components/base/addresses-card";
import Button from "@/components/base/button";
import { AddressType, companyAddresses } from "@/constants/mock-data/profile";
import React from "react";
import { useFormContext } from "react-hook-form";

function DocumentSend({
  setCurrentStep,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const goToNextStep = () => setCurrentStep((prev) => prev + 1);
  const goToPreviousStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="w-full">
      <h3 className="font-Bold text-gray-800 text-base py-3">
        لطفا نسخه فیزیکی قرارداد و چک ضمانت ثبت شده را به آدرس زیر ارسال نمایید.
      </h3>
      {companyAddresses.map((address: AddressType) => (
        <AddressesCard
          key={address.id}
          address={address}
          classNameContent="flex gap-6 p-6 border rounded-md justify-center lg:justify-start  items-center lg:items-start flex-col sm:flex-row md:flex-col lg:flex-row"
          orderDetail={true}
          addressCompany={true}
        />
      ))}
      <h4 className="font-regular text-sm text-gray-700 pt-3">
        لازم به ذکر است که <strong>تمام صفحات</strong> قرارداد باید{" "}
        <strong>امضا و اثر انگشت</strong> داشته باشد.
      </h4>
      <h4 className="font-regular text-sm text-gray-700 py-3">
        {" "}
        لازم به ذکر لست که <strong>چک</strong> حتما باید در{" "}
        <strong>سامانه چک صیادی</strong> ثبت شده باشد.
      </h4>
      <div className="flex z-10 gap-4 justify-end w-full md:my-4  md:w-auto  fixed md:static left-0 right-0  bg-white bottom-20 px-5 py-2 md:py-0 md:px-0">
        <Button
          className="py-3 md:px-10 text-gray-500 flex flex-col gap-1 items-center hover:bg-gray-100 transition-all w-full md:w-auto rounded-md font-Medium text-base border-2"
          onClick={goToPreviousStep}
        >
          <h3 className="text-sm flex justify-center">مرحله قبلی</h3>
        </Button>
        <Button
          className="group hover:bg-emerald-500 border flex flex-col gap-1 items-center hover:text-white border-emerald-500 py-3 transition duration-300 md:px-16 text-emerald-500 w-full md:w-auto rounded-md font-Medium text-base"
          onClick={goToNextStep}
        >
          <h3 className="text-sm flex justify-center">تایید و ادامه</h3>
        </Button>
      </div>
    </div>
  );
}

export default DocumentSend;
