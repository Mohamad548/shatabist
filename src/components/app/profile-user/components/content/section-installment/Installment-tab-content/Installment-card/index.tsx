'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import clsxm from '@/utils/clsxm';
import { toLocalDateString, toLocalTimeString } from '@/utils/toLocalDate';
import Link from 'next/link';

export const INSTALLMENT_STATUS = {
  pending: 'در انتظار بررسی',
  approved: 'تایید شده',
  rejected: 'رد شده',
  finished: 'پایان یافته',
} as const;

interface ICreditResponse {
  id: number;
  main_result: string | null;
  description: string | null;
  check_sample_result: boolean;
  check_history_result: boolean | null;
  id_card_result: boolean;
  max_installment: number | null;
  max_credit: number | null;
  risk_check: string | null;
  risk_number: number | null;
  credit_requestId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Installment {
  id: number;
  totalPrice: number;
  installmentCount: number;
  created_at: string;
  status: keyof typeof INSTALLMENT_STATUS;
  credit_response?: ICreditResponse[];
  step: number;
}

interface CreditListProps {
  installment: Installment;
  index: number;
}

const STATUS_COLOR = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  finished: 'bg-gray-100 text-gray-800',
};

const CreditList: React.FC<CreditListProps> = ({ installment, index }) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (
      installment.status === 'approved' ||
      installment.status === 'finished'
    ) {
      router.push(`/profile-user/installment/${installment.id}`);
    }
  };

  const displayId =
    installment.status === 'pending'
      ? `443033030${installment.id}`
      : `${installment.id}`;

  // قبل از return
  let statusMessage: string = INSTALLMENT_STATUS[installment.status];
  let statusColor = STATUS_COLOR[installment.status];
  if (installment.step === 44) {
    statusMessage = 'در انتظار تایید چک';
    statusColor = 'bg-yellow-100 text-yellow-800'; // زرد
  }

  let showEditButton = false;

if (installment.status === 'pending') {
  if (installment.step === 33 || installment.step === 55) {
    showEditButton = true; // دکمه ویرایش فعال
    statusMessage = 'نیازمند اصلاح توسط کاربر';
  } else if (installment.step === 2 || installment.step === 22) {
    showEditButton = false; // دکمه ویرایش غیرفعال
    statusMessage =
      installment.step === 2 ? 'مشاهد نتیجه اعتبار سنجی' : 'در حال پردازش';
  }
}

  const STEP_TEXTS: Record<number, string> = {
    2: 'مشاهد نتیجه اعتبار سنجی',
    3: 'ثبت درخواست اعتبار',
    4: 'تکمیل مدارک',
    5: 'قرارداد',
    6: 'ارسال مدارک',
    7: 'فعال سازی اعتبار',
  };
  return (
    <div className="border border-dashed border-gray-300 p-4 rounded-md flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1 items-start">
        <div className="bg-blue-100 text-blue-800 font-semibold px-2 py-1 rounded-md text-sm">
          {index + 1}
        </div>

        <div className="text-gray-700">
          <span>شماره درخواست:</span>{' '}
          <span className="font-semibold">{displayId}</span>
        </div>

        {installment.status !== 'pending' && (
          <>
            <div className="text-gray-700">
              <span className="font-semibold">مبلغ درخواست:</span>{' '}
              {installment.totalPrice.toLocaleString()} تومان
            </div>
            <div className="text-gray-700">
              <span className="font-semibold">تعداد اقساط:</span>{' '}
              {installment.installmentCount}
            </div>
          </>
        )}

        <div className="text-gray-500">
          {toLocalDateString(installment.created_at)} -{' '}
          {toLocalTimeString(installment.created_at)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {(installment.status === 'approved' ||
          installment.status === 'finished') && (
          <button
            onClick={handleButtonClick}
            className="px-4 py-1 rounded-md text-white font-medium bg-green-600 hover:bg-green-700"
          >
            مشاهده اقساط
          </button>
        )}

        {installment.status === 'pending' && STEP_TEXTS[installment.step] ? (
          <Link
            href={`/profile-user/installment/${installment.id}`}
            className="px-3 py-1 rounded-md bg-emerald-500 font-medium text-white hover:bg-emerald-500 hover:text-white transition-all"
          >
            {STEP_TEXTS[installment.step]}
          </Link>
        ) : (
          <span
            className={clsxm(
              'px-3 py-1 rounded-md text-sm font-medium',
              statusColor
            )}
          >
            {statusMessage}
          </span>
        )}

        {showEditButton && (
          <Link
            href={`/profile-user/installment/${installment.id}`}
            className="px-4 py-1 rounded-md text-emerald-500 font-medium bg-emerald-100/20 hover:bg-emerald-500 hover:text-white transition-all"
          >
            ویرایش
          </Link>
        )}
      </div>
    </div>
  );
};

export default CreditList;
