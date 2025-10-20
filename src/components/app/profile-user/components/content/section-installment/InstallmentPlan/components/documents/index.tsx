import {
  useFinalizeCredit,
  useGetAddress,
  useUpdateInstallmentById,
  useUploadDocument,
} from '@/components/app/profile-user/hooks';
import { CreditDetail } from '@/components/app/profile-user/hooks/type';
import AddressesCard from '@/components/base/addresses-card';
import Button from '@/components/base/button';
import FileUpload from '@/components/base/file-upload';
import ManageModal from '@/components/base/modal';
import { AddressType } from '@/constants/mock-data/profile';
import clsxm from '@/utils/clsxm';
import { useFormErrorHandler } from '@/utils/useFormErrorHandler';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import SendRequestConfirmation from '../../../send-request-confirmation';

interface CreditRequestProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  installmentDetail?: CreditDetail;
  currentStep?: number;
  sendRequest?: boolean;
  setSendRequest?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Documents = ({
  setCurrentStep,
  installmentDetail,
  setSendRequest,
  currentStep = 0,
  sendRequest,
}: CreditRequestProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { data } = useGetAddress();
  const addresses = data?.userAddresses ?? [];
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
    addresses[0] || null
  );

  const [tempSelectedAddress, setTempSelectedAddress] =
    useState<AddressType | null>(selectedAddress);
  const goToPreviousStep = () =>
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  const userInfo = [
    { label: 'نام:', value: installmentDetail?.first_name ?? '-' },
    { label: 'نام خانوادگی:', value: installmentDetail?.last_name ?? '-' },
    { label: 'کد ملی:', value: installmentDetail?.national_id ?? '-' },
    { label: 'شماره موبایل:', value: installmentDetail?.phone_number ?? '-' },
  ];

  const { mutateAsync: finalizeMutation, isPending } = useFinalizeCredit();
  const { handleSubmit, watch } = useFormContext();
  const { formRefs, onError } = useFormErrorHandler();
  const { mutateAsync: uploadDocument, isPending: isUploading } =
    useUploadDocument();

  const handleSelectAddress = (address: AddressType) => {
    setTempSelectedAddress(address);
  };
  const handleAddressSelection = () => {
    if (tempSelectedAddress) {
      setSelectedAddress(tempSelectedAddress);
    }
  };

  const onSubmit = async (data: any) => {
    if (formRef.current) {
      formRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    try {
      if (!installmentDetail?.id) throw new Error('اطلاعات اقساط موجود نیست');

      const currentAddress =
        selectedAddress ?? tempSelectedAddress ?? addresses[0] ?? null;

      if (!currentAddress?.id && addresses.length > 0) {
        toast.error('آدرس انتخاب نشده است');
        return;
      }

      let mainCheckId: string | null = null;

      if ((data['افزودن چک'] as any)?.file) {
        const checkRes = await uploadDocument({
          file: (data['افزودن چک'] as any).file,
          type: 'identity',
          business: 'credit',
        });
        mainCheckId = checkRes.document.id;
      }

      // ارسال درخواست نهایی
      await finalizeMutation({
        id: installmentDetail.id.toString(),
        payload: {
          ...(currentAddress?.id && { userAddressId: currentAddress.id }),
          main_check: mainCheckId,
        },
      });
      setSendRequest?.(true)
      toast.success('درخواست شما با موفقیت نهایی شد ✅');
    } catch (error) {
      toast.error('خطا در نهایی‌سازی درخواست ❌');
    }
  };
  return (
    <>
      {sendRequest ? (
        <SendRequestConfirmation
          trackingId={1111}
          isEdit={!!installmentDetail}
        />
      ) : (
        <form
          ref={formRef}
          className="flex flex-col gap-8 w-full pt-6"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          {/* بخش اطلاعات اولیه */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-base text-gray-800">اطلاعات اولیه</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
              {userInfo.map((item, index) => (
                <li
                  key={index}
                  className=" relative flex flex-col  flex-1 border border-emerald-500  py-2 px-4 rounded-md items-start"
                >
                  <span className="font-regular text-sm text-gray-600">
                    {item.label}
                  </span>
                  <span className="font-regular text-sm text-black">
                    {item.value}
                  </span>
                  <span className="text-right border absolute left-2 -top-3 rounded-full bg-emerald-50 text-emerald-500 font-Bold px-2 py-1 flex justify-center text-[10px] items-center">
                    تاییدشده
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* بخش آدرس */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <h3 className="font-bold text-base text-gray-800">آدرس</h3>
              {addresses.length > 0 && (
                <ManageModal
                  selectedAddress={selectedAddress}
                  setTempSelectedAddress={setTempSelectedAddress}
                  modalBodyClass="gap-4"
                  actionLabel="انتخاب"
                  actionBtnClass="bg-emerald-500 w-full text-white font-bold"
                  triggerContent={
                    <div className="flex gap-2 cursor-pointer">
                      <h3 className="text-emerald-500 font-semibold text-base">
                        تغییر یا ویرایش آدرس
                      </h3>
                      <div className="relative h-6 w-6">
                        <Image
                          src="/svg/arrow-left-green.svg"
                                   fill
    style={{ objectFit: "contain" }}
                          alt="location-add"
                          quality={100}
                        />
                      </div>
                    </div>
                  }
                  className="fixed inset-0 z-50"
                  onConfirm={(closeModal) => {
                    handleAddressSelection();
                    closeModal(); // بستن مودال بعد از انتخاب آدرس
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3>لطفا آدرس خود را انتخاب کنید.</h3>
                    <ManageModal
                      triggerContent={
                        <div className="py-2 px-3 border text-emerald-500 bg-emerald-50 rounded-md cursor-pointer">
                          ثبت آدرس جدید
                        </div>
                      }
                      className="fixed inset-0 z-50"
                      actionLabel="ایجاد"
                    >
                      <div>فرم ثبت آدرس جدید</div>
                    </ManageModal>
                  </div>
                  {addresses.map((address: AddressType) => (
                    <AddressesCard
                      key={address.id}
                      address={address}
                      classNameContent={clsxm(
                        'flex gap-6 py-3 rounded-md px-4 border cursor-pointer',
                        tempSelectedAddress?.id === address.id
                          ? 'border-emerald-500 bg-emerald-50/50'
                          : ''
                      )}
                      onClick={() => handleSelectAddress(address)}
                      btnDelete={false}
                    />
                  ))}
                </ManageModal>
              )}
            </div>

            {selectedAddress ? (
              <AddressesCard
                address={selectedAddress}
                classNameContent="flex gap-6 p-6 border rounded-md justify-center lg:justify-start  items-center lg:items-start flex-col sm:flex-row md:flex-col lg:flex-row"
                orderDetail={true}
              />
            ) : addresses.length > 0 ? (
              <AddressesCard
                address={addresses[0]}
                classNameContent="flex gap-6 p-6 border rounded-md justify-center lg:justify-start  items-center lg:items-start flex-col sm:flex-row md:flex-col lg:flex-row "
                orderDetail={true}
              />
            ) : (
              <ManageModal
                triggerContent={
                  <div className="flex cursor-pointer">
                    <div className="bg-gray-100 shadow-sm hover:bg-gray-200 transition-all border-2 border-gray-200 rounded-md flex flex-col gap-4 justify-center items-center p-8">
                      <div className="relative h-8 w-8">
                        <Image
                          src="/svg/location-add.svg"
                                 fill
    style={{ objectFit: "contain" }}
                          alt="location-add"
                          quality={100}
                        />
                      </div>
                      <h3>افزودن آدرس جدید</h3>
                    </div>
                  </div>
                }
                className="fixed inset-0 z-50"
              >
                <div>فرم ثبت آدرس جدید</div>
              </ManageModal>
            )}
          </div>
          {/* بارگذاری چک */}
          <h3 className="font-bold text-base text-gray-800">بارگذاری چک</h3>
          <div
            className="flex gap-6 sm:flex-row flex-col md:flex-col lg:flex-row"
            ref={(el) => {
              formRefs.current['افزودن چک'] = el;
            }}
          >
            <FileUpload
              key="افزودن چک"
              label="افزودن چک"
              defaultSrc="/images/check.jpg"
              classNameImage="w-44 h-40"
              classBoxText="w-3/5"
              accept="image/jpeg, image/png"
              classNameError="text-red-500 text-sm mt-2 text-center"
              required={true} // مطمئن شوید که required به درستی منتقل می‌شود
            />
            <div className="flex gap-2 items-center">
              <ManageModal
                triggerContent={
                  <div
                    className="relative w-6 h-6 cursor-pointer"
                    title="راهنمای ثبت چک"
                  >
                    <Image
                      src="/svg/info-circle.svg"
                              fill
    style={{ objectFit: "contain" }}
                      alt="Add file"
                      quality={100}
                      className="rounded-xl"
                    />
                  </div>
                }
                className="fixed inset-0 z-50"
              >
                <div className="relative w-96 h-60 ">
                  <Image
                    src="/images/check.jpg"
                               fill
    style={{ objectFit: "contain" }}
                    alt="Add file"
                    quality={100}
                    className="rounded-xl"
                  />
                </div>
                <div className="relative w-96 h-60">
                  <Image
                    src="/images/check.jpg"
                               fill
    style={{ objectFit: "contain" }}
                    alt="Add file"
                    quality={100}
                    className="rounded-xl"
                  />
                </div>
              </ManageModal>
              <h3 className="font-regular text-gray-600 text-sm text-justify">
                چک ضمانت،
                <strong>
                  طبق سقف درخواست (
                  {installmentDetail?.credit?.toLocaleString() ?? 0} تومان)
                </strong>
                به صورت فیزیکی پر شده <strong>(با تاریخ روز)</strong> و در اینجا
                بارگذاری شود. لازم به ذکر است که این چک باید در سامانه چک صیادی
                توسط خود شما ثبت شود. در وجه <strong>فردین قادری نیا</strong>{' '}
                <strong>به کدملی 3220045261</strong> و همراه قرارداد به آدرس
                شرکت ارسال شود.
              </h3>
            </div>
          </div>
          {/* دکمه‌های زیر فرم */}
          <div className="flex z-10 gap-4 justify-end w-full md:my-4  md:w-auto  fixed md:static left-0 right-0  bg-white bottom-20 px-5 py-2 md:py-0 md:px-0">
            <Button
              className="py-3 md:px-10 text-gray-500 flex flex-col gap-1 items-center hover:bg-gray-100 transition-all w-full md:w-auto rounded-md font-Medium text-base border-2"
              onClick={goToPreviousStep}
            >
              <h3 className="text-sm flex justify-center">مرحله قبلی</h3>
            </Button>
            <Button
              disabled={isPending || isUploading}
              className="group hover:bg-emerald-500 border flex flex-col gap-1 items-center hover:text-white border-emerald-500 py-3 transition duration-300 md:px-16 text-emerald-500 w-full md:w-auto rounded-md font-Medium text-base"
              type="submit"
            >
              <h3 className="text-sm flex justify-center">
                {isPending || isUploading
                  ? 'در حال ارسال...'
                  : 'تأیید و مرحله بعدی'}{' '}
              </h3>
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default Documents;
