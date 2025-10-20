import { BASE_URL } from "@/constants/url";
import { toLocalDateString } from "@/utils/toLocalDate";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CommentCardProps {
  content: string;
  rate: number;
  createdAt: string;
  commentImages?: Array<{ id: number; imageUrl: string }>;
  productTitle: string;
  productImage: string;
  productLink: string;
}

function CommentCard({
  content,
  rate,
  createdAt,
  commentImages,
  productTitle,
  productImage,
  productLink,
}: CommentCardProps) {
  return (
    <div className=" flex flex-col gap-4 border-2 border-gray-200 md:border-b-gray-200 md:border-transparent p-4">
      <Link href={`/p/${productLink}`} className="">
        <div className=" flex flex-col md:flex-row items-center gap-4">
          <Image
            src={`${BASE_URL}${productImage}`}
            alt="images"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <div className=" flex flex-col gap-4 flex-1 w-full">
            <p className="text-sm font-Bold ">{productTitle}</p>
            <div className="flex gap-3 ">
              <div className="flex justify-center gap-1 bg-warning-100 py-1 px-3 rounded-md">
                <span className="text-warning-500 text-sm">{rate}</span>
                <Image
                  src="/svg/product/star.svg"
                  alt="star"
                  width={20}
                  height={20}
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-xl">|</span>
                <span className="text-gray-400 text-sm whitespace-nowrap">
                  {toLocalDateString(new Date(createdAt).getTime())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm leading-6">{content}</h3>
      </div>
      {commentImages && commentImages.length > 0 ? (
        <div className="flex gap-2">
          {commentImages?.map((img: any) => (
            <Image
              key={img.id}
              src={`${BASE_URL}${img.imageUrl}`}
              alt={`comment-image-${img.id}`}
              width={75}
              height={100}
              className="rounded-lg"
            />
          ))}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default CommentCard;
