'use client';
import React from 'react';
import {
  useCreateComment,
  useCreateQuestion,
} from '@/components/app/product/hooks';
import Button from '@/components/base/button';
import FileUpload from '@/components/base/file-upload';
import Input from '@/components/base/input';
import ManageModal from '@/components/base/modal';
import { AddressType } from '@/constants/mock-data/profile';
import { useUserStore } from '@/stores/useUserStore';
import clsxm from '@/utils/clsxm';
import { useFormErrorHandler } from '@/utils/useFormErrorHandler';
import { deleteCookie } from 'cookies-next';
import { useCartStore } from '@/stores/useCartStore';
import moment from 'moment-jalaali';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import {
  useCreateTicket,
  useCreateUserAddress,
  useCreateUserPurchase,
  useDeleteAddress,
  useDeleteUserFavorite,
  useDeleteUserPurchase,
  useGetAddressById,
  useGetDepartment,
  useGetUser,
  useRemindOrder,
  useUpdateAddress,
} from '../../../hooks';
import ProvinceCityDropdowns from '../../content/section-addresses/components/province-city-dropdowns';
import { useRef } from 'react';
import {
  useNationalInquiry,
  useNationalVerification,
  NationalInquiryResponse,
} from '@/components/app/profile-user/hooks';
import { toast, Toaster } from 'react-hot-toast';
import { ManageModalRef } from '@/components/base/modal';
import { SmallLoading } from '@/components/base/loading/SmallLoading';

import dynamic from 'next/dynamic';
import { number } from 'framer-motion';

const OpenLayersMap = dynamic(() => import('@/components/base/map'), {
  ssr: false,
});

