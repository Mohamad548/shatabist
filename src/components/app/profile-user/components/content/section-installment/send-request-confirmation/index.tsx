import Link from 'next/link';
import Image from 'next/image';

interface SendRequestConfirmationProps {
  trackingId: number | null;
  isEdit: boolean; // اضافه شد
}

const SendRequestConfirmation: React.FC<SendRequestConfirmationProps> = ({
  trackingId,
  isEdit,
}) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="relative max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image
              src="/images/Successfully Send Icon.jpg"
              fill
              style={{ objectFit: 'contain' }}
              alt="Add file"
              quality={100}
            />
          </div>
          <h3 className="font-Medium text-lg font-semibold text-gray-800 mb-2">
            درخواست شما با موفقیت {isEdit ? 'ویرایش شد' : 'ثبت شد'}!
          </h3>
          <p className="text-gray-600 text-sm">
            درخواست شما با شماره پیگیری <strong>{trackingId ?? '—'}</strong>{' '}
            {isEdit ? 'ویرایش شد' : 'ثبت شد'}. هم‌اکنون درخواست شما در وضعیت
            <strong className="text-emerald-500 p-1"> بررسی</strong> قرار دارد.
          </p>
        </div>
        <div className="mt-6">
          <Link
            className="px-6 py-2 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition-all"
            href="/profile-user/installment"
          >
            مشاهده درخواست‌ها
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SendRequestConfirmation;
