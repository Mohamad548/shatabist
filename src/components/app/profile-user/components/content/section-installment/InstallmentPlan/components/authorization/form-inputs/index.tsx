import React from "react";
import Input from "@/components/base/input";
import LabelWithAsterisk from "./components/label-with-asterisk";
interface InputData {
  placeholder: string;
  label: string;
  type?: string;
}

interface FormInputsProps {
  inputsData: InputData[];
}

const FormInputs: React.FC<FormInputsProps> = ({ inputsData }) => {
  return (
    <>
      <div className="flex gap-2 items-end">
        <span className="bg-gray-700 w-6 text-white h-6 rounded-full flex justify-center items-center">
          1
        </span>
        <h3 className="font-bold text-base text-gray-800">اطلاعات اولیه</h3>
      </div>
      <div className="flex gap-6 flex-col md:flex-row w-full">
        {inputsData.map((input, index) => (
          <Input
            key={index}
            placeholder={input.placeholder}
            label={<LabelWithAsterisk text={input.label} />}
            inputClassName="border border-gray-200 rounded-lg py-2 px-3 text-sm font-regular"
            parentClassName="flex-col-reverse gap-2 flex-1"
            type={input.type}
          />
        ))}
      </div>
    </>
  );
};

export default FormInputs;
