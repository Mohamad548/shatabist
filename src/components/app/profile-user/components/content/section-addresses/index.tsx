'use client';
import HeadContentProfile from '@/components/base/head-content-profile';
import { AddressType } from '@/constants/mock-data/profile';
import { FormProvider, useForm } from 'react-hook-form';
import { useGetAddress } from '../../../hooks';
import { ActionAddress } from '../../base/profile-modals';
import ShataLoading from '@/components/base/loading/shata-loading';
import AddressesCard from '@/components/base/addresses-card';
function Addresses() {
  const { data, isPending } = useGetAddress();
  const addresses = data?.userAddresses ?? [];

  const methods = useForm();

  return (
    <div className="p-6 border border-gray-200 rounded-md bg-white">
      <HeadContentProfile HeadTapClass="flex items-center gap-2 py-2">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-bold text-base text-gray-800 h-">آدرس‌ها</h3>
          <FormProvider {...methods}>
            <ActionAddress
              editMode={false}
              className=" w-full md:w-1/2 md:h-4/5 "
            />
          </FormProvider>
        </div>
      </HeadContentProfile>

      {/* ۱. در حال بارگذاری */}
      {isPending && (
        <ShataLoading
          size="medium"
          showText={true}
          text="در حال بارگذاری آدرس‌ها..."
        />
      )}

      {/* ۲. خالی بودن لیست */}
      {!isPending && addresses?.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          هنوز آدرسی ثبت نشده است. روی&nbsp;
          <span className="font-medium text-primary-600">«ثبت آدرس جدید»</span>
          &nbsp;کلیک کنید.
        </div>
      )}

      {/* ۳. نمایش آدرس‌ها */}
      {!isPending && addresses?.length > 0 && (
        <FormProvider {...methods}>
          {addresses?.map((address: AddressType) => (
            <AddressesCard
              key={address?.id}
              address={address}
              title={address?.title}
              classNameContent="flex gap-6 py-6 border-y flex-col md:flex-row"
            />
          ))}
        </FormProvider>
      )}
    </div>
  );
}

export default Addresses;