// مودال ثبت در خواست اعتبار در  بخش اقساط
export const AddRequestCredit = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useFormContext();

  const [modalData, setModalData] = useState<
    NationalInquiryResponse | undefined | null
  >();
  const modalRef = useRef<ManageModalRef>(null);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  // استعلام ملی
  const { mutate, isPending } = useNationalInquiry({
    onSuccess: (data: NationalInquiryResponse) => {
      toast.success('استعلام با موفقیت انجام شد ✅');
      setModalData(data);
      modalRef.current?.openModal();
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ?? error?.response?.data?.error;
      if (message === 'تاریخ تولد نامعتبر است' || message === 'موفق') {
        toast.error('تاریخ تولد نامعتبر است. لطفاً تاریخ صحیح را وارد کنید.');
      } else if (message === 'کد ملی نامعتبر است') {
        toast.error('کد ملی نامعتبر است. لطفاً کد صحیح را وارد کنید.');
      } else if (message === 'user already has profile') {
        toast.error('کاربر قبلاً پروفایل ثبت کرده است ⚠️');
      } else {
        toast.error('خطا در ثبت تایید. لطفاً دوباره تلاش کنید ❌');
      }
    },
  });

  // تایید ملی
  const { mutate: verifyNational, isPending: isVerifying } =
    useNationalVerification({
      onSuccess: (data) => {
        if (!modalData) {
          toast.error('داده‌ای برای ثبت وجود ندارد!');
          return;
        }

        setUser({
          ...user,
          first_name: modalData.first_name,
          last_name: modalData.last_name,
        });

        toast.success('اطلاعات تایید و ثبت شد 🎉');
        modalRef.current?.closeModal();
      },
      onError: () => {
        toast.error('خطا در ثبت تایید. لطفاً دوباره تلاش کنید ❌');
      },
    });
  // هندل ثبت اولیه
  const onSubmit = (data: any, p0: () => void) => {
    const birthDate = moment(data?.birthDate).format('jYYYY/jMM/jDD');
    mutate({
      national_id: data?.milCode,
      birth_date: birthDate,
    });
  };

  // تایید نهایی
  const handleConfirm = () => {
    if (modalData?.verification_token) {
      verifyNational({ verification_token: modalData.verification_token });
    } else {
      toast.error('توکن تایید وجود ندارد!');
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {modalData ? (
        <>
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base py-[10px] px-4 border rounded-md border-emerald-600"
            onClick={() => modalRef.current?.openModal()}
          >
            ثبت درخواست جدید
          </Button>
          <ManageModal
            onClose={() => setModalData(null)}
            fadeIn="animate-fadeIn"
            fadeOut="animate-slideDown"
            ref={modalRef}
            onConfirm={handleConfirm}
            className="fixed inset-0 z-50"
            activeOverlay={false}
            actionLabel="تایید"
            cancelLabel="رد کردن"
            cancelBtnClass="absolute right-5 bottom-5 bg-gray-200 hover:bg-red-500 text-gray-700 hover:text-white font-medium py-2 px-6 rounded-lg border border-gray-300 transition"
            actionBtnClass="absolute left-5 bottom-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
            modalBodyClass="bg-white pb-20"
          >
            <div className="space-y-6 text-sm">
              <div
                className="absolute left-5 top-2 cursor-pointer"
                onClick={() => {
                  modalRef.current?.closeModal();
                  setModalData(null);
                }}
              >
                <Image
                  src="/svg/profile/close-circle.svg"
                  alt="close-modal"
                  width={25}
                  height={25}
                />
              </div>
              <div className="flex items-center gap-3 mb-4 bg-blue-50 rounded-xl p-3 border border-blue-100 shadow-sm">
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300">
                  <span className="text-blue-600 text-lg font-extrabold">
                    ✔
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-blue-700">
                  صحت اطلاعات را تایید می‌کنید؟
                </h2>
              </div>
              <ul className="space-y-3 bg-white rounded-2xl p-5 border-l-4 border-blue-400 shadow-md">
                {[
                  { label: 'نام', value: modalData.first_name },
                  { label: 'نام خانوادگی', value: modalData.last_name },
                  { label: 'تاریخ تولد', value: modalData.birth_date },
                  { label: 'کد ملی', value: modalData.national_id },
                  { label: 'نام پدر', value: modalData.father_name },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-green-100 border border-green-300 text-green-600 font-bold">
                      ✓
                    </span>
                    <span className="text-gray-600">
                      {item.label}:{' '}
                      <span className="font-bold text-gray-800">
                        {item.value}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ManageModal>
        </>
      ) : (
        <>
          <Button
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base py-[10px] px-4 border rounded-md border-emerald-600"
            onClick={() => modalRef.current?.openModal()}
          >
            ثبت درخواست جدید
          </Button>
          <ManageModal
            ref={modalRef}
            fadeIn=" animate-slideUp"
            fadeOut="animate-slideDown"
            className="fixed inset-0 z-50"
            activeOverlay={false}
          >
            <form
              onSubmit={handleSubmit((data) => onSubmit(data, () => {}))}
              className="col-span-2 space-y-8"
            >
              <div className="flex justify-between items-center border-b pt-2">
                <h3 className="pb-3 font-Bold">احراز هویت</h3>
                <div
                  className="absolute left-5 top-7 cursor-pointer"
                  onClick={() => modalRef.current?.closeModal()}
                >
                  <Image
                    src="/svg/profile/close-circle.svg"
                    alt="close-modal"
                    width={25}
                    height={25}
                  />
                </div>
              </div>
              <div className="relative">
                <Input
                  id="milCode"
                  label="کدملی"
                  classNameLabel="text-sm"
                  type="text"
                  parentClassName="flex flex-col-reverse gap-2"
                  inputClassName="border rounded-md py-2.5 px-3.5"
                  max={10}
                  register={register('milCode', {
                    required: 'کد ملی الزامی است',
                    maxLength: {
                      value: 10,
                      message: 'حداکثر طول کد ملی 10 کاراکتر است',
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'کد ملی باید فقط شامل اعداد باشد',
                    },
                  })}
                />
                {errors.milCode?.message &&
                  typeof errors.milCode.message === 'string' && (
                    <span className=" absolute -bottom-5 text-red-500 text-sm">
                      {errors.milCode.message}
                    </span>
                  )}
              </div>
              <div className="space-y-6">
                <div className="relative">
                  <span className="text-sm">تاریخ تولد</span>
                  <Controller
                    name="birthDate"
                    control={control}
                    rules={{ required: 'تاریخ تولد الزامی است' }}
                    render={({ field }) => (
                      <DatePicker
                        value={field.value}
                        onChange={(date) => {
                          field.onChange(date?.toDate());
                        }}
                        calendar={persian}
                        locale={persian_fa}
                        inputClass="py-2.5 px-3.5 rounded-md w-full border outline-none"
                        maxDate={new DateObject().subtract(18, 'year')}
                        currentDate={new DateObject().subtract(18, 'year')}
                        containerStyle={{ width: '100%' }}
                      />
                    )}
                  />
                  {errors.birthDate?.message &&
                    typeof errors.birthDate.message === 'string' && (
                      <span className="absolute w-full -bottom-5 left-0 text-red-500 text-sm">
                        {errors.birthDate.message}
                      </span>
                    )}
                </div>
              </div>
              <Button
                type="submit"
                className="bg-emerald-500 w-full text-white mt-8 px-4 py-2 rounded-md"
                disabled={isPending}
              >
                {isPending ? <SmallLoading /> : 'ثبت'}
              </Button>
            </form>
          </ManageModal>
        </>
      )}
    </>
  );
};

// مودال لضافه کردن لیست من  بخش اقساط
export const AddMyList = ({
  variant = 'default',
}: {
  variant?: 'default' | 'large';
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useFormContext();
  const { mutate: createUserPurchase, isPending } = useCreateUserPurchase();

  const formFields = [
    {
      id: 'title',
      label: 'عنوان لیست',
      type: 'text',
      required: true,
      placeholder: 'مثلاً: خریدهای ماه آینده',
    },
  ];

  const onSubmit = (data: any, closeModal: () => void) => {
    createUserPurchase(data, {
      onSuccess: () => {
        reset();
        closeModal();
        toast.success('لیست با موفقیت ایجاد شد ✅');
      },
      onError: () => {
        toast.error('خطا در ایجاد لیست. لطفاً دوباره تلاش کنید ❌');
      },
    });
  };

  const { formRefs, onError } = useFormErrorHandler();

  // Button variants
  const triggerButton =
    variant === 'large' ? (
      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-Bold py-3 px-6 text-sm md:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 whitespace-nowrap">
        <span className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          ایجاد اولین لیست
        </span>
      </Button>
    ) : (
      <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-Bold py-2 md:py-2.5 px-3 md:px-4 text-xs md:text-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 whitespace-nowrap">
        <span className="flex items-center gap-1.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="hidden sm:inline">ایجاد لیست جدید</span>
          <span className="sm:hidden">لیست جدید</span>
        </span>
      </Button>
    );

  return (
    <ManageModal
      triggerContent={triggerButton}
      className="fixed inset-0 z-50"
      actionLabel={isPending ? 'در حال ثبت...' : 'ایجاد لیست'}
      actionBtnClass="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed w-full py-3 rounded-lg text-white font-Bold text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
      cancelLabel={
        <button
          type="button"
          className="absolute left-4 top-4 md:left-5 md:top-5 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
          aria-label="بستن"
        >
          <Image
            src="/svg/profile/close-circle.svg"
            alt="close-modal"
            width={28}
            height={28}
            className="group-hover:opacity-70 transition-opacity"
          />
        </button>
      }
      modalBodyClass="w-[90vw] max-w-md md:max-w-lg gap-0 p-0"
      actionBoxClass="px-5 md:px-6 pb-5 md:pb-6"
      cancelBoxClass="absolute"
      confirmLoading={isPending}
      onConfirm={(closeModal: () => void) =>
        handleSubmit((data) => onSubmit(data, closeModal), onError)()
      }
    >
      <div className="px-5 md:px-6 pt-5 md:pt-6 pb-4 md:pb-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 md:mb-7">
          <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-emerald-50 rounded-xl flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11L12 14L22 4"
                stroke="#08A70A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                stroke="#08A70A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-Bold text-gray-800">
              لیست خرید جدید
            </h3>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5 font-Medium">
              لیست خود را نام‌گذاری کنید
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4 md:space-y-5">
          {formFields.map(({ id, label, type, required, placeholder }) => (
            <div
              key={id}
              ref={(el) => {
                formRefs.current[label] = el;
              }}
            >
              <Input
                id={id}
                label={
                  <span className="text-sm md:text-base font-Bold text-gray-700 flex items-center gap-1 ">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                  </span>
                }
                classNameLabel="mb-2 block"
                type={type}
                placeholder={placeholder}
                parentClassName="flex flex-col-reverse"
                inputClassName={`
                  w-full border-2 rounded-lg py-3 px-4 
                  text-sm md:text-base font-Medium 
                  transition-all duration-300
                  ${
                    errors[id]
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                  }
                  placeholder:text-gray-400
                  disabled:bg-gray-50 disabled:cursor-not-allowed
                `}
                register={register(id, {
                  ...(required && { required: `${label} الزامی است` }),
                  minLength: {
                    value: 2,
                    message: 'عنوان لیست باید حداقل 2 کاراکتر باشد',
                  },
                  maxLength: {
                    value: 50,
                    message: 'عنوان لیست نباید بیشتر از 50 کاراکتر باشد',
                  },
                })}
                disabled={isPending}
              />
              {errors[id] && (
                <div className="flex items-center gap-1.5 mt-2 text-red-500 animate-slideUp">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-xs md:text-sm font-Medium">
                    {(errors[id] as { message?: string })?.message ||
                      'خطا در وارد کردن داده'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </form>

        {/* Helper Text */}
        <div className="mt-4 md:mt-5 p-3 md:p-4 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="flex gap-2 md:gap-3">
            <svg
              className="flex-shrink-0 mt-0.5"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 16H12V12H11M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#08A70A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-xs md:text-sm text-gray-700 font-Medium leading-relaxed">
              با ایجاد لیست‌های مختلف می‌توانید محصولات خود را دسته‌بندی کنید و
              مدیریت بهتری داشته باشید.
            </p>
          </div>
        </div>
      </div>

      <Toaster position="top-center" />
    </ManageModal>
  );
};

///  مودال دکمه حذف آدرس
export const DeleteBtnAddress = ({ addressID }: { addressID: number }) => {
  const { mutate: deleteAddress } = useDeleteAddress();
  return (
    <ManageModal
      triggerContent={
        <div className="flex gap-2  items-center cursor-pointer">
          <div className="relative h-5 w-5">
            <Image
              src="/svg/profile/trash.svg"
              fill
              style={{ objectFit: 'contain' }}
              alt="Delete Icon"
              quality={100}
            />
          </div>
          <h3 className="text-sm pl-2 bor ">حذف</h3>
        </div>
      }
      className="fixed inset-0 z-50"
      actionLabel={
        <Button className="bg-red-500  text-white rounded-md  py-2 px-20 hover:bg-red">
          تایید
        </Button>
      }
      actionBtnClass=""
      cancelLabel="انصراف"
      cancelBtnClass=" py-2 px-20  border-2 border-gray-400 rounded-md"
      modalBodyClass="grid-cols-2 grid-rows-3 p-4 gap-x-2"
      cancelBoxClass="col-start-1 row-start-3 col-span-1 "
      actionBoxClass="col-start-2 row-start-3 col-span-1 "
      onConfirm={(closeModal) => {
        deleteAddress(addressID);
        closeModal();
      }}
    >
      <div className="absolute top-6 w-full flex items-center justify-center">
        <h3 className="text-lg font-Bold ">حذف آدرس</h3>
      </div>
      <div className=" row-start-2 col-span-2 mx-auto max-w-96">
        <p className="">آیا می‌خواهید آدرس مورد نظر را حذف کنید؟</p>
      </div>
    </ManageModal>
  );
};

type FormField = {
  id: string;
  label: string;
  type: string;
  required?: boolean;
};

interface ActionAddressProps {
  editMode?: boolean;
  addressID?: string | number;
  className?: string;
}

export const ActionAddress = ({
  editMode = false,
  addressID,
  className,
}: ActionAddressProps) => {
  const [step, setStep] = useState(false);
  const { mutate: createUserAddress } = useCreateUserAddress();
  const { data: address } = useGetAddressById(Number(addressID));
  const { mutate: updateAddress } = useUpdateAddress();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext();
  const { data: userData } = useGetUser();
  const user = userData?.user;

  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (editMode && address?.userAddress) {
      setLat(address.userAddress.lat ?? null);
      setLng(address.userAddress.long ?? null);
      setIsChecked(address.userAddress.ownReceiver ?? false);
    }
  }, [editMode, address]);

  const onSubmit = (data: any, closeModal: () => void) => {
    if (lat === null || lng === null) {
      setShowError(true);
      return;
    }

    const enrichedData = {
      ...data,
      city_id: Number(data?.city_id),
      province_id: Number(data?.province_id),
      receiverFullName: isChecked
        ? `${user?.first_name} ${user?.last_name}`
        : data?.receiverFullName,
      receiverPhoneNumber: isChecked
        ? (user?.phone_number ?? '')
        : (data?.receiverPhoneNumber ?? ''),
      ownReceiver: isChecked,
      userId: user?.id ?? 1,
      lat,
      long: lng,
      ...(editMode && { id: addressID }),
    };

    if (editMode) {
      updateAddress(enrichedData);
    } else {
      createUserAddress(enrichedData);
    }

    setStep(false);
    closeModal();
  };

  const { formRefs, onError } = useFormErrorHandler();

  const formFields: FormField[] = [
    { id: 'title', label: 'نام آدرس', type: 'text', required: true },
    { id: 'hood', label: 'محله', type: 'text' },
    { id: 'postalCode', label: 'کد پستی', type: 'number', required: true },
    { id: 'pelak', label: 'پلاک ', type: 'number', required: true },
    { id: 'vahed', label: 'واحد ', type: 'text' },
    {
      id: 'receiverFullName',
      label: 'نام و نام خانوادگی گیرنده',
      type: 'text',
      required: true,
    },
    {
      id: 'receiverPhoneNumber',
      label: 'شماره تماس گیرنده',
      type: 'number',
      required: true,
    },
  ];

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (showError) setShowError(false);
  };

  return (
    <ManageModal
      triggerContent={
        !editMode ? (
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-Bold text-sm py-[10px] px-4 border rounded-md border-emerald-600 whitespace-nowrap transition-all duration-300">
            آدرس جدید و لوکیشن
          </Button>
        ) : (
          <div className="flex gap-2 items-center cursor-pointer hover:bg-emerald-100 rounded-md p-2">
            <div className="relative h-5 w-5">
              <Image
                src="/svg/profile/edit-2.svg"
                fill
                style={{ objectFit: 'contain' }}
                alt="Edit Icon"
                quality={100}
              />
            </div>
            <h3 className="text-sm">ویرایش</h3>
          </div>
        )
      }
      className="fixed inset-0 z-50"
      cancelLabel={
        <div className="absolute w-5 h-5 left-5">
          <Image
            src="/svg/profile/close-circle.svg"
            alt="close-modal"
            width={25}
            height={25}
          />
        </div>
      }
      setStep={setStep}
      cancelBtnClass=""
      modalBodyClass={clsxm(
        'w-full',
        className,
        step
          ? 'h-full overflow-y-auto p-4 sm:p-6 md:mb-0 rounded-none md:rounded-md'
          : 'grid-row-2 gap-2 px-4 md:w-1/2'
      )}
      actionBoxClass={clsxm(
        'pb-20 md:pb-0',
        step ? 'col-span-2 flex items-center justify-center' : ''
      )}
      cancelBoxClass="col-start-2 row-start-1 flex justify-end items-start"
      actionLabel={clsxm('', step ? 'ثبت اطلاعات' : '')}
      actionBtnClass="bg-emerald-500 hover:bg-emerald-600 w-11/12 md:mt-4 mt-2 py-2 rounded-md text-white hover:bg-emerald-600 transition-all duration-300"
      onConfirm={(closeModal: () => void) =>
        handleSubmit((data) => onSubmit(data, closeModal), onError)()
      }
      isNested={true}
    >
      {step ? (
        <form className="col-span-2 grid gap-2 max-h-[95%] overflow-y-scroll">
          <h3 className="text-base font-Bold">افزودن آدرس</h3>

          {/* ردیف اول */}
          <div className="row-start-2 flex flex-col md:flex-row gap-5 text-sm">
            {formFields.slice(0, 1).map(({ id, label, type, required }) => (
              <div
                key={id}
                className="flex-1 px-2"
                ref={(el) => {
                  formRefs.current[label] = el;
                }}
              >
                <Input
                  id={id}
                  label={
                    <>
                      {label}
                      {required && (
                        <strong className="text-red-500 mr-1">*</strong>
                      )}
                    </>
                  }
                  classNameLabel="text-sm font-medium"
                  type={type}
                  defaultValue={
                    editMode ? (address?.userAddress?.title ?? '') : ''
                  }
                  parentClassName="flex flex-col-reverse gap-2"
                  inputClassName="border border-gray-300 rounded-md py-1.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  register={register(id, {
                    ...(required && { required: `${label} الزامی است` }),
                  })}
                />
                {errors[id] && (
                  <p className="text-red-500 text-xs mt-1">
                    {(errors[id] as { message?: string })?.message ||
                      'خطا در وارد کردن داده'}
                  </p>
                )}
              </div>
            ))}
          </div>

          <ProvinceCityDropdowns address={address} editMode={editMode} />

          {/* کد پستی، پلاک و واحد */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 md:row-start-4 mt-2 text-sm">
            {formFields.slice(1, 5).map(({ id, label, type, required }) => {
              const fieldValue = editMode
                ? (address?.userAddress?.[id] ?? '')
                : '';
              return (
                <div
                  key={id}
                  className="w-full px-2"
                  ref={(el) => {
                    formRefs.current[label] = el;
                  }}
                >
                  <Input
                    id={id}
                    label={
                      <>
                        {label}
                        {required && (
                          <strong className="text-red-500 mr-1">*</strong>
                        )}
                      </>
                    }
                    classNameLabel="text-sm font-medium"
                    type={type}
                    defaultValue={
                      typeof fieldValue === 'number'
                        ? fieldValue.toString()
                        : fieldValue
                    }
                    parentClassName="flex flex-col-reverse gap-2"
                    inputClassName="border border-gray-300 rounded-md py-1.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    register={register(id, {
                      ...(required && { required: `${label} الزامی است` }),
                    })}
                  />
                  {errors[id] && (
                    <p className="text-red-500 text-xs mt-1">
                      {(errors[id] as { message?: string })?.message ||
                        'خطا در وارد کردن داده'}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* نشانی دقیق */}
          <div
            className="flex flex-col md:row-start-5 px-2"
            ref={(el) => {
              formRefs.current['textarea-id'] = el;
            }}
          >
            <label htmlFor="textarea-id" className="text-sm">
              نشانی پستی<strong className="text-red-500 mr-1">*</strong>
            </label>
            <textarea
              key={editMode ? address?.userAddress?.details : 'new'}
              id="textarea-id"
              {...register('details', { required: 'نشانی پستی ضروری است' })}
              className="mt-2 border text-sm border-gray-200 outline-none focus:border-gray-300 rounded-md py-1.5 px-3.5 w-full h-16 resize-none overflow-auto"
              placeholder="آدرس دقیق..."
              defaultValue={
                editMode ? (address?.userAddress?.details ?? '') : ''
              }
            />
            {errors.details && (
              <span className="text-red-500 text-xs mt-1">
                {errors.details.message?.toString() || 'خطا در وارد کردن داده'}
              </span>
            )}
          </div>

          {/* گیرنده */}
          <div
            className="flex items-center gap-2 md:row-start-6 px-2"
            ref={(el) => {
              formRefs.current['agreement'] = el;
            }}
          >
            <Input
              type="checkbox"
              id="agreement"
              inputClassName="w-5 h-5 accent-emerald-500 rounded-lg"
              onChange={handleCheckboxChange}
              checked={isChecked}
            />
            <label
              className={clsxm(
                'text-sm',
                showError ? 'text-red-500' : 'text-gray-700'
              )}
              htmlFor="agreement"
            >
              گیرنده سفارش خودم هستم.
            </label>
          </div>

          {!isChecked && (
            <div className="flex md:row-start-7 gap-5 flex-col md:flex-row px-2">
              {formFields.slice(5).map(({ id, label, type, required }) => {
                const fieldValue = editMode
                  ? (address?.userAddress?.[id] ?? '')
                  : '';
                return (
                  <div
                    key={id}
                    className="flex-1"
                    ref={(el) => {
                      formRefs.current[label] = el;
                    }}
                  >
                    <Input
                      id={id}
                      label={
                        <>
                          {label}
                          {required && (
                            <strong className="text-red-500 mr-1">*</strong>
                          )}
                        </>
                      }
                      classNameLabel="text-sm font-medium"
                      type={type}
                      defaultValue={
                        typeof fieldValue === 'number'
                          ? fieldValue.toString()
                          : fieldValue
                      }
                      parentClassName="flex flex-col-reverse gap-2"
                      inputClassName="border border-gray-300 rounded-md py-1.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      register={register(id, {
                        ...(required && { required: `${label} الزامی است` }),
                      })}
                    />
                    {errors[id] && (
                      <p className="text-red-500 text-xs mt-1">
                        {(errors[id] as { message?: string })?.message ||
                          'خطا در وارد کردن داده'}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </form>
      ) : (
        <>
          <div className="flex mx-4 items-center pr-4">
            <h3 className="text-sm md:text-xl font-Bold">افزودن آدرس</h3>
          </div>

          <div className="col-span-2 space-y-4 justify-items-center">
            <h3 className="text-sm">موقعیت مکانی آدرس را مشخص کنید</h3>
          </div>

          <OpenLayersMap
            className="w-full max-h-72 h-screen"
            popupText={address?.title}
            initialLat={lat ?? 35.7025}
            initialLng={lng ?? 51.376804}
            onChange={(newLat, newLng) => {
              setLat(newLat);
              setLng(newLng);
              if (showError) setShowError(false);
            }}
          />

          <div className="flex flex-col w-full place-items-center col-span-2 justify-between">
            <p className="text-sm">
              مرسوله‌های شما به این موقعیت ارسال خواهد شد.
            </p>
            <div className="text-red-500 text-sm z-10">
              {lat === null || lng === null
                ? 'موقعیت مکانی آدرس را مشخص کنید'
                : ''}
            </div>
            <Button
              onClick={() =>
                lat !== null && lng !== null
                  ? setStep(true)
                  : setShowError(true)
              }
              className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 mt-4 px-16 text-sm w-full rounded-md transition-all duration-300"
            >
              تایید و ادامه
            </Button>
          </div>
        </>
      )}
    </ManageModal>
  );
};

//   مودال مطالعه اعلان ها و پشتیبانی
export const MessagesModal = () => {
  return (
    <ManageModal
      triggerContent={
        <div className="flex gap-2">
          <button className="text-emerald-500 font-Bold">مطالعه</button>
          <Image
            src="/svg/arrow-left-green.svg"
            alt="arrow"
            width={20}
            height={20}
          />
        </div>
      }
      className="fixed inset-0 z-50"
      cancelLabel={
        <div className="">
          <Image
            src="/svg/profile/close-circle.svg"
            alt="close-modal"
            width={25}
            height={25}
          />
        </div>
      }
      cancelBtnClass=""
      modalBodyClass="grid-cols-2 max-w-96 gap-4"
      cancelBoxClass="col-start-2 row-start-1 flex justify-end items-start"
    >
      <div className="flex items-center">
        <h3 className="text-lg font-Bold ">جزییات پیام</h3>
      </div>
      <div className=" col-span-2 space-y-2 mx-2">
        <h3 className="font-Bold">عنوان پیام</h3>
        <p className="leading-8 ">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد
        </p>
      </div>
    </ManageModal>
  );
};

// فرم مودال ثبت تیکت جدید

export const AddTicketModal = () => {
  const { data } = useGetDepartment();
  const { departments } = data || {};

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext();

  const { mutate: addedTicket, isPending } = useCreateTicket();

  const onSubmit = (data: any, closeModal: () => void) => {
    const formData = new FormData();
    formData.append('title', data['عنوان']);
    formData.append('content', data['توضیحات']);
    formData.append(
      'departmentId',
      data['بخش'] ? String(Number(data['بخش'])) : ''
    );

    const attachment = data['افزودن پیوست'];
    if (attachment?.file instanceof File) {
      formData.append('images', attachment.file);
    }

    // ارسال داده‌ها به API با استفاده از هوک
    addedTicket(formData, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return (
    <ManageModal
      triggerContent={
        <Button className="border py-2 px-3 border-emerald-500 rounded-md  bg-emerald-500 text-white font-Bold hover:bg-emerald-600 transition-all duration-300">
          ثبت تیکت پشتیبانی
        </Button>
      }
      className="fixed inset-0 z-50"
      cancelLabel={
        <button className="absolute left-10 top-10 text-gray-400 hover:text-gray-600 transition-colors">
          <Image
            src="/svg/profile/close-circle.svg"
            alt="close"
            width={24}
            height={24}
          />
        </button>
      }
      onConfirm={(closeModal) =>
        handleSubmit((data) => onSubmit(data, closeModal))()
      }
      cancelBtnClass=""
      cancelBoxClass="flex justify-end items-start bg-red-500"
      modalBodyClass="w-full md:w-3/5 mx-4 overflow-y-auto max-h-[88vh] md:max-h-[90vh]"
      actionBoxClass="col-span-2 flex items-center justify-center"
      actionLabel="ثبت تیکت"
      actionBtnClass={clsxm(
        'flex-1 bg-emerald-600 text-white font-Bold py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
        isPending ? 'opacity-50 cursor-not-allowed' : ''
      )}
    >
      <div className="bg-white rounded-2xl col-span-2">
        {/* Header Section */}
        <div className="bg-emerald-500 px-8 py-10 rounded-t-xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-Bold text-white">تیکت پشتیبانی</h2>
              <p className="text-white text-sm mt-1">
                مشکل خود را با ما در میان بگذارید
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <form className=" py-8 space-y-8">
          {/* Title and Department Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
                عنوان تیکت
              </label>
              <Input
                type="text"
                parentClassName="flex flex-col gap-2"
                inputClassName="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="مثال: مشکل در پرداخت"
                register={register('عنوان', {
                  required: 'عنوان ضروری است',
                })}
              />
              {errors['عنوان']?.message && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {String(errors['عنوان']?.message)}
                </p>
              )}
            </div>

            {/* Department Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                بخش مورد نظر
              </label>
              <select
                {...register('بخش', { required: 'انتخاب بخش ضروری است' })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'left 0.75rem center',
                  backgroundSize: '1.25rem',
                  paddingLeft: '2.5rem',
                }}
              >
                <option value="">انتخاب کنید...</option>
                {departments?.map((department: any) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
              {errors['بخش']?.message && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {String(errors['بخش']?.message)}
                </p>
              )}
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="w-4 h-4 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
              توضیحات تکمیلی
            </label>
            <textarea
              {...register('توضیحات', {
                required: 'توضیحات ضروری است',
              })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              rows={6}
              placeholder="لطفا مشکل خود را به طور کامل شرح دهید..."
            />
            {errors['توضیحات']?.message && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {String(errors['توضیحات']?.message)}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <svg
                className="w-4 h-4 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              افزودن پیوست (اختیاری)
            </label>
            <FileUpload
              label="افزودن پیوست"
              classNameBody="w-full p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-emerald-300 transition-colors bg-gray-50/50"
              classNameTemplate="flex-col"
              classNameImage="w-24 h-24"
              accept="image/jpeg, image/png"
              classNameError="text-red-500 text-xs mt-2"
              required={false}
              classBoxText="text-xs text-gray-500"
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
            <svg
              className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-blue-800">
              تیم پشتیبانی ما در اسرع وقت به درخواست شما پاسخ خواهند داد. معمولا
              زمان پاسخگویی کمتر از ۲۴ ساعت است.
            </p>
          </div>
        </form>
      </div>
    </ManageModal>
  );
};

// مودال ثبت دیدگاه
export const AddFeedbackModal = ({
  className,
  id,
}: {
  className?: string;
  id?: number;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const { mutate: createComment, isPending } = useCreateComment();
  const [rate, setRate] = useState<number>(1);
  const [fileInputs, setFileInputs] = useState([0]);

  const onSubmit = (formData: any, closeModal: () => void) => {
    const files: File[] = [];

    fileInputs.forEach((_, index) => {
      const fileObj = formData[`افزودن پیوست_${index}`];
      if (fileObj?.file instanceof File) files.push(fileObj.file);
    });

    createComment(
      {
        title: formData['عنوان'],
        content: formData['توضیحات'],
        rate,
        productId: Number(id),
        images: files,
      },
      {
        onSuccess: () => {
          closeModal();
          setFileInputs([0]);
        },
      }
    );
  };

  const handleAutoAdd = () => setFileInputs((prev) => [...prev, prev.length]);
  const handleRemove = (i: number) =>
    setFileInputs((prev) => prev.filter((_, index) => index !== i));

  return (
    <ManageModal
      triggerContent={
        <Button className="border bg-emerald-600 py-1.5 px-3 border-emerald-600 rounded-md text-white text-xs md:text-sm whitespace-nowrap">
          ثبت دیدگاه
        </Button>
      }
      className="fixed inset-0 z-50"
      cancelLabel={
        <button className="absolute left-10 top-10 text-gray-400 hover:text-gray-600 transition-colors">
          <Image
            src="/svg/profile/close-circle.svg"
            alt="close"
            width={24}
            height={24}
          />
        </button>
      }
      confirmLoading={isPending}
      onConfirm={(closeModal) =>
        handleSubmit((data) => onSubmit(data, closeModal))()
      }
      modalBodyClass="w-full md:w-3/5 mx-4 overflow-y-auto max-h-[88vh] md:max-h-[90vh]"
      actionBoxClass="col-span-2 flex items-center justify-center"
      actionLabel="ثبت دیدگاه"
      actionBtnClass={clsxm(
        'flex-1 bg-emerald-600 text-white font-Bold py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
        isPending && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className="bg-white rounded-2xl col-span-2">
        {/* Header */}
        <div className="bg-emerald-500 px-8 py-10 rounded-t-xl">
          <div className="flex items-center gap-4 mb-3">
            {/* <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.98a1 1 0 00.95.69h4.184c.969 0 1.371 1.24.588 1.81l-3.39 2.463a1 1 0 00-.364 1.118l1.287 3.981c.3.921-.755 1.688-1.538 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.783.57-1.838-.197-1.538-1.118l1.287-3.981a1 1 0 00-.364-1.118L2.04 9.407c-.783-.57-.38-1.81.588-1.81h4.184a1 1 0 00.95-.69l1.287-3.98z"
                />
              </svg>
            </div> */}
            <div>
              <h2 className="text-2xl font-Bold text-white">ثبت دیدگاه</h2>
              <p className="text-white text-sm mt-1">
                نظر و امتیاز خود را درباره‌ی این محصول ثبت کنید
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="px-8 py-8 space-y-8">
          {/* Rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              امتیاز شما به محصول
            </label>
            <div className="flex flex-row-reverse gap-4 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRate(star)}
                  className="w-6 h-6 relative"
                >
                  <Image
                    src={star <= rate ? '/svg/str.svg' : '/svg/str1.svg'}
                    alt={`star-${star}`}
                    fill
                    sizes="24px"
                    style={{ objectFit: 'contain' }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              عنوان دیدگاه
            </label>
            <Input
              type="text"
              placeholder="مثلاً کیفیت محصول عالی بود"
              register={register('عنوان', { required: 'عنوان ضروری است' })}
              inputClassName="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            {errors['عنوان']?.message && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors['عنوان']?.message)}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              متن دیدگاه
            </label>
            <textarea
              {...register('توضیحات', { required: 'توضیحات ضروری است' })}
              rows={6}
              placeholder="تجربه‌ی خود را با ما در میان بگذارید..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
            />
            {errors['توضیحات']?.message && (
              <p className="text-red-500 text-xs mt-1">
                {String(errors['توضیحات']?.message)}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              افزودن تصویر (اختیاری)
            </label>
            <div className="flex flex-wrap gap-3">
              {fileInputs.map((id, index) => (
                <FileUpload
                  key={id}
                  label={`افزودن پیوست_${index + 1}`}
                  classNameBody="w-full p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-emerald-300 transition-colors bg-gray-50/50"
                  classNameTemplate="flex-col"
                  classNameImage="w-24 h-24"
                  accept="image/jpeg, image/png"
                  classNameError="text-red-500 text-xs mt-1"
                  autoAddOnUpload={index === fileInputs.length - 1}
                  onAutoAdd={handleAutoAdd}
                  onRemove={() => handleRemove(index)}
                />
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
            <svg
              className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-blue-800">
              نظرات شما به ما کمک می‌کند کیفیت محصولات را بهبود دهیم. از وقتی که
              می‌گذارید سپاسگزاریم.
            </p>
          </div>
        </form>
      </div>
    </ManageModal>
  );
};
// مودال ثبت پرسش
export const AddQuestionModal = ({
  className,
  id,
}: {
  className?: string;
  id?: number;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext();

  const { mutate: createQuestion, isPending } = useCreateQuestion();
  const onSubmit = (data: any) => {
    if (!id) return;

    createQuestion({
      title: 'سوال جدید', // می‌تونی این رو از کاربر هم بگیری اگر خواستی
      content: data['توضیحات'],
      productId: id,
    });
  };

  return (
    <ManageModal
      triggerContent={
        <Button className={clsxm('', className)}> ثبت پرسش</Button>
      }
      className="fixed inset-0 z-50"
      cancelLabel={
        <div className="max-h absolute left-5">
          <Image
            src="/svg/profile/close-circle.svg"
            alt="close-modal"
            width={25}
            height={25}
          />
        </div>
      }
      confirmLoading={isPending}
      onConfirm={(closeModal) =>
        handleSubmit((data) => {
          onSubmit(data);
          closeModal();
        })()
      }
      cancelBtnClass=""
      modalBodyClass="w-1/3 overflow-y-auto max-h-[88vh] md:max-h-[90vh]"
      actionBoxClass="col-span-2 flex items-center justify-center"
      cancelBoxClass="col-start-2 row-start-1 flex justify-end items-start"
      actionLabel="ثبت"
      actionBtnClass="bg-emerald-500/90 w-full md:m-4 mt-2 py-2 rounded-md text-white hover:bg-emerald-500"
    >
      <form className="col-span-2 w-full">
        <div className="col-span-2 space-y-6 mt-4">
          {/* توضیحات */}
          <div className="py-5">
            <label htmlFor="textarea-id" className="text-sm">
              متن مورد نظر شما
            </label>
            <textarea
              id="textarea-id"
              {...register('توضیحات', {
                required: 'توضیحات ضروری است',
              })}
              className="mt-2 border border-gray-200 outline-none focus:border-gray-300 rounded-md py-2.5 px-3.5 w-full h-48 resize-none overflow-auto"
              placeholder="متن خود را وارد کنید..."
            />
            {errors['توضیحات']?.message && (
              <span className="text-red-500 text-sm">
                {String(errors['توضیحات']?.message)}
              </span>
            )}
          </div>
        </div>
      </form>
    </ManageModal>
  );
};

// مودال ثبت اعلان ناموجودی
export const NotifyModal = ({
  productId,
  className,
  id,
}: {
  productId?: number;
  className?: string;
  id?: number;
}) => {
  // const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isSmsChecked, setIsSmsChecked] = useState(false);
  // const [isInAppChecked, setIsInAppChecked] = useState(false);
  const [isSmsAlreadyRegistered, setIsSmsAlreadyRegistered] = useState(false);
  const { user } = useUserStore();
  const { mutate: remindOrder, isPending } = useRemindOrder();

  const resetCheckboxes = () => {
    // setIsEmailChecked(false);
    setIsSmsChecked(false);
    // setIsInAppChecked(false);
  };

  const handleSubmit = (closeModal: () => void) => {
    // Check if at least one checkbox is selected
    if (!isSmsChecked) {
      toast.error('لطفاً پیامک رو انتخاب کنید');
      return;
    }

    // Only SMS is implemented for now
    if (isSmsChecked && productId) {
      remindOrder(
        { variantId: productId, method: 'sms' },
        {
          onSuccess: () => {
            toast.success('درخواست اطلاع‌رسانی از طریق پیامک ثبت شد');
            resetCheckboxes();
            closeModal();
          },
          onError: (error: any) => {
            // Handle specific error for already registered
            if (
              error?.response?.data?.message ===
              'already registered for reminder'
            ) {
              setIsSmsAlreadyRegistered(true);
              setIsSmsChecked(false);
              toast.error(
                'شما قبلاً برای این محصول درخواست اطلاع‌رسانی ثبت کرده‌اید'
              );
              closeModal();
            } else {
              // Handle general errors
              toast.error(
                error?.response?.data?.message ||
                  'خطا در ثبت درخواست. لطفاً دوباره تلاش کنید'
              );
            }
          },
        }
      );
    } else {
      // Reset and close if no valid action
      resetCheckboxes();
      closeModal();
    }
  };

  return (
    <ManageModal
      triggerContent={
        <button className="group relative px-4 py-2 text-xs md:text-sm font-bold rounded-2xl transition-all duration-300 bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-xl active:scale-95 flex items-center justify-center whitespace-nowrap">
          {/* <div className="relative h-5 w-5">
            <Image
              src="/svg/notification-bingActive.svg"
              alt="notification-bingActive"
              width={25}
              height={25}
            />
          </div> */}
          موجود شد اطلاع بده
        </button>
      }
      className="fixed inset-0 z-50"
      cancelLabel={
        <button className="absolute left-4 top-4 md:left-6 md:top-6 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group">
          <svg
            className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      }
      onConfirm={handleSubmit}
      cancelBtnClass=""
      modalBodyClass="w-full max-w-lg overflow-y-auto max-h-[90vh] mx-4 flex flex-col gap-3"
      actionBoxClass="col-span-1 flex items-center justify-center "
      cancelBoxClass="col-start-2 row-start-1 flex justify-end items-start"
      actionLabel={
        isSmsAlreadyRegistered
          ? undefined
          : isPending
            ? 'در حال ارسال...'
            : 'ثبت درخواست'
      }
      actionBtnClass="bg-emerald-500 w-full py-3.5 rounded-xl text-white font-Bold hover:bg-emerald-600 text-xs md:text-sm bg-blue-500"
      triggerClass=""
    >
      <div className=" flex flex-col gap-6 items-center">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center shadow-sm">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-sm  md:text-xl font-extrabold text-gray-900 mb-2">
              اطلاع‌رسانی موجودی
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              چطور به شما خبر بدیم؟
            </p>
          </div>
        </div>

        {/* Notification Options */}
        <div className="flex flex-col gap-3 w-full">
          {/* Email Option */}
          {/* <label className="relative flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-gray-100 cursor-pointer hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-200 group">
            <input
              type="checkbox"
              checked={isEmailChecked}
              onChange={(e) => setIsEmailChecked(e.target.checked)}
              className="w-5 h-5 text-primary-500 cursor-pointer "
            />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 text-sm mb-0.5">
                ایمیل
              </div>
              <div className="text-xs text-gray-500 truncate">
                is.sharifi@hotmail.com
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-primary-100 flex items-center justify-center transition-colors duration-200">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </label> */}

          {/* SMS Option */}
          {isSmsAlreadyRegistered ? (
            <div className="relative flex items-center gap-4 p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-green-900 text-sm mb-0.5">
                  پیامک
                </div>
                <div className="text-xs text-green-700">
                  شما قبلاً درخواست اطلاع‌رسانی ثبت کرده‌اید
                </div>
              </div>
            </div>
          ) : (
            <label className="relative flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-gray-100 cursor-pointer hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200 group">
              <input
                type="checkbox"
                checked={isSmsChecked}
                onChange={(e) => setIsSmsChecked(e.target.checked)}
                className="w-5 h-5 text-emerald-500 cursor-pointer "
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm mb-0.5">
                  پیامک
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {user?.phone_number}
                </div>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors duration-200">
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </label>
          )}

          {/* In-App Message Option */}
          {/* <label className="relative flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-gray-100 cursor-pointer hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-200 group">
            <input
              type="checkbox"
              checked={isInAppChecked}
              onChange={(e) => setIsInAppChecked(e.target.checked)}
              className="w-5 h-5 text-primary-500 cursor-pointer "
            />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 text-sm mb-0.5">
                پیام در اپ
              </div>
              <div className="text-xs text-gray-500 truncate">
                دریافت پیام در شتا20
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-primary-100 flex items-center justify-center transition-colors duration-200">
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
            </div>
          </label> */}
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-4 border border-emerald-200 w-full">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 text-emerald-600 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-[10px] md:text-xs text-emerald-900 leading-relaxed font-medium">
              به‌محض موجود شدن کالا، از طریق روش‌های انتخابی شما مطلع می‌شوید
            </p>
          </div>
        </div>
      </div>
    </ManageModal>
  );
};

//مودال خروج از پروفایل
export const LogoutModal = () => {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie('token');
    deleteCookie('refresh_token');

    // حذف اطلاعات یوزر از Zustand
    useUserStore.getState().logout();
    // حذف اطلاعات یوزر از Zustand
    useUserStore.getState().logout();

    // حذف localStorage مربوط به persist
    localStorage.removeItem('user-info');

    // پاک کردن cartId از استور persisted
    try {
      useCartStore.getState().clearCartId();
    } catch (e) {
      /* empty */
    }

    // ریدایرکت به صفحه اصلی یا لاگین
    router.push('/');
  };

  return (
    <ManageModal
      triggerContent={
        <div className="flex gap-2 pr-1 cursor-pointer">
          <div className="relative w-6 h-6">
            <Image
              src="/svg/login.svg"
              fill
              style={{ objectFit: 'contain' }}
              alt=""
              quality={100}
            />
          </div>
          <Button className="text-sm text-right"> خروج</Button>
        </div>
      }
      className="fixed inset-0 z-50 "
      actionLabel={
        <Button
          onClick={handleLogout}
          className="bg-red-500 border-2 border-gray-100 rounded-md text-white py-2 px-16 text-sm"
        >
          خروج
        </Button>
      }
      actionBtnClass=""
      cancelLabel="انصراف"
      cancelBtnClass="border-2 border-gray-400 rounded-md text-gray-800 py-2 px-16 text-sm"
      modalBodyClass="grid-cols-2 grid-rows-3 p-4 min-w-[375px] mx-4"
      cancelBoxClass="col-start-1 row-start-3 col-span-1 mt-4 w-fit grid justify-items-center py-2"
      actionBoxClass="col-start-2 row-start-3 col-span-1 mt-4 grid justify-items-center"
      onConfirm={(closeModal) => {
        handleLogout();
        closeModal();
      }}
    >
      <div className="absolute top-6 w-full flex items-center justify-center">
        <h3 className="text-sm md:text-lg font-Bold ">
          آیا می‌خواهید از حساب کاربری خود خارج شوید؟
        </h3>
      </div>
      <div className=" row-start-2 col-span-2 mx-auto max-w-96">
        <p className="leading-8 text-center text-xs md:text-sm">
          با خروج از حساب دیگر امکان دسترسی به سفارش ها و سایر بخش های کاربری
          خود را تا ورود مجدد نخواهید داشت.
        </p>
      </div>
    </ManageModal>
  );
};

///مودال حذف لیست های خرید
interface ListProps {
  id: string;
  title: string;
}

export const DeleteListModal = ({ list }: { list: ListProps }) => {
  const { mutate: deletePurchase } = useDeleteUserPurchase();

  return (
    <ManageModal
      triggerContent={
        <div className="flex gap-2 py-2 px-3 text-xs md:text-sm rounded-md border border-gray-300 text-gray-500  whitespace-nowrap hover:bg-gray-50 transition-all duration-200 cursor-pointer">
          <div className="relative w-4 h-4 md:w-5 md:h-5">
            <Image
              src="/svg/profile/trash.svg"
              fill
              style={{ objectFit: 'contain' }}
              alt="Trash Icon"
              quality={100}
            />
          </div>
          <Button className="text-xs md:text-sm text-right"> حذف</Button>
        </div>
      }
      className="fixed inset-0 z-50"
      actionLabel={
        <Button className="bg-red-500 border-2 border-gray-100 rounded-md text-white py-2 px-16 text-sm">
          حذف
        </Button>
      }
      cancelLabel="انصراف"
      cancelBtnClass="border-2 border-gray-400 rounded-md text-gray-800 py-2 px-16 text-sm"
      modalBodyClass="grid-cols-2 grid-rows-3 p-4 min-w-[375px] mx-4"
      cancelBoxClass="col-start-1 row-start-3 col-span-1 w-fit grid justify-items-center py-2"
      actionBoxClass="col-start-2 row-start-3 col-span-1 grid justify-items-center"
      onConfirm={(closeModal) => {
        deletePurchase(Number(list.id));
        closeModal();
      }}
    >
      <div className="absolute top-6 w-full flex items-center justify-center ">
        <h3 className="text-lg font-bold">
          {`آیا می‌خواهید لیست ${list.title} را حذف کنید؟`}
        </h3>
      </div>
      <div className="row-start-2 col-span-2 mx-auto max-w-96">
        <p className="leading-8 text-center text-xs md:text-sm">
          با حذف این لیست، تمام محصولات داخل آن نیز حذف خواهند شد.
        </p>
      </div>
    </ManageModal>
  );
};

/// مودال حذف لیست های خرید از بخش علاقه مندی ها
interface FavoriteListProps {
  name: string | undefined;
  id: string | undefined;
}

export const DeleteListFavorites = ({ name, id }: FavoriteListProps) => {
  const { mutate: deleteFavorite } = useDeleteUserFavorite();

  return (
    <div className="group border cursor-pointer border-gray-300 rounded-md flex justify-center items-center hover:bg-red-500 ">
      <ManageModal
        triggerContent={
          <div className="flex gap-2 px-2 group-hover:text-white">
            <div className="relative w-4 h-4">
              <Image
                src="/svg/profile/trash.svg"
                fill
                style={{ objectFit: 'contain' }}
                alt="Trash Icon"
                quality={100}
              />
            </div>
            <Button className="text-sm text-right "> حذف</Button>
          </div>
        }
        className="fixed inset-0 z-50"
        actionLabel={
          <Button className="bg-red-500 border-2 border-gray-100 rounded-md text-white py-2 px-16 text-sm">
            حذف
          </Button>
        }
        cancelLabel="انصراف"
        cancelBtnClass="border-2 border-gray-400 rounded-md text-gray-800 py-2 px-16 text-sm"
        modalBodyClass="grid-cols-2 grid-rows-3 min-w-[375px] mx-4 "
        cancelBoxClass="col-start-1 row-start-3 col-span-1 w-fit grid justify-items-center py-2"
        actionBoxClass="col-start-2 row-start-3 col-span-1 grid justify-items-center"
        onConfirm={(closeModal) => {
          if (id) {
            deleteFavorite(Number(id));
          }
          closeModal();
        }}
      >
        <div className="absolute top-6 w-full flex items-center justify-center p-4">
          <h3 className="text-xs font-bold">
            {`آیا می‌خواهید لیست ${name} را حذف کنید؟`}
          </h3>
        </div>
        {/* <div className="row-start-2 col-span-2 mx-auto max-w-96">
          <p className="leading-8 text-center text-xs md:text-sm">
            با حذف این لیست، تمام محصولات داخل آن نیز حذف خواهند شد.
          </p>
        </div> */}
      </ManageModal>
    </div>
  );
};

export const DescriptionModal = () => {
  return (
    <ManageModal
      triggerContent={
        <div className="group relative h-6 w-6 hover:scale-110 transition-transform duration-200">
          <Image
            src="/svg/info-circle-green.svg"
                      fill
    style={{ objectFit: "contain" }}
            alt="اطلاعات بیشتر"
            quality={100}
            className="group-hover:opacity-80"
          />
        </div>
      }
      className="fixed inset-0 z-50"
      cancelLabel={
        <div className="absolute left-5 top-5 cursor-pointer hover:scale-110 transition-transform duration-200">
          <Image
            src="/svg/profile/close-circle.svg"
            alt="بستن مودال"
            width={28}
            height={28}
          />
        </div>
      }
      cancelBtnClass=""
      modalBodyClass="max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 mx-4"
      cancelBoxClass=""
      actionBoxClass=""
      fadeIn="animate-fadeIn"
      fadeOut="animate-slideDown"
      activeOverlay={true}
      moodCheckout={true}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <div className="relative w-5 h-5">
              <Image
                src="/svg/info-circle-green.svg"
                fill
                className="object-contain"
                alt="info"
              />
            </div>
          </div>
          <h3 className="text-xl font-Bold text-gray-800">راهنمای خرید</h3>
        </div>

        {/* Content Sections */}
        <div className="space-y-5">
          {/* Shipping Info */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🚚</span>
              </div>
              <h4 className="font-Bold text-blue-700">اطلاعات ارسال</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 mr-6">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومانء
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                تحویل در کمتر از ۲۴ ساعت در تهران و کرج
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                امکان تحویل در محل (COD) موجود است
              </li>
            </ul>
          </div>

          {/* Return Policy */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">↩</span>
              </div>
              <h4 className="font-Bold text-green-700">ضمانت و مرجوعی</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 mr-6">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>۷ روز
                ضمانت بازگشت کالا
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                ضمانت اصالت و سلامت فیزیکی کالا
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                بازپرداخت وجه در صورت عدم رضایت
              </li>
            </ul>
          </div>

          {/* Payment Security */}
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6  rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">🔒</span>
              </div>
              <h4 className="font-Bold text-orange-700">امنیت پرداخت</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 mr-6">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                درگاه پرداخت معتبر و ایمن
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                پشتیبانی از تمام کارت‌های بانکی
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                امکان پرداخت اقساطی
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6  rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">📞</span>
              </div>
              <h4 className="font-Bold text-purple-700">پشتیبانی ۲۴ ساعته</h4>
            </div>
            <div className="space-y-3 mr-6">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>پیام رسان: @shata_support</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>ایمیل: support@shata.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <h4 className="font-Bold text-gray-700 mb-3 text-center">
            نشان‌های اعتماد
          </h4>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-xs text-gray-600">
                نماد اعتماد الکترونیک
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🛡</span>
              </div>
              <span className="text-xs text-gray-600">SSL محافظت شده</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">⭐</span>
              </div>
              <span className="text-xs text-gray-600">رضایت ۹۸٪ مشتریان</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="flex justify-center pt-4">
          <Button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors duration-200">
            ادامه خرید با اطمینان
          </Button>
        </div> */}
      </div>
    </ManageModal>
  );
};
