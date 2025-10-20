import Image from "next/image";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AddFeedbackModal } from "../../../../base/profile-modals";
import { BASE_URL } from "@/constants/url";

interface ContentPendingCardProps {
  title: string;
  imageUrl: string;
}

function ContentPendingCard({ title, imageUrl }: ContentPendingCardProps) {
  const methods = useForm();
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 items-center ">
      <div className="flex justify-center items-center gap-2 cursor-pointer">
        <div className="relative h-20 min-w-20">
          <Image
            src={`${BASE_URL}${imageUrl}`}
                    fill
    style={{ objectFit: "contain" }}
            alt="Product Image"
            quality={100}
          />
        </div>
        <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
      </div>
      <FormProvider {...methods}>
        <AddFeedbackModal className="border py-2 px-3 border-emerald-500 rounded-md text-emerald-500 bg-emerald-100/30 whitespace-nowrap text-sm " />
      </FormProvider>
    </div>
  );
}

export default ContentPendingCard;
