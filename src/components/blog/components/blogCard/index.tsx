import Image from "next/image";
import Link from "next/link";
import React from "react";
// import watch from "../../../../../public/images/watch.jpg";

export interface BlogCardsItem {
  id: string | number;
  thumbnail: string;
  title: string;
  subject: string;
  description: string;
  createdAt: string;
}

function BlogCard({
  id,
  thumbnail,
  title,
  subject,
  description,
  createdAt,
}: BlogCardsItem) {
  return (
    <Link href={`${id}`}>
      <div className="border-t-2 md:border-2 p-4 md:rounded-lg flex flex-col space-y-6  transition-all duration-500 hover:scale-110 hover:shadow-2xl">
        <Image
          src={thumbnail}
          width={344}
          height={257}
          alt="watch"
          className="rounded-md w-full"
        />
        <div className="space-y-2">
          <h3 className="font-Bold">{title}</h3>
          <p className="bg-secondary-100/30 bg text-emerald-500 font-semibold px-3 py-1 rounded-lg w-fit text-sm">
            {subject}
          </p>
          <p className="text-sm leading-5 line-clamp-2 ">{description}</p>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/svg/calendar.svg"
              width={20}
              height={20}
              alt="calender"
            />
            <span className="text-sm">{createdAt}</span>
          </div>
          <Image
            src="/svg/arrow-lefts.svg"
            width={27}
            height={27}
            alt="arrow"
            className="bg-emerald-100/20 p-1 rounded-lg"
          />
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
