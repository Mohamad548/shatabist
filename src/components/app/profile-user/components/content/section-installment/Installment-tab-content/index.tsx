'use client';
import React from "react";
import ShataLoading from "@/components/base/loading/shata-loading";
import CreditList, { INSTALLMENT_STATUS } from "./Installment-card";
import { useGetInstallment } from "@/components/app/profile-user/hooks";

const STATUS_CONFIG = {
  all: { label: "همه", emptyMessage: "هیچ قسطی ثبت نشده است." },
  pending: { label: "در انتظار بررسی", emptyMessage: "هیچ قسطی در انتظار بررسی نیست." },
  approved: { label: "تایید شده", emptyMessage: "هیچ قسط تایید شده‌ای وجود ندارد." },
  rejected: { label: "رد شده", emptyMessage: "هیچ قسطی رد نشده است." },
  finished: { label: "پایان یافته", emptyMessage: "هیچ قسط پایان یافته‌ای وجود ندارد." },
} as const;

interface InstallmentTabContentProps {
  status: keyof typeof STATUS_CONFIG;
}

export type CreditRequestStatus = "pending" | "approved" | "rejected" | "in-progress";

export interface ICreditResponse {
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

export interface IDocument {
  id: number;
  path: string;
  originalName: string;
  mimeType: string;
  size: number;
  type: string;
  business: string;
  requester: number;
  createdAt: string;
  updatedAt: string;
}

export interface Credit {
  id: number;
  request_status: CreditRequestStatus;   // وضعیت درخواست
  createdAt: string;
  updatedAt: string;
  credit?: {
    totalPrice: number;
    installmentItems?: Array<any>;
  } | null;
  credit_response: ICreditResponse[];
  id_card_document: IDocument;
  check_sample_document: IDocument;
  step:number
}

const InstallmentTabContent: React.FC<InstallmentTabContentProps> = ({ status }) => {
  const { data, isPending } = useGetInstallment(status === "all" ? "all" : status);

  if (isPending) {
    return (
      <div className="flex justify-center items-center py-12">
        <ShataLoading size="medium" text="در حال بارگذاری..." />
      </div>
    );
  }

  if (!data || !data.credits || data.credits.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {STATUS_CONFIG[status].emptyMessage}
      </div>
    );
  }

  // فیلتر کردن فقط اگر وضعیت all نیست
  const filteredCredits =
    status === "all"
      ? data.credits
      : data.credits.filter((c: Credit) => c.request_status === status);

  // مرتب‌سازی بر اساس تاریخ ایجاد
  const sortedCredits = [...filteredCredits].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // تابع مپ کردن وضعیت از API به وضعیت قابل قبول برای CreditList
  const mapStatus = (status: CreditRequestStatus): keyof typeof INSTALLMENT_STATUS => {
    if (status === "in-progress") return "pending";
    return status;
  };

  return (
    <div className="space-y-4">
      {sortedCredits.map((credit: Credit, index: number) => {
        const installment = {
          id: credit.id,
          totalPrice: credit.credit?.totalPrice || 0,
          installmentCount: credit.credit?.installmentItems?.length || 0,
          created_at: credit.createdAt,
          status: mapStatus(credit.request_status),
          credit_response: credit.credit_response,
          step:credit.step
        };
        return (
          <CreditList
            key={credit.id}
            installment={installment}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default InstallmentTabContent;
