import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useFormContext } from 'react-hook-form';

function InactiveInstallment({ radioRef }: { radioRef: any }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <label
      ref={radioRef}
      id="creditActivation"
      className="flex flex-col items-center justify-center py-10 px-6 bg-gray-100 rounded-lg shadow-md"
    >
      <div className="relative h-60 w-96">
        <Image
          src="/images/credit.png"
          fill
          style={{ objectFit: 'contain' }}
          alt="Phone Icon"
          quality={100}
        />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        اعتبار شما فعال نیست
      </h3>
      <p className="text-sm text-gray-600 text-center mb-6">
        برای استفاده از روش پرداخت اقساطی، لطفاً ابتدا اعتبار خود را فعال کنید.
      </p>
      <div className="flex flex-col gap-4">
        <input
          type="hidden"
          {...register('creditActivation', {
            required: 'اعتبار شما فعال نیست، لطفاً درخواست اعتبار دهید.',
          })}
        />

        {errors.creditActivation && // تغییر به
          typeof errors.creditActivation.message === 'string' && ( // تغییر به
            <p className="text-red-500 text-sm pt-2">
              {errors.creditActivation.message} {/* تغییر به  */}
            </p>
          )}
      </div>

      <Link
        href="/profile-user/installment?RequestCredit"
        className="px-6 py-2 bg-emerald-500 text-white text-sm rounded-lg shadow hover:bg-emerald-600 transition-all"
      >
        درخواست فعال‌سازی اعتبار
      </Link>
    </label>
  );
}

export default InactiveInstallment;
