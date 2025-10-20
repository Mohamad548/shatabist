import React, { useRef, useState } from 'react';
import { CreditDetail } from '@/components/app/profile-user/hooks/type';
import Button from '@/components/base/button';
import Input from '@/components/base/input';
import Link from 'next/link';
import clsxm from '@/utils/clsxm';
import { useFormErrorHandler } from '@/utils/useFormErrorHandler';
import { contractSections } from './contractSections';

const Contract = ({
  setCurrentStep,
  installmentDetail,
}: {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  installmentDetail?: CreditDetail;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const { formRefs, onError } = useFormErrorHandler();
  const containerRef = useRef<HTMLDivElement>(null);

  if (!installmentDetail) return null;

  const { first_name, last_name, national_id, phone_number, credit } = installmentDetail;

  const goToNextStep = () => {
    if (isChecked) {
      setCurrentStep(prev => prev + 1);
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowError(true);
      onError({ agreement: 'این بخش باید تایید شود' });
    }
  };

  const goToPreviousStep = () =>
    setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (showError) setShowError(false);
  };

  return (
    <div ref={containerRef} className="w-full p-6 shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-bold mb-4 border-emerald-100 pb-2">دانلود قرارداد</h2>
      <p>لطفاً قرارداد را دانلود کرده و سپس تمام صفحات آن را امضا و اثر انگشت بزنید.</p>

      <div className="flex justify-center w-full">
        <Link
          href="/file/contract.docx"
          download
          className="bg-emerald-500 w-full md:w-auto text-center text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-emerald-700 transition duration-300 transform hover:scale-105"
        >
          دانلود قرارداد
        </Link>
      </div>

      <div className="border-t border-emerald-100 pt-4 h-[550px] overflow-y-auto bg-emerald-50 p-4 rounded-lg shadow-inner text-sm leading-relaxed text-secondary-700">
        {contractSections.map((section, idx) => (
          <div key={idx} className="mb-4">
            <strong>{section.title}</strong>
            <br />
            <div dangerouslySetInnerHTML={{ __html: typeof section.content === 'function' ? section.content({ first_name, last_name, national_id, phone_number, credit }) : section.content }} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div
          className="flex items-center gap-2"
          ref={(el) => { formRefs.current['agreement'] = el; }}
        >
          <Input
            type="checkbox"
            id="agreement"
            inputClassName="w-5 h-5 accent-emerald-500 rounded-lg"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
          <label className={clsxm('text-sm', showError ? 'text-red-500' : 'text-gray-700')} htmlFor="agreement">
            قرارداد را مطالعه و آن را تایید می‌نمایم
          </label>
        </div>
      </div>

      <div className="flex z-10 gap-4 justify-end w-full md:my-4 md:w-auto fixed md:static left-0 right-0 bg-white bottom-20 px-5 py-2 md:py-0 md:px-0">
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
};

export default Contract;
