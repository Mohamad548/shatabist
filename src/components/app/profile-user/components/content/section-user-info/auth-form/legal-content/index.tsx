import Button from "@/components/base/button";
import FileUpload from "@/components/base/file-upload";
import Input from "@/components/base/input";
import { useFormErrorHandler } from "@/utils/useFormErrorHandler";
import React from "react";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
const formFields = [
  { id: "companyName", label: "نام شرکت", type: "text", required: true },
  { id: "phoneNumber", label: "شماره موبایل", type: "number", required: true },
  { id: "landline", label: "تلفن ثابت", type: "number", required: true },
  { id: "nationalId", label: "شناسه ملی", type: "number", required: true },
  { id: "email", label: "ایمیل", type: "email" },
  {
    id: "registrationNumber",
    label: "شماره ثبت",
    type: "number",
    required: true,
  },
  { id: "taxId", label: "شناسه یکتای مالیاتی", type: "text", required: true },
  {
    id: "merchantRoleCode",
    label: "کد نقش تاجر در سامانه جامع تجارت",
    type: "text",
    required: true,
  },
];
const fileLabels = [
  {
    id: 1,
    label: "افزودن روزنامه رسمی",
    defaultSrc: "/images/banner1.jpg",
    required: true,
  },
  {
    id: 2,
    label: "افزودن اساسنامه",
    defaultSrc: "/images/banner1.jpg",
    required: true,
  },
  {
    id: 3,
    label: "افزودن اجاره نامه",
    defaultSrc: "/images/banner1.jpg",
    required: true,
  },
  {
    id: 4,
    label: "افزودن گواهی ارزش افزوده",
    defaultSrc: "/images/banner1.jpg",
    required: true,
  },
  {
    id: 5,
    label: "افزودن کارت ملی مدیر عامل",
    defaultSrc: "/images/banner1.jpg",
    required: true,
  },
];
const LegalContent = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext<formDataType>();

  interface formDataType {
    companyName: string;
    phoneNumber: string;
    landline: string;
    nationalId: string;
    email: string;
    registrationNumber: string;
    taxId: string;
    merchantRoleCode: string;
    "افزودن روزنامه رسمی"?: File | string;
    "افزودن اساسنامه"?: File | string;
    "افزودن اجاره نامه"?: File | string;
    "افزودن گواهی ارزش افزوده"?: File | string;
    "افزودن کارت ملی مدیر عامل"?: File | string;
  }
  const { formRefs, onError } = useFormErrorHandler();
  const onSubmit = async (data: formDataType): Promise<void> => {
    const formData = new FormData();
    const textFields = [
      "companyName",
      "phoneNumber",
      "landline",
      "nationalId",
      "email",
      "registrationNumber",
      "taxId",
      "merchantRoleCode",
    ];
    textFields.forEach((field) => {
      formData.append(field, data[field as keyof formDataType] || "");
    });

    const fileFields = [
      { key: "افزودن روزنامه رسمی", formKey: "officialJournal" },
      { key: "افزودن اساسنامه", formKey: "articlesOfAssociation" },
      { key: "افزودن اجاره نامه", formKey: "leaseAgreement" },
      { key: "افزودن گواهی ارزش افزوده", formKey: "valueAddedTaxCertificate" },
      { key: "افزودن کارت ملی مدیر عامل", formKey: "ceoNationalIdCard" },
    ];

    fileFields.forEach(({ key, formKey }) => {
      const file = data[key as keyof formDataType];
      if (file && typeof file !== "string") {
        formData.append(formKey, file);
      }
    });

    try {
      const response = await fetch("/your-api-endpoint", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
    } catch (error) {
      toast.error("خطا در ارسال اطلاعات");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="grid gap-4 md:grid-cols-3">
        {/* رندر فیلدها به صورت داینامیک */}
        {formFields.map(({ id, label, type, required }) => (
          <div
            key={id}
            ref={(el) => {
              formRefs.current[id] = el;
            }}
          >
            <Input
              id={id}
              label={
                <>
                  {label}
                  {required && <strong className="text-red-500 mr-1">*</strong>}
                </>
              }
              classNameLabel="text-sm font-medium"
              type={type}
              parentClassName="flex flex-col-reverse gap-2"
              inputClassName="border border-gray-300 rounded-md py-2.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              register={register(id as keyof formDataType, {
                ...(required && { required: `${label} الزامی است` }),
              })}
            />
            {errors[id as keyof formDataType] && (
              <p className="text-red-500 text-xs mt-1">
                {(errors[id as keyof formDataType] as { message?: string })
                  ?.message || "خطا در وارد کردن داده"}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-2 flex-wrap mt-6 ">
        {fileLabels.map(({ id, label, defaultSrc, required }) => (
          <div
            key={id}
            ref={(el) => {
              formRefs.current[label] = el;
            }} // ذخیره رفرنس برای بخش‌های FileUpload
          >
            <FileUpload
              key={id}
              label={label}
              defaultSrc={defaultSrc}
              classNameImage="w-44 h-40 mb-2"
              accept="image/jpeg, image/png"
              classNameError="absolute bottom-5 text-red-500 text-sm mt-2 text-center"
              required={required}
            />
          </div>
        ))}
      </div>
      <div className="w-full z-10 fixed md:static left-0 right-0  bg-white bottom-0 px-5 py-2 md:py-0 md:px-0">
        <Button
          type="submit"
          className="w-full border py-3 bg-emerald-500 text-white font-semibold px-6 rounded-md transition-all duration-300"
        >
          ثبت
        </Button>
      </div>
    </form>
  );
};
export default LegalContent;
