'use client';
import HeadContentProfile from '@/components/base/head-content-profile';
import Stepper from '@/components/base/stepper';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Checking from './components/checking';
import Contract from './components/contract';
import CreditRequest from './components/credit-request';
import DocumentSend from './components/document_send';
import Documents from './components/documents';
import Done from './components/done';
import { useRouter } from 'next/navigation';
import { useGetUser } from '@/components/app/profile-user/hooks';
import TimerClient from '@/components/base/timer'; // ایمپورت TimerClient
import { Toaster } from 'react-hot-toast';
import Authorization from './components/authorization';
import { GetUserResponse } from '@/components/app/profile-user/hooks/type';

const steps = [
  { id: 1, label: 'اعتبار سنجی' },
  { id: 2, label: 'بررسی و اعلام نتیجه' },
  { id: 3, label: 'ثبت درخواست اعتبار' },
  { id: 4, label: 'تکمیل مدارک' },
  { id: 5, label: 'قرارداد' },
  { id: 6, label: 'ارسال مدارک' },
  { id: 7, label: 'فعال سازی اعتبار' },
];

const InstallmentPlan = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const methods = useForm();
  const router = useRouter();

  const { data: user } = useGetUser<GetUserResponse>();
  const [expiryTimestamp] = useState(Date.now() + 1 * 10 * 1000); // یک دقیقه تایمر

  const handleExpire = () => {
    router.replace('/profile-user/user-info');
  };

  // تعریف stepComponents همینجا قبل از return
  const stepComponents: Record<number, React.JSX.Element> = {
    0: (
      <FormProvider {...methods}>
        <Authorization />
      </FormProvider>
    ),
    1: <Checking setCurrentStep={setCurrentStep} />,
    2: <CreditRequest setCurrentStep={setCurrentStep} />,
    3: (
      <FormProvider {...methods}>
        <Documents setCurrentStep={setCurrentStep} />
      </FormProvider>
    ),
    4: <Contract setCurrentStep={setCurrentStep} />,
    5: <DocumentSend setCurrentStep={setCurrentStep} />,
    6: <Done setCurrentStep={setCurrentStep} />,
  };

  return (
    <div className="min-h-screen   p-4 relative">
      <Toaster position="top-center" reverseOrder={false} />
      <HeadContentProfile HeadTapClass="flex gap-2">
        <h1 className="text-base font-bold mb-4 text-gray-700">
          اقدام برای خرید اقساط
        </h1>
      </HeadContentProfile>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <div className="mt-8">{stepComponents[currentStep] || null}</div>

      {user && user?.user?.auth_level == 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-11-/12 p-8 text-center flex flex-col items-center space-y-6">
            <h2 className="text-xl font-extrabold text-green-900 tracking-wide">
              🚫 شما احراز هویت نشده‌اید
            </h2>
            <p className="text-green-800 text-sm leading-relaxed">
              در حال انتقال به صفحه احراز هویت... <br />
              لطفا{' '}
              <span className="inline-block px-5 py-1 bg-green-100 text-green-900 rounded-xl font-mono text-sm tracking-widest">
                <TimerClient
                  expiryTimestamp={expiryTimestamp}
                  onExpire={handleExpire}
                  hideExpireMessage
                />
              </span>{' '}
              ثانیه صبر کنید.
            </p>
            <button
              onClick={() => router.replace('/profile-user/user-info')}
              className="mt-4 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold rounded-xl px-8 py-3 shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
              aria-label="رفتن به صفحه احراز هویت"
            >
              هم اکنون برو
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallmentPlan;
