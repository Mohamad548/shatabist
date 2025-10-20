'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@/components/base/button';
import clsxm from '@/utils/clsxm';
import { CreditDetail } from '@/components/app/profile-user/hooks/type';
import {
  useUpdateCredit,
} from '@/components/app/profile-user/hooks';
import toast from 'react-hot-toast';

type FormValues = {
  amount: number;
};

interface CreditRequestProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  installmentDetail?: CreditDetail;
  currentStep?: number;
}

export default function CreditRequest({
  setCurrentStep,
  installmentDetail,
  currentStep = 0,
}: CreditRequestProps) {
  const minCredit = 5000000;
  const maxCredit =
    installmentDetail?.credit_response?.[0]?.max_credit ?? 100000000; // سقف واقعی

  const { control, setValue, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: { amount: minCredit },
  });
  const { mutateAsync: updateCreditMutation, isPending } = useUpdateCredit();
  const amount = watch('amount');
  const increaseAmount = () => {
    if (amount + 1000000 <= maxCredit) {
      setValue('amount', amount + 1000000);
    }
  };

  const decreaseAmount = () => {
    if (amount - 1000000 >= minCredit) {
      setValue('amount', amount - 1000000);
    }
  };

  const onSubmit = async () => {
    try {
      const nextStep = currentStep + 1;

      if (nextStep === 3) {
        // مقدار سقف اعتبار
        const maxCredit =
          installmentDetail?.credit_response?.[0]?.max_credit ?? 100000000;

        // مقدار اعتبار فرم
        const creditAmount = watch('amount');

        // ارسال به هوک جدید updateCredit
        await updateCreditMutation({
          id: (installmentDetail?.id ?? '').toString(),
          payload: { credit: creditAmount },
        });

        // رفتن به مرحله بعد
        setCurrentStep(nextStep);
        toast.success('تبریک! شما به مرحله بعدی منتقل شدید ✅');
      }
    } catch (error) {
      toast.error('خطا در بروزرسانی مرحله ❌');
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center max-w-80 rounded-md shadow-lg gap-4">
        <div className="bg-emerald-500 w-full text-white text-center rounded-t-lg py-3">
          <span className="font-bold text-xl">اعتبار خرید کالا</span>
        </div>
        <div className="flex items-center gap-2 ">
          <button
            type="button"
            onClick={decreaseAmount}
            className="bg-gray-200 shadow-md text-red-500 font-bold text-2xl rounded-full py-2 px-4 hover:bg-red-500 hover:text-gray-200 transition"
          >
            -
          </button>
          <Controller
            name="amount"
            control={control}
            rules={{ min: minCredit, max: maxCredit }}
            render={({ field }) => (
              <div className="relative">
                <input
                  {...field}
                  type="text"
                  value={amount.toLocaleString()}
                  onChange={(e) => {
                    let value =
                      parseInt(e.target.value.replace(/,/g, '')) || minCredit;
                    if (value > maxCredit) value = maxCredit;
                    if (value < minCredit) value = minCredit;
                    setValue('amount', value);
                  }}
                  className={clsxm(
                    'text-xl font-bold max-w-48 text-center py-3 rounded-lg focus:outline-none border-b-2',
                    amount < minCredit || amount > maxCredit
                      ? 'text-red-500 border-red-500'
                      : 'text-green-500 border-green-500'
                  )}
                />
                <label className="absolute left-3 top-3 text-gray-500">
                  تومانء
                </label>
              </div>
            )}
          />
          <button
            type="button"
            onClick={increaseAmount}
            className="bg-gray-200 shadow-md text-emerald-500 font-bold text-2xl rounded-full py-2 px-4 hover:bg-emerald-500 hover:text-gray-200 transition"
          >
            +
          </button>
        </div>
        <span
          className={clsxm(
            'text-sm text-gray-700',
            amount < minCredit || amount > maxCredit
              ? 'text-red-500 border-red-500'
              : 'text-green-500 border-green-500'
          )}
        >
          (مقدار باید بین {minCredit.toLocaleString()} و{' '}
          {maxCredit.toLocaleString()} تومانء باشد)
        </span>
        <h3 className="text-center text-gray-400 text-sm mt-4 px-2 pb-2">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می‌باشد
        </h3>
      </div>

      <div className="flex z-10 gap-4 justify-end w-full md:my-4 md:w-auto fixed md:static left-0 right-0 bg-white bottom-20 px-5 py-2 md:py-0 md:px-0">
        <Button
          className="py-3 md:px-10 text-gray-500 flex flex-col gap-1 items-center hover:bg-gray-100 transition-all w-full md:w-auto rounded-md font-Medium text-base border-2"
          onClick={goToPreviousStep}
        >
          <h3 className="text-sm flex justify-center">مرحله قبلی</h3>
        </Button>
        <Button
          disabled={isPending}
          className={clsxm(
            'group border flex flex-col gap-1 items-center py-3 transition duration-300 md:px-16 w-full md:w-auto rounded-md font-Medium text-base',
            isPending
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'hover:bg-emerald-100/20 hover:text-white border-emerald-500 text-emerald-500'
          )}
          onClick={handleSubmit(onSubmit)}
        >
          <h3 className="text-sm flex justify-center">
            {isPending ? 'در حال ارسال...' : 'تایید و ادامه'}
          </h3>
        </Button>
      </div>
    </div>
  );
}
