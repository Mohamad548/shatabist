'use client';

import { useRef, useState } from 'react';
import Input from '@/components/base/input';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Button from '@/components/base/button';
import {
  NationalInquiryResponse,
  useNationalInquiry,
  useNationalVerification,
} from '@/components/app/profile-user/hooks';
import { toast } from 'react-hot-toast';
import ManageModal, { ManageModalRef } from '@/components/base/modal';
import { SmallLoading } from '@/components/base/loading/SmallLoading';
import { useUserStore } from '@/stores/useUserStore';

const RealContent = () => {
  const [nationalId, setNationalId] = useState('');
  const [birthDate, setBirthDate] = useState<any>(null);
  const [modalData, setModalData] = useState<NationalInquiryResponse>();
  const modalRef = useRef<ManageModalRef>(null); // ✅

  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
const { mutate, isPending } = useNationalInquiry({
  onSuccess: (data: NationalInquiryResponse) => {
    toast.success('استعلام با موفقیت انجام شد ✅');
    setModalData(data);
    modalRef.current?.openModal(); // ✅
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

const { mutate: verifyNational, isPending: isVerifying } = useNationalVerification({
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
  const handleSubmit = () => {
    if (!nationalId || !birthDate) return;

    const rawDate = birthDate.format('YYYY/MM/DD');

    const convertToEnglishDigits = (str: string): string => {
      const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
      return str.replace(/[۰-۹]/g, (w) => persianDigits.indexOf(w).toString());
    };

    const englishDate = convertToEnglishDigits(rawDate);
    const englishNationalId = convertToEnglishDigits(nationalId); // ✅ اضافه شد

    mutate({
      national_id: englishNationalId,
      birth_date: englishDate,
    });
  };
const handleConfirm = () => {
  if (modalData?.verification_token) {
    verifyNational({ verification_token: modalData.verification_token });
  } else {
    toast.error('توکن تایید وجود ندارد!');
  }
};
  return (
    <div className="bg-white p-2 rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="col-span-2 space-y-4 mt-4">
        <Input
          id="milCode"
          label="کدملی"
          classNameLabel="text-sm"
          type="text"
          parentClassName="flex flex-col-reverse gap-2"
          inputClassName="border rounded-md py-2.5 px-3.5"
          max={10}
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
        <div className="space-y-2">
          <span className="text-sm">تاریخ تولد</span>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            inputClass="py-2.5 px-3.5 rounded-md w-full border outline-none"
            containerStyle={{ width: '100%' }}
            value={birthDate}
            onChange={setBirthDate}
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="bg-emerald-500 w-full text-white mt-8 px-4 py-2 rounded-md"
      >
        {isPending ? <SmallLoading /> : 'ثبت'}
      </Button>

      <ManageModal
        ref={modalRef}
        actionLabel="تایید"
        modalBodyClass='bg-white pb-20'
        actionBtnClass="absolute left-5 bottom-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
        onConfirm={handleConfirm}
        className="fixed inset-0 z-50"
        triggerContent={null}
        activeOverlay={false}
      >
        {/* اطلاعات برای نمایش */}
        {modalData && (
          <div className="space-y-6 text-sm">
            <div className="flex items-center gap-3 mb-4 bg-blue-50 rounded-xl p-3 border border-blue-100 shadow-sm">
              <div className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 border-2 border-blue-300">
                <span className="text-blue-600 text-lg font-extrabold">✔</span>
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
            <Button
              onClick={() => {
                modalRef.current?.closeModal();
                toast('استعلام توسط شما رد شد ❗');
              }}
              className="absolute right-5 bg-gray-200 hover:bg-red-500 text-gray-700 hover:text-white font-medium py-2 px-6 rounded-lg border border-gray-300 transition"
            >
              رد کردن
            </Button>
          </div>
        )}
      </ManageModal>
    </div>
  );
};

export default RealContent;
