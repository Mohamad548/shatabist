import Image from 'next/image';
import React from 'react';
import Button from '@/components/base/button';
import SpeedometerChart from './HalfCircularChart';
import { CreditDetail } from '@/components/app/profile-user/hooks/type';
interface Props {
  selectedLevel?: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  installmentDetail?: CreditDetail;
    currentStep?: number;
}

function Checking({
  setCurrentStep,
  installmentDetail,
  currentStep=0
}: Props) {


const goToNextStep = async () => {
    setCurrentStep(2);
};

  const userInfo = [
    { label: 'نام:', value: installmentDetail?.first_name || '-' },
    { label: 'نام خانوادگی:', value: installmentDetail?.last_name || '-' },
    { label: 'کد ملی:', value: installmentDetail?.national_id || '-' },
    { label: 'شماره موبایل:', value: installmentDetail?.phone_number || '-' },
  ];

  const creditResponse = installmentDetail?.credit_response?.[0];

  const documentResults = [
    {
      title: 'نتیجه اعتبار سنجی',
      value: creditResponse ? 'مجاز به دریافت وام' : 'نامشخص',
    },
    {
      title: 'چک برگشتی',
      value: creditResponse?.check_history_result ? 'دارد' : 'ندارد',
    },
    {
      title: 'حداکثر تعداد اقساط',
      value: creditResponse?.max_installment
        ? `${creditResponse.max_installment} قسط`
        : '-',
    },
    {
      title: 'سقف اعتبار',
      value: creditResponse?.max_credit
        ? `${creditResponse.max_credit.toLocaleString()} تومان`
        : '-',
    },
  ];

  const riskLevels = [
    {
      label: 'A1',
      color: 'bg-[#2AA10F]',
      risk: 'ریسک ناچیز',
      min: 680,
      max: 900,
    },
    {
      label: 'A2',
      color: 'bg-[#2AA10F]',
      risk: 'ریسک خیلی کم',
      min: 660,
      max: 679,
    },
    {
      label: 'A3',
      color: 'bg-[#2AA10F]',
      risk: 'ریسک بسیار کم',
      min: 640,
      max: 659,
    },
    {
      label: 'B1',
      color: 'bg-[#92E000]',
      risk: 'ریسک حداقل',
      min: 620,
      max: 639,
    },
    { label: 'B2', color: 'bg-[#92E000]', risk: 'ریسک کم', min: 600, max: 619 },
    {
      label: 'B3',
      color: 'bg-[#92E000]',
      risk: 'ریسک خیلی کم',
      min: 580,
      max: 599,
    },
    {
      label: 'C1',
      color: 'bg-[#ffd200]',
      risk: 'ریسک کم قابل قبول',
      min: 560,
      max: 579,
    },
    {
      label: 'C2',
      color: 'bg-[#ffd200]',
      risk: 'ریسک کمتر قابل قبول',
      min: 540,
      max: 559,
    },
    {
      label: 'C3',
      color: 'bg-[#ffd200]',
      risk: 'ریسک قابل قبول',
      min: 520,
      max: 539,
    },
    { label: 'D1', color: 'bg-[#F58B00]', risk: 'ریسک کم', min: 500, max: 519 },
    {
      label: 'D2',
      color: 'bg-[#F58B00]',
      risk: 'ریسک کمتر',
      min: 480,
      max: 499,
    },
    {
      label: 'D3',
      color: 'bg-[#F58B00]',
      risk: 'ریسک نسبی',
      min: 460,
      max: 479,
    },
    {
      label: 'E1',
      color: 'bg-[#DE3700]',
      risk: 'ریسک متوسط',
      min: 440,
      max: 459,
    },
    {
      label: 'E2',
      color: 'bg-[#DE3700]',
      risk: 'ریسک زیاد',
      min: 420,
      max: 439,
    },
    {
      label: 'E3',
      color: 'bg-[#DE3700]',
      risk: 'ریسک خیلی زیاد',
      min: 0,
      max: 419,
    },
  ];

  const selectedItem = riskLevels.find(
    (item) =>
      creditResponse?.risk_number &&
      creditResponse.risk_number >= item.min &&
      creditResponse.risk_number <= item.max
  );

  return (
    <div className="flex flex-col gap-6 w-full pt-6">
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-base text-gray-800">اطلاعات اولیه</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {userInfo.map((item, index) => (
            <li
              key={index}
              className="relative flex flex-col flex-1 border border-emerald-500 py-2 px-4 rounded-md items-start"
            >
              <span className="font-regular text-sm text-gray-600">
                {item.label}
              </span>
              <span className="font-regular text-sm text-black">
                {item.value}
              </span>
              <span className="text-right border absolute left-2 -top-3 rounded-full bg-emerald-50 text-emerald-500 font-Bold px-2 py-1 flex justify-center text-[10px] items-center">
                تاییدشده
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-base text-gray-800">
          نتیجه بررسی مدارک ارسال شده توسط شما
        </h3>
        <ul className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {documentResults.map((item, index) => (
            <li
              key={index}
              className="flex flex-col w-full min-w-36 justify-center items-center gap-2 border border-gray-300 rounded-md p-4 md:flex-1"
            >
              <h3 className="font-bold text-sm text-gray-800">{item.title}</h3>
              <h3 className="font-bold text-sm text-emerald-500">
                {item.value}
              </h3>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-base text-gray-800">
          رتبه اعتباری شما بر اساس اعتبار سنجی اطلاعات ارسالی شما انجام شده است.
        </h3>
        <div className="flex flex-col xl:flex-row items-center border py-8 rounded-md gap-6 justify-center xl:justify-between">
          <div className="flex flex-col justify-center items-center gap-1 pr-8">
            <h1 className="font-bold text-base text-gray-800">
              {selectedItem
                ? `${selectedItem.label} - ${selectedItem.risk}`
                : 'رتبه‌ای انتخاب نشده'}
            </h1>
            <div className="flex gap-1 flex-wrap">
              {riskLevels.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div
                    className={`p-1 ${item.color} flex items-center justify-center text-white font-regular`}
                  >
                    {item.label}
                  </div>
                  {selectedItem?.label === item.label && (
                    <div className="relative w-4 h-4">
                      <Image
                        src="/svg/profile/Polygon 3.svg"
                               fill
    style={{ objectFit: "contain" }}
                        alt="انتخاب شده"
                        quality={100}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="pl-16 flex justify-center">
            <SpeedometerChart value={creditResponse?.risk_number ?? 0} />
          </div>
        </div>

        <div className="flex z-10 gap-4 justify-end w-full md:my-4 md:w-auto fixed md:static left-0 right-0 bg-white bottom-20 px-5 py-2 md:py-0 md:px-0">
   <Button
  className="group hover:bg-emerald-500 border flex flex-col gap-1 items-center hover:text-white border-emerald-500 py-3 transition duration-300 md:px-16 text-emerald-500 w-full md:w-auto rounded-md font-Medium text-base"
  onClick={goToNextStep}
>
  <h3 className="text-sm flex justify-center">تایید و ادامه</h3>
</Button>
        </div>
      </div>
    </div>
  );
}

export default Checking;
