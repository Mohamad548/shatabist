"use client";
import { AddQuestionModal } from "@/components/app/profile-user/components/base/profile-modals";
import {
  useGetCommentsProduct,
  useGetQuestionsComment,
} from "@/components/app/profile-user/hooks";
import Button from "@/components/base/button";
import { SmallLoading } from "@/components/base/loading/SmallLoading";
import { SectionProps } from "@/types/types";
import Link from "next/link";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useCreateQuestion } from "../../../hooks";
import QuestionCard from "./question-card";

function QuestionTab({ sectionRef, product }: SectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [question, setQuestion] = useState("");
  const methods = useForm();

  const handleToggle = () => setShowAll((prev) => !prev);

  const { mutate: createQuestion, isPending: isCreating } = useCreateQuestion();
  const { data, isPending: isLoading } = useGetCommentsProduct(
    product?.id || 0
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim()) return;

    if (product?.id) {
      createQuestion(
        { productId: product?.id, content: question },
        {
          onSuccess: () => {
            setQuestion("");
            toast.success("پرسش با موفقیت ثبت شد.");
          },
          onError: () => {
            toast.error("خطا در ثبت پرسش. لطفاً دوباره تلاش کنید.");
          },
        }
      );
    }
  };

  const questionInfo = data?.questions || [];
  return (
    <section ref={sectionRef} className="flex flex-col gap-6">
      {isLoading ? (
        <SmallLoading />
      ) : questionInfo.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            <p className="font-Bold text-sm">پرسش و پاسخ</p>
            <div className="hidden lg:flex items-center gap-6">
              <p className="text-gray-400 text-sm">
                شما هم درباره این کالا پرسش ثبت کنید
              </p>
              <FormProvider {...methods}>
                <AddQuestionModal
                  className="py-2 px-10 rounded-lg bg-emerald-500 text-sm text-white"
                  id={product?.id}
                />
              </FormProvider>
            </div>
          </div>

          <div className="flex md:hidden justify-between">
            <p className="text-sm font-Bold">پرسش‌های کاربران</p>
            <Button
              onClick={handleToggle}
              className="text-emerald-500 text-sm font-Bold"
            >
              مشاهده همه
            </Button>
          </div>

          <div className="flex md:flex-col gap-4 overflow-x-auto items-start md:items-stretch">
            {questionInfo
              .slice(0, showAll ? questionInfo.length : 3)
              .map((item: any) => (
                <QuestionCard
                  key={item?.id}
                  content={item?.content}
                  createdAt={item?.createdAt}
                  questionAnswers={item?.questionAnswers}
                />
              ))}
            <Button
              onClick={handleToggle}
              className="text-emerald-700 hidden font-Bold py-4 md:flex gap-2 items-center"
            >
              {showAll ? "نمایش کمتر" : "نمایش بیشتر »"}
            </Button>
          </div>
        </>
      ) : (
        <div className="bg-white p-4 rounded-xl border border-gray-200 text-right">
          <h2 className="text-xl font-bold mb-4">پرسش‌ها</h2>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="question"
              className="block font-bold text-gray-800 mb-2"
            >
              درباره این کالا چه پرسشی دارید؟
            </label>

            <textarea
              id="question"
              rows={4}
              maxLength={100}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-emerald-500 resize-none"
            />

            <div className="flex justify-between">
              <span className="text-xs text-gray-400 mt-2">
                {question.length}/100
              </span>

              {!isCreating ? (
                <button
                  type="submit"
                  disabled={question.trim().length === 0}
                  className={`mt-4 text-sm py-2 px-6 rounded-lg transition ${
                    question.trim().length > 0
                      ? "border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  ثبت پرسش
                </button>
              ) : (
                <SmallLoading />
              )}
            </div>

            <p className="text-xs text-gray-500 mt-4">
              ثبت پاسخ به معنی موافقت با{" "}
              <Link href="#" className="text-blue-500 underline">
                قوانین انتشار شتا۲۰
              </Link>{" "}
              است.
            </p>
          </form>
        </div>
      )}
    </section>
  );
}

export default QuestionTab;
