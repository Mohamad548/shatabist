import React from 'react';
import Image from 'next/image';
import Input from '@/components/base/input';
import clsxm from '@/utils/clsxm';
import { useFormContext } from 'react-hook-form';

interface FileUploadProps {
  label: string;
  defaultSrc?: string;
  classNameBody?: string;
  classNameTemplate?: string;
  classNameImage?: string;
  accept?: string;
  classNameError?: string;
  required?: boolean;
  classBoxText?: string;
  autoAddOnUpload?: boolean;
  onAutoAdd?: () => void;
  onRemove?: () => void;
  onFileSelect?: (file: File) => void;
  verified?: boolean;
  needsCorrection?: boolean; // 👈 اضافه شد
}

const FileUpload = ({
  label,
  defaultSrc,
  classNameTemplate,
  classNameImage,
  classNameBody,
  accept,
  classNameError,
  required = false,
  classBoxText,
  autoAddOnUpload = false,
  onAutoAdd,
  verified,
  needsCorrection,
  onRemove,
  onFileSelect,
}: FileUploadProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    watch,
  } = useFormContext();

  const isValidValue = (value: any) =>
    value && (typeof value === 'string' || value.preview);

  const allowedTypes = ['image/jpeg', 'image/png'];

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          setValue(label, { file, preview: reader.result as string });
          clearErrors(label);

          if (typeof onFileSelect === 'function') {
            onFileSelect(file);
          }
          if (autoAddOnUpload && typeof onAutoAdd === 'function') {
            onAutoAdd();
          }
        };
        reader.readAsDataURL(file);
      } else {
        setValue(label, null);
        setError(label, {
          type: 'manual',
          message: 'فقط فایل‌های با فرمت‌های jpeg و png مجاز هستند.',
        });
      }
    }
  };

  const watchedValue = watch(label);

  return (
    <div
      className={clsxm(
        'relative border rounded-lg py-2 px-1 flex flex-col',
        classNameBody,
        verified && 'border-green-500',
        needsCorrection && 'border-yellow-500'
      )}
    >
      <label
        htmlFor={label}
        className={clsxm(
          'flex w-full text-center p-2 justify-around items-center',
          classNameTemplate,
          !verified && 'cursor-pointer'
        )}
      >
        <div className={clsxm('flex flex-col items-center', classBoxText)}>
          {!verified && !isValidValue(watchedValue) && (
            <div className="relative w-6 h-6 mb-2">
              <Image
                src="/svg/profile/add-circle.svg"
                fill
                style={{ objectFit: 'contain' }}
                alt="Add file"
                quality={100}
                className="rounded-xl"
              />
            </div>
          )}
          <Input
            label={!verified && !isValidValue(watchedValue) ? label : undefined}
            inputClassName="hidden"
            parentClassName="flex-col-reverse gap-2"
            type="file"
            id={label}
            disabled={verified}
            accept={accept}
            classNameLabel={`text-gray-500 ${verified ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            {...register(label, {
              validate: (val: any) => {
                if (required && !verified && (!val || !val.file)) {
                  return `${label} الزامی است`;
                }
                return true;
              },
            })}
            onChange={onFileChange}
          />

          {!verified && required && (
            <strong className="text-red-500 mr-1">*</strong>
          )}
        </div>

        <div className={clsxm('relative w-16 h-16', classNameImage)}>
          {isValidValue(watchedValue) ? (
            <Image
              src={
                typeof watchedValue === 'string'
                  ? watchedValue
                  : watchedValue?.preview
              }
              fill
              style={{ objectFit: 'contain' }}
              alt={`${label} Preview`}
              quality={100}
            />
          ) : (
            defaultSrc && (
              <Image
                src={defaultSrc}
                fill
                style={{ objectFit: 'contain' }}
                alt={`${label} Preview`}
                quality={100}
              />
            )
          )}
        </div>
      </label>

      {errors[label]?.message && (
        <div className={classNameError}>{String(errors[label]?.message)}</div>
      )}

      {!verified && isValidValue(watchedValue) && (
        <button
          type="button"
          onClick={() => {
            setValue(label, null);
            clearErrors(label);
            if (onRemove) onRemove();
          }}
          className="absolute top-2 left-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:text-white transition-all"
          aria-label="حذف فایل"
        >
          <Image
            src="/svg/profile/close-circle.svg"
            alt="close"
            width={24}
            height={24}
          />
        </button>
      )}

      {verified && (
        <span className="absolute -top-3 left-2 bg-green-100 text-green-600 border border-green-500 rounded-full px-2 py-1 text-xs font-bold">
          تایید شده
        </span>
      )}

      {needsCorrection && !verified && (
        <span className="absolute -top-3 left-2 bg-yellow-100 text-yellow-600 border border-yellow-500 rounded-full px-2 py-1 text-xs font-bold">
          نیاز به اصلاحیه
        </span>
      )}
    </div>
  );
};

export default FileUpload;
