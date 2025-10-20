import { BASE_URL } from "@/constants/url";
import { toLocalDateString, toLocalTimeString } from "@/utils/toLocalDate";
import Image from "next/image";
import React from "react";

interface Admin {
  role: string;
  first_name: string;
  last_name: string;
  avatarUrl: string;
}

interface QuestionAnswer {
  id: number;
  content: string;
  createdAt: string;
  admin: Admin;
}

interface QuestionCardProps {
  content: string;
  createdAt: string;
  questionAnswers: QuestionAnswer[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  content,
  createdAt,
  questionAnswers,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-emerald-100/50 rounded-full">
          <Image
            src="/svg/product/message.svg"
            alt="Question"
            width={20}
            height={20}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-base text-gray-800 leading-6">
            {content}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {toLocalTimeString(createdAt)}
            {" - "}
            {toLocalDateString(createdAt)}
          </p>
        </div>
      </div>

      <div className="w-full space-y-3">
        {questionAnswers?.length > 0 ? (
          questionAnswers?.map((answer) => (
            <div
              key={answer?.id}
              className="flex items-start gap-3 bg-gray-50 rounded-lg p-3"
            >
              {answer?.admin?.avatarUrl && (
                <Image
                  src={
                    answer?.admin?.avatarUrl
                      ? `${BASE_URL}${answer.admin.avatarUrl}`
                      : "/Frame 36.png"
                  }
                  alt="Admin Avatar"
                  width={30}
                  height={30}
                  className="rounded-full border border-gray-200"
                />
              )}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold">
                    {answer?.admin?.first_name} {answer?.admin?.last_name}
                  </p>
                  <span className="text-xs text-gray-400">
                    ({answer?.admin?.role})
                  </span>
                </div>
                <div className="flex">
                  <p className="text-sm text-gray-700 leading-6">
                    {answer?.content}
                  </p>
                </div>
                <div className="flex justify-end">
                  <p className="text-xs text-gray-400 mb-1">
                    {toLocalTimeString(answer?.createdAt)}
                    {" - "}
                    {toLocalDateString(answer?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">
            هنوز پاسخی برای این سؤال وجود ندارد.
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
