import clsxm from '@/utils/clsxm';
import { roundToNearestThousand } from '@/utils/roundToNearestThousand';
import Image from 'next/image';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface ActiveInstallmentProps {
  cartTotal: number;
  amount: number;
  minPrePayment: number;
  prePayment: boolean;
  installmentAmount: number;
  installments: number;
  finalAmount: number;
}

function ActiveInstallment({
  cartTotal,
  amount,
  minPrePayment,
  prePayment,
  installmentAmount,
  installments,
  finalAmount,
}: ActiveInstallmentProps) {
  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useFormContext();
  const maxPrePayment = cartTotal * 0.9;

  // تابع برای افزایش مقدار به میزان یک میلیون
  const increaseAmount = () => {
    setValue('amount', amount + 1000000);
  };
  // تابع برای کاهش مقدار به میزان یک میلیون
  const decreaseAmount = () => {
    if (amount > 0) {
      setValue('amount', amount - 1000000);
    }
  };
  return (
    <div className="flex flex-col w-full gap-4 md:flex-row rounded-lg p-4 bg-gray-200/70">
      <div
        className={clsxm(
          'grid grid-cols-1 w-full  gap-4  md:grid-rows-3 md:grid-cols-3 ',
          errors.selectedGateway ? 'border-red-500' : 'border-gray-300'
        )}
      >
        {/* بخش مبلغ سبد خرید */}
        <div className="flex flex-col row-start-1 items-center   bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            مبلغ سبد خرید
          </h3>
          <div className="w-full h-[3px] bg-gray-300 rounded-md mb-4"></div>
          <p className="text-sm mt-3 font-semibold text-emerald-500">
            {`${cartTotal.toLocaleString('fa-IR')} تومانء`}
          </p>
        </div>

        {/* بخش میزان پیش پرداخت */}
        <div className="flex flex-col  row-start-2 items-center md:row-start-1   bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            میزان پیش پرداخت
          </h3>
          <div className="w-full h-[3px] bg-gray-300 rounded-md mb-4"></div>
          <div className="flex items-center gap-2 relative">
            <button
              type="button"
              onClick={decreaseAmount}
              className={clsxm(
                'w-8 h-8 rounded-full bg-gray-200 hover:bg-red-500 transition-all hover:text-white text-2xl',
                amount <= minPrePayment && 'cursor-not-allowed opacity-50'
              )}
              disabled={amount <= minPrePayment}
            >
              -
            </button>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: prePayment
                  ? 'لطفاً مقدار پیش‌پرداخت را وارد کنید.'
                  : false,
                validate: (value) => {
                  // اعتبارسنجی حداقل پیش‌پرداخت
                  if (prePayment && value < minPrePayment) {
                    return `حداقل مقدار پیش‌پرداخت باید ${minPrePayment.toLocaleString()} تومانء باشد.`;
                  }
                  // اعتبارسنجی حداکثر پیش‌پرداخت
                  if (prePayment && value > maxPrePayment) {
                    return `حداکثر مقدار پیش‌پرداخت باید ${maxPrePayment.toLocaleString()} تومانء باشد.`;
                  }
                  return true;
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    value={amount.toLocaleString()} // مقدار amount را به درستی نشان می‌دهد
                    onChange={(e) => {
                      const value =
                        parseInt(e.target.value.replace(/,/g, '')) || 0;
                      setValue('amount', value); // مقدار را از طریق setValue به روز رسانی می‌کند
                    }}
                    className={clsxm(
                      'w-24 h-10 text-sm text-center font-bold border outline-gray-300 rounded-lg px-4',
                      error
                        ? 'border-red-500 text-red-500'
                        : 'border-emerald-500 text-emerald-500'
                    )}
                  />
                  {/* نمایش پیام خطا */}
                  {error && (
                    <p className="text-red-500 text-center absolute text-sm mt-2 top-[85%] w-full right-0">
                      {error.message}
                    </p>
                  )}
                </>
              )}
            />
            <button
              type="button"
              onClick={increaseAmount}
              className={clsxm(
                'w-8 h-8 rounded-full border transition-all bg-gray-200 hover:bg-emerald-500 hover:text-white text-lg',
                amount >= maxPrePayment && 'cursor-not-allowed opacity-50'
              )}
              disabled={amount >= maxPrePayment}
            >
              +
            </button>
          </div>
        </div>
        {/* بخش تعداد اقساط */}
        <div className="flex flex-col row-start-3 relative md:row-start-1   items-center  bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            تعداد اقساط <span className="text-red-500">*</span>
          </h3>
          <div className="w-full h-[3px] bg-gray-300 rounded-md mb-4"></div>
          <select
            {...register('installments', {
              required: 'لطفاً تعداد اقساط را انتخاب کنید.',
            })}
            defaultValue="" // مقدار پیش‌فرض
            className={clsxm(
              'w-full h-10 text-sm outline-gray-300 text-center font-semibold border rounded-lg px-4',
              errors.installments
                ? 'border-red-500 text-red-500'
                : 'border-gray-300'
            )}
          >
            <option value="" disabled>
              انتخاب تعداد اقساط
            </option>
            {[...Array(12)].map((_, index) => (
              <option key={index} value={index + 1}>
                {`${index + 1} قسط`}
              </option>
            ))}
          </select>
          {errors.installments &&
            typeof errors.installments.message === 'string' && (
              <p className="text-red-500 text-sm pt-1 absolute top-[80%] ">
                {errors.installments.message}
              </p>
            )}
        </div>
        {/* نتیجه نهایی */}
        <div className="flex flex-col md:mt-6 row-start-4 md:row-start-2 md:col-span-3 md:row-span-2 bg-white p-4 rounded-xl shadow-md">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            نتیجه نهایی اقساط
          </h3>
          <div className="w-full h-[3px] bg-gray-300 rounded-md mb-4"></div>

          {/* مبلغ هر قسط */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-medium text-gray-700">مبلغ هر قسط</p>
            <p className="text-sm font-Bold text-emerald-500">
              {installments ? (
                <span>
                  {`${roundToNearestThousand(installmentAmount).toLocaleString(
                    'fa-IR'
                  )} تومانء`}
                </span>
              ) : prePayment &&
                amount >= minPrePayment &&
                amount <= maxPrePayment ? (
                <span className="text-red-500 font-regular">
                  لطفاً تعداد اقساط را مشخص کنید
                </span>
              ) : (
                <span className="text-red-500 font-regular">
                  لطفاً میزان پیش پرداخت و تعداد اقساط را مشخص کنید
                </span>
              )}
            </p>
          </div>

          {/* مجموع پرداختی */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-medium text-gray-700">مجموع اقساط</p>
            <p className="text-sm font-Bold text-emerald-500">
              {installments ? (
                <span>
                  {`${roundToNearestThousand(finalAmount).toLocaleString(
                    'fa-IR'
                  )} تومانء`}
                </span>
              ) : prePayment &&
                amount >= minPrePayment &&
                amount <= maxPrePayment ? (
                <span className="text-red-500 font-regular">
                  لطفاً تعداد اقساط را مشخص کنید
                </span>
              ) : (
                <span className="text-red-500 font-regular">
                  لطفاً میزان پیش پرداخت و تعداد اقساط را مشخص کنید
                </span>
              )}
            </p>
          </div>

          {/* کل مبلغ تمام شده */}
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-700">
              کل مبلغ تمام شده
            </p>
            <p className="text-sm font-Bold text-emerald-500">
              {installments ? (
                <span>
                  {`${roundToNearestThousand(
                    finalAmount + amount
                  ).toLocaleString('fa-IR')} تومانء`}
                </span>
              ) : prePayment &&
                amount >= minPrePayment &&
                amount <= maxPrePayment ? (
                <span className="text-red-500 font-regular">
                  لطفاً تعداد اقساط را مشخص کنید
                </span>
              ) : (
                <span className="text-red-500 font-regular">
                  لطفاً میزان پیش پرداخت و تعداد اقساط را مشخص کنید
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      {/* بخش راهنمایی */}
      <div className="flex lg:col-start-4 row-start-5 md:max-w-80 md:row-start-1 md:row-span-3 h-full flex-col items-start bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-center my-2 gap-1 text-emerald-500">
          <div className="relative h-6 w-6">
            <Image
              src="/svg/info-circle-green.svg"
              fill
              style={{ objectFit: 'contain' }}
              alt="Phone Icon"
              quality={100}
            />
          </div>
          <h3 className="text-sm font-bold">راهنمایی خرید </h3>
        </div>

        <div className="w-full h-[3px] bg-emerald-500 rounded-md mb-4"></div>
        <ul className="list-disc font-medium text-gray-700 text-sm">
          <li className="mb-2 text-justify">
            <strong className="text-emerald-500">مبلغ سبد خرید:</strong> این
            مبلغ شامل کل خرید شما است. پس از انتخاب تعداد اقساط و پیش‌پرداخت،
            مبلغ قسط‌های ماهیانه محاسبه خواهد شد.
          </li>
          <li className="mb-2 text-justify">
            <strong className="text-emerald-500">میزان پیش‌پرداخت:</strong> مبلغ
            پیش‌پرداخت را می‌توانید با استفاده از دکمه‌های + و - تنظیم کنید.
            توجه داشته باشید که حداقل پیش‌پرداخت ۵,۰۰۰,۰۰۰ تومانء است.
          </li>
          <li className="mb-2 text-justify">
            <strong className="text-emerald-500">تعداد اقساط:</strong> لطفاً
            تعداد اقساط را انتخاب کنید. این عدد نشان‌دهنده تعداد قسط‌هایی است که
            باید پرداخت کنید.
          </li>
          <li className="mb-2 text-justify">
            <strong className="text-emerald-500">نتیجه نهایی:</strong> در این
            بخش، مبلغ هر قسط، مجموع پرداختی و کل مبلغ تمام شده به شما نمایش داده
            می‌شود.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ActiveInstallment;
