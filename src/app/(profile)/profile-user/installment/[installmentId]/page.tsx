"use client";

import dynamic from "next/dynamic";

const InstallmentDetail = dynamic(
  () =>
    import(
      "@/components/app/profile-user/components/content/section-installment/Installment-detail"
    ),
  { ssr: false }
);

interface InstallmentDetailPageProps {
  params: {
    installmentId: string;
  };
}

const InstallmentDetailPage = ({ params: { installmentId } }: InstallmentDetailPageProps) => {
  return <InstallmentDetail installmentId={installmentId} />;
};

export default InstallmentDetailPage;
