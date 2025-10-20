"use client";

import React from "react";
import Button from "../button";
import FileUpload from "../file-upload";
import ReactQuill from "react-quill";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "react-quill/dist/quill.snow.css"; // برای اعمال استایل react quill
import {
  useCreateTicketComment,
  useEditTicketByUser,
  useGetTicketsById,
} from "@/components/app/profile-user/hooks";
import { toLocalDateString, toLocalTimeString } from "@/utils/toLocalDate";
import { BASE_URL } from "@/constants/url";
import ManageModal from "../modal";

interface TicketImage {
  id: number;
  url: string;
}

// Helper function to translate ticket status to Persian
const getTicketStatusLabel = (status?: string) => {
  switch (status) {
    case "ANSWERED":
      return "پاسخ داده‌شده";
    case "PENDING":
      return "درانتظار پاسخ";
    case "OPEN":
      return "باز";
    case "CLOSED":
      return "بسته‌شده";
    case "WAITFORREPLY":
      return "منتظر پاسخ شما";
    default:
      return status || "نامشخص";
  }
};

function TicketDetail({ ticketId }: { ticketId: string }) {
  const { data, isPending } = useGetTicketsById(ticketId);
  const { ticket } = data || {};

  const comments = ticket?.comments || [];
  const ticketImages = ticket?.ticketImages || [];

  const router = useRouter();
  const methods = useForm();

  const { mutate: addedComment } = useCreateTicketComment();

  const onSubmit = (data: any) => {
    console.log("Form data:", data); // Debug log
    const formData = new FormData();

    // ارسال محتوای HTML برای حفظ استایل‌ها
    formData.append("content", data.description || "");

    // اضافه کردن عکس (FileUpload stores it as { file, preview })
    const fileData = data["افزودن پیوست"];
    console.log("File data:", fileData); // Debug log
    if (fileData && fileData.file) {
      formData.append("images", fileData.file);
      console.log("Image added to FormData"); // Debug log
    } else {
      console.log("No file data found"); // Debug log
    }

    // اضافه کردن ticketId
    formData.append("ticketId", ticketId);

    // ارسال درخواست
    addedComment(formData);

    methods.reset();
  };

  const { mutate: closeTicket } = useEditTicketByUser();

  const handleCloseTicket = () => {
    if (ticket?.id) {
      closeTicket(ticket.id);
      router.push("/profile-user/support?activeTab=closed"); // هدایت بعد از بستن تیکت
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4 border-2 rounded-2xl border-gray-100">
      <div className="flex items-center justify-between gap-4 py-2 px-2 bg-white rounded-xl shadow-sm border border-gray-100">
        <button
          type="button"
          aria-label="بازگشت"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 transition"
          onClick={() => router.back()}
        >
          <Image
            src="/svg/arrow-rights.svg"
            alt="بازگشت"
            width={20}
            height={20}
            className="rtl:rotate-0 ltr:rotate-180"
          />
        </button>
        <div className="flex  gap-2 text-gray-700 text-sm font-medium">
          <span className="truncate opacity-70 text-emerald-600">
            عنوان: {ticket?.title || "-"}
          </span>
          <span className="opacity-70">شماره : {ticket?.id || "-"}</span>
          <span className="opacity-70">
            تاریخ : {toLocalDateString(ticket?.createdAt) || "-"}
          </span>
          <span className="px-2 py-1 rounded bg-gray-100 text-emerald-500 font-bold text-xs">
            {getTicketStatusLabel(ticket?.status)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-2 h-[600px] overflow-y-auto bg-gray-50 rounded-lg">
        <section
          className={`bg-white border border-gray-200 shadow-sm rounded-xl p-4 w-full max-w-2xl flex flex-col gap-2 `}
        >
          <div className=" flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-800">کاربر سایت</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-[#e6f7ec] text-[#059669]">
              کاربر
            </span>
          </div>
          <div
            className="text-sm text-gray-700 leading-7 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: ticket?.content || "" }}
          />
          {Array.isArray(ticketImages) && ticketImages.length > 0 && (
            <ManageModal
              triggerContent={
                <div className="relative flex gap-2 mt-2 h-20 cursor-pointer w-full">
                  {ticketImages.map((image: TicketImage) =>
                    image?.url ? (
                      <Image
                        key={image.id}
                        src={BASE_URL + image.url}
                        alt={`تصویر ${image.id}`}
                        width={150}
                        height={50}
                        layout=""
                        objectFit="contain"
                        className="rounded-md object-cover"
                      />
                    ) : null
                  )}
                </div>
              }
              fadeIn="animate-slideUp"
              fadeOut="animate-slideDown"
              modalBodyClass="absolute z-50 w-3/4 h-3/4 flex justify-center items-center"
              className="fixed inset-0 z-40"
              cancelLabel={
                <div className="border border-gray-600 rounded-full p-1 w-6 h-6 text-gray-800 text-xs">
                  ✕
                </div>
              }
              cancelBoxClass="absolute left-2 top-2"
            >
              <div className="relative flex gap-2 flex-wrap w-full h-96 overflow-auto">
                {ticketImages.map((image: TicketImage) =>
                  image?.url ? (
                    <Image
                      key={image.id}
                      src={BASE_URL + image.url}
                      alt={`تصویر ${image.id}`}
                      fill
                      className="object-contain rounded-md"
                    />
                  ) : null
                )}
              </div>
            </ManageModal>
          )}
          <div className="flex justify-end">
            <span className="text-xs text-gray-400">
              {toLocalDateString(ticket?.createdAt)}
            </span>
          </div>
        </section>

        {comments
          ?.sort(
            (a: any, b: any) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .map((comment: any) => (
            <section
              key={comment.id}
              className={
                `bg-white border border-gray-200 shadow-sm rounded-xl p-4 w-full max-w-2xl flex flex-col gap-2 ` +
                (comment.admin ? "self-end" : "self-start")
              }
            >
              <div className=" flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">
                  {comment?.admin
                    ? `${comment?.admin?.first_name} ${comment?.admin?.last_name}`
                    : "کاربر سایت"}
                  {/* // : `${comment?.user?.first_name} ${comment?.user?.last_name}`} */}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium "
                  style={{
                    background: comment?.admin ? "#e3f0fc" : "#e6f7ec",
                    color: comment?.admin ? "#2563eb" : "#059669",
                  }}
                >
                  {comment?.admin ? "ادمین" : "کاربر"}
                </span>
              </div>
              <div
                className="text-sm text-gray-700 leading-7 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: comment?.content || "" }}
              />
              {Array.isArray(comment?.ticketImages) &&
                comment?.ticketImages.length > 0 && (
                  <ManageModal
                    triggerContent={
                      <div className=" relative flex gap-2 mt-2 flex-wrap  w-full h-40 cursor-pointer">
                        {comment?.ticketImages.map((image: TicketImage) =>
                          image?.url ? (
                            <Image
                              key={image?.id}
                              src={BASE_URL + image?.url}
                              alt={`تصویر ${image?.id}`}
                                          fill
    style={{ objectFit: "contain" }}
                              className="rounded-md object-cover border border-gray-200"
                            />
                          ) : null
                        )}
                      </div>
                    }
                    fadeIn=" animate-slideUp"
                    fadeOut="animate-slideDown"
                    modalBodyClass="absolute z-50 w-3/4 h-3/4 flex justify-start items-center "
                    className="fixed inset-0 z-40"
                    cancelLabel={
                      <div className="border border-gray-600 rounded-full p-1 w-6 h-6 text-gray-800 text-xs">
                        ✕
                      </div>
                    }
                    cancelBoxClass="absolute left-2 top-2"
                  >
                    <div className=" relative flex gap-2 mt-2 flex-wrap  w-full h-96">
                      {comment?.ticketImages.map((image: TicketImage) =>
                        image?.url ? (
                          <Image
                            key={image?.id}
                            src={BASE_URL + image?.url}
                            alt={`تصویر ${image?.id}`}
                                       fill
    style={{ objectFit: "contain" }}
                          />
                        ) : null
                      )}
                    </div>
                  </ManageModal>
                )}
              <div className="flex justify-end">
                <span className=" text-xs text-gray-400">
                  {toLocalTimeString(comment?.createdAt)}
                  {" - "}
                  {toLocalDateString(comment?.createdAt)}
                </span>
              </div>
            </section>
          ))}
      </div>

      {/* فرم با FormProvider */}
      {ticket?.status === "CLOSED" ? (
        <div className="w-full mx-auto shadow-md rounded-xl flex flex-col gap-4 p-6 border border-gray-100 bg-gray-50">
          <div className="flex items-center justify-center gap-3 text-gray-500">
            {/* <Image
              src="/svg/close-circle.svg"
              alt="بسته‌شده"
              width={24}
              height={24}
            /> */}
            <span className="text-base font-semibold">
              این تیکت بسته شده است و امکان ارسال پاسخ وجود ندارد
            </span>
          </div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="w-full mx-auto shadow-md rounded-xl flex flex-col gap-6 p-6 border border-gray-100"
          >
            {/* توضیحات */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="description"
                className="text-base font-semibold text-gray-700 mb-1"
              >
                توضیحات <span className="text-red-500">*</span>
              </label>
              <Controller
                name="description"
                control={methods.control}
                rules={{ required: "توضیحات ضروری است" }}
                render={({ field }) => (
                  <div className="rounded-lg border border-gray-200 focus-within:border-emerald-500 bg-gray-50 transition-all">
                    <ReactQuill
                      theme="snow"
                      value={field.value || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      className="ql-editor min-h-[100px] text-gray-800 bg-transparent"
                    />
                  </div>
                )}
              />
              {methods.formState.errors.description && (
                <span className="text-red-500 text-xs mt-1">
                  {String(methods.formState.errors.description?.message)}
                </span>
              )}
            </div>

            {/* FileUpload */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700 mb-1">
                افزودن پیوست (اختیاری)
              </label>
              <FileUpload
                label="افزودن پیوست"
                defaultSrc="/images/check.jpg"
                classNameBody="max-w-xs px-4 py-2 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg flex items-center justify-center min-h-[56px] hover:border-emerald-400 transition-all"
                classNameTemplate="flex-col"
                classNameImage="w-20 h-12"
                accept="image/jpeg, image/png"
                classNameError="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="flex justify-between items-center mt-2 gap-4">
              <Button
                type="submit"
                className="flex-1 text-sm py-3 rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow-none font-semibold"
              >
                ارسال پاسخ
              </Button>
              <Button
                type="button"
                onClick={handleCloseTicket}
                className="flex-0 text-sm py-3 px-6 rounded-lg border border-emerald-200 text-emerald-500 bg-white hover:bg-emerald-50 transition-all shadow-none font-semibold"
              >
                بستن تیکت
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}

export default TicketDetail;
