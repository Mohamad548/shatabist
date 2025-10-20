'use client';

import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { useGetInstallmentById } from '@/components/app/profile-user/hooks';
import Authorization from '../InstallmentPlan/components/authorization';
import CreditRequest from '../InstallmentPlan/components/credit-request';
import Documents from '../InstallmentPlan/components/documents';
import DocumentSend from '../InstallmentPlan/components/document_send';
import Contract from '../InstallmentPlan/components/contract';
import Checking from '../InstallmentPlan/components/checking';
import Done from '../InstallmentPlan/components/done';
import Stepper from '@/components/base/stepper';
import SendRequestConfirmation from '../send-request-confirmation';

interface InstallmentDetailProps {
  installmentId: string;
}

const InstallmentDetail: React.FC<InstallmentDetailProps> = ({ installmentId }) => {
  const { data: installmentDetail, isPending } = useGetInstallmentById(installmentId);
  const methods = useForm();

  const stepFromServer = installmentDetail?.step ?? 1;
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    if (!installmentDetail) return;

    const step = installmentDetail.step;

    switch (step) {
      case 22:
        setSendRequest(true);
        setCurrentStep(0);
        break;
      case 33:
        setSendRequest(false);
        setCurrentStep(0);
        break;
      case 44:
        setSendRequest(true);
        setCurrentStep(3);
        break;
      case 55:
        setSendRequest(false);
        setCurrentStep(3);
        break;
      default:
        setSendRequest(false);
        setCurrentStep(Math.max(stepFromServer - 1, 0));
        break;
    }
  }, [installmentDetail, stepFromServer]);

  if (isPending) return <div className="mt-8 text-center">در حال بارگذاری...</div>;
  if (!installmentDetail) return <div className="mt-8 text-center">اطلاعاتی وجود ندارد.</div>;

  const steps = [
    { id: 0, label: 'اعتبار سنجی' },
    { id: 1, label: 'بررسی و اعلام نتیجه' },
    { id: 2, label: 'ثبت درخواست اعتبار' },
    { id: 3, label: 'تکمیل مدارک' },
    { id: 4, label: 'قرارداد' },
    { id: 5, label: 'ارسال مدارک' },
    { id: 6, label: 'فعال سازی اعتبار' },
  ];

  const handleStepChange: React.Dispatch<React.SetStateAction<number>> = (value) => {
    let nextStep: number;
    if (typeof value === 'number') nextStep = value;
    else if (typeof value === 'function') nextStep = value(currentStep);
    else return;

    if (nextStep === 0) return; // مرحله 0 غیرقابل کلیک

    // حرکت به جلو محدودیت دارد
    if (nextStep > currentStep) {
      if (stepFromServer === 33 && nextStep > 0) return;
      if ((stepFromServer === 44 || stepFromServer === 55) && nextStep > 3) return;
    }

    // حرکت به عقب همیشه مجاز
    setCurrentStep(nextStep);
  };

  const stepComponents: Record<number, React.ReactNode> = {
    0: (
      <FormProvider {...methods}>
        <Authorization installmentDetail={installmentDetail} sendRequest={sendRequest} />
      </FormProvider>
    ),
    1: (
      <Checking
        setCurrentStep={handleStepChange}
        currentStep={currentStep}
        installmentDetail={installmentDetail}
      />
    ),
    2: (
      <CreditRequest
        currentStep={currentStep}
        setCurrentStep={handleStepChange}
        installmentDetail={installmentDetail}
      />
    ),
    3: (
      <FormProvider {...methods}>
        <Documents
          setCurrentStep={handleStepChange}
          currentStep={currentStep}
          installmentDetail={installmentDetail}
          setSendRequest={setSendRequest}
        />
      </FormProvider>
    ),
    4: <Contract setCurrentStep={handleStepChange} installmentDetail={installmentDetail} />,
    5: <DocumentSend setCurrentStep={handleStepChange} />,
    6: <Done setCurrentStep={handleStepChange} />,
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {sendRequest ? (
        <SendRequestConfirmation trackingId={installmentDetail?.id} isEdit={!!installmentDetail} />
      ) : (
        <>
          <Stepper
            steps={steps.map((step) => {
              let disabled = false;

              if (step.id === 0) disabled = true; // مرحله اول همیشه غیرقابل کلیک
              else if (step.id > currentStep) {
                // محدودیت حرکت به جلو
                if (stepFromServer === 33 && step.id > 1) disabled = true;
                if ((stepFromServer === 44 || stepFromServer === 55) && step.id > 3) disabled = true;
                if (step.id > stepFromServer - 1) disabled = true; // حالت معمولی
              }

              return { ...step, disabled };
            })}
            currentStep={currentStep}
            setCurrentStep={handleStepChange}
          />
          <div className="mt-8">{stepComponents[currentStep] || null}</div>
        </>
      )}
    </>
  );
};

export default InstallmentDetail;
