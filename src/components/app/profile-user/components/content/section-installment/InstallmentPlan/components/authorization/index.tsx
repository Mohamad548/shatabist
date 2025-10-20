import React, { useEffect, useState } from 'react';
import { useFormContext, SubmitHandler } from 'react-hook-form';
import Button from '@/components/base/button';
import NotesSection from './notes-section';
import { useFormErrorHandler } from '@/utils/useFormErrorHandler';
import FileUpload from '@/components/base/file-upload';
import SendRequestConfirmation from '../../../send-request-confirmation';
import toast from 'react-hot-toast';
import {
  useCreateCreditRequest,
  useGetUser,
  useUpdateInstallmentById,
  useUploadDocument,
} from '@/components/app/profile-user/hooks';
import ShataLoading from '@/components/base/loading/shata-loading';
import UserInfoList from './user-info-list';
import { CreditDetail } from '@/components/app/profile-user/hooks/type';
import clsxm from '@/utils/clsxm';
import { BASE_URL } from '@/constants/url';

type FormDataType = {
  phoneNumber: string;
  [key: string]: File | string | null;
};

function Authorization({
  installmentDetail,sendRequest
}: {
  installmentDetail?: CreditDetail;sendRequest?:boolean
}) {

  
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = useFormContext<FormDataType>();
  const { formRefs, onError } = useFormErrorHandler();

  const { data, isPending } = useGetUser<any>({
    enabled: !installmentDetail,
  });
  const { mutateAsync: uploadDocument, isPending: isUploading } =
    useUploadDocument();
  const { mutateAsync: createCreditRequest, isPending: isSubmitting } =
    useCreateCreditRequest();
  const [trackingId, setTrackingId] = useState<number | null>(null);
  const currentUser = data?.user;
  const {
    mutateAsync: updateInstallment,
    isPending: isPendingUpdateInstallment,
  } = useUpdateInstallmentById();

  const fileLabels = [
    {
      id: 1,
      label: 'افزودن کارت ملی',
      defaultSrc: installmentDetail?.id_card_document?.path
        ? `${BASE_URL}${installmentDetail.id_card_document.path}`
        : '/images/nationalCard.webp',
      required: true,
      formKey: 'id_card',
      type: 'identity',
    },
    {
      id: 2,
      label: 'نمونه چک صیادی',
      defaultSrc: installmentDetail?.check_sample_document?.path
        ? `${BASE_URL}${installmentDetail.check_sample_document.path}`
        : '/images/check.jpg',
      required: true,
      formKey: 'check_sample',
      type: 'identity',
    },
  ];
  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    try {
      let idCardResId: number | undefined;
      let checkSampleResId: number | undefined;

      if ((data['افزودن کارت ملی'] as any)?.file) {
        const idCardRes = await uploadDocument({
          file: (data['افزودن کارت ملی'] as any).file,
          type: 'identity',
          business: 'credit',
        });
        idCardResId = idCardRes.document.id;
      }

      if ((data['نمونه چک صیادی'] as any)?.file) {
        const checkSampleRes = await uploadDocument({
          file: (data['نمونه چک صیادی'] as any).file,
          type: 'identity',
          business: 'credit',
        });
        checkSampleResId = checkSampleRes.document.id;
      }

      if (installmentDetail) {
        const payload: Partial<CreditDetail> = {};
        if (idCardResId) payload.id_card = idCardResId;
        if (checkSampleResId) payload.check_sample = checkSampleResId;

        if (Object.keys(payload).length > 0) {
          const res = await updateInstallment({
            id: installmentDetail.id.toString(),
            payload,
          });

          // بعد از موفقیت
          setTrackingId(+`44303030${installmentDetail.id}`);
          toast.success('اطلاعات با موفقیت بروزرسانی شد');

        }
        return;
      }

      // ایجاد درخواست جدید
      const res = await createCreditRequest({
        userId: currentUser.id,
        first_name: currentUser.first_name,
        last_name: currentUser.last_name,
        national_id: currentUser.national_id,
        phone_number: data.phoneNumber,
        id_card: idCardResId!,
        check_sample: checkSampleResId!,
      });

      if (res?.success) {
        setTrackingId(res.id);
        toast.success('درخواست با موفقیت ثبت شد');
      }
    } catch (error: any) {
      // مدیریت خطاها همانطور که دارید
    }
  };

  if (isPending) return <ShataLoading />;
  if (!data?.user) return <p>اطلاعات کاربر یافت نشد.</p>;

  return (
    <>
      {sendRequest ? (
        <SendRequestConfirmation
          trackingId={trackingId}
          isEdit={!!installmentDetail}
        />
      ) : (
        <div className="flex flex-col gap-6 w-full pt-6">
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <UserInfoList
              user={data.user}
              installmentDetail={ installmentDetail}
            />

            <div className="flex gap-2 items-end">
              <h3 className="font-bold text-base text-gray-800">
                مدارک مورد نیاز
              </h3>
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
              {fileLabels.map(
                ({ id, label, defaultSrc, required, type, formKey }) => {
                  const result =
                    formKey === 'id_card'
                      ? installmentDetail?.credit_response?.[0]?.id_card_result
                      : installmentDetail?.credit_response?.[0]
                          ?.check_sample_result;

                  const verified = result === true;
                  const needsCorrection = result === false;

                  return (
                    <div
                      className="w-full"
                      key={id}
                      ref={(el) => {
                        formRefs.current[label] = el;
                      }}
                    >
                      <FileUpload
                        key={id}
                        label={label}
                        defaultSrc={defaultSrc}
                        classNameImage={clsxm(
                          'w-44 h-40 mb-2',
                          verified && 'w-full'
                        )}
                        accept="image/jpeg, image/png"
                        classNameError="text-red-500 text-sm mt-2 text-center"
                        required={required}
                        verified={verified}
                        needsCorrection={needsCorrection}
                      />
                    </div>
                  );
                }
              )}
            </div>

            {(isUploading || isSubmitting) && (
              <div className="text-center text-blue-600 font-semibold">
                در حال پردازش...
              </div>
            )}

            <div className="flex z-10 flex-col md:flex-row-reverse gap-5 justify-between items-center">
              <div className="w-full md:w-auto fixed md:static left-0 right-0 bg-white bottom-20 px-5 py-2 md:py-0 md:px-0">
                <Button
                  type="submit"
                  disabled={isUploading || isSubmitting}
                  className="bg-emerald-500 hover:bg-emerald-700 py-3 px-12 text-white w-full rounded-md font-medium text-base"
                >
                  ثبت درخواست
                </Button>
              </div>
              <h3 className="font-regular text-sm">
                درخواست شما نهایتاً تا <strong>چند ساعت کاری آینده</strong>{' '}
                بررسی و نتیجه برای شما پیامک خواهد شد
              </h3>
            </div>
          </form>

          <NotesSection />
        </div>
      )}
    </>
  );
}

export default Authorization;
