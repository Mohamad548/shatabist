'use client';

import React from 'react';
import TabManager from '@/components/base/tab-manager';
import Button from '@/components/base/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import InstallmentPlan from './InstallmentPlan';
import { AddRequestCredit } from '../../base/profile-modals';
import { FormProvider, useForm } from 'react-hook-form';
import { useGetUser } from '../../../hooks';
import InstallmentTabContent from './Installment-tab-content';
import { GetUserResponse } from '../../../hooks/type';

function Installment() {
  const { data: user, isPending } = useGetUser<GetUserResponse>();
  const searchParams = useSearchParams();
  const isInstallmentWithParam = searchParams.has('RequestCredit');
  const userData = user?.user;
  const authlevel = userData?.auth_level;
  const methods = useForm();

  const buttonClass =
    'bg-emerald-500 hover:bg-emerald-600 text-white font-Bold text-base py-[10px] px-4 border rounded-md border-emerald-600 transition-all duration-300';

  const renderButton = () => {
    if (isPending) {
      return (
        <div className="w-[160px] h-[42px] rounded-md bg-gray-200 animate-pulse" />
      );
    }

    if (authlevel === 0) {
      return (
        <FormProvider {...methods}>
          <AddRequestCredit />
        </FormProvider>
      );
    }

    return (
      <Link href="/profile-user/installment?RequestCredit">
        <Button className={buttonClass}>ثبت درخواست جدید</Button>
      </Link>
    );
  };

  const tabs = [
    {
      id: 'pending',
      label: 'جاری',
      content: <InstallmentTabContent status="pending" />,
    },
    {
      id: 'approved',
      label: 'تاییدشده',
      content: <InstallmentTabContent status="approved" />,
    },

    {
      id: 'finished',
      label: 'پایان‌یافته',
      content: <InstallmentTabContent status="finished" />,
    },
    {
      id: 'rejected',
      label: 'ردشده',
      content: <InstallmentTabContent status="rejected" />,
    },
    {
      id: 'all',
      label: 'همه',
      content: <InstallmentTabContent status="all" />,
    },
  ];

  return (
    <>
      {isInstallmentWithParam ? (
        <InstallmentPlan />
      ) : (
        <div className="border rounded-md pb-4">
          <div className="flex justify-between items-center p-4">
            <h3 className="font-bold text-base text-gray-800">درخواست‌ها</h3>
            {renderButton()}
          </div>
          <TabManager
            tabs={tabs}
            defaultTab="pending"
            queryParamName="activeTab"
            backPath="/profile-user"
            HeadTapClass="flex p-4 items-center gap-2"
          />
        </div>
      )}
    </>
  );
}

export default Installment;
