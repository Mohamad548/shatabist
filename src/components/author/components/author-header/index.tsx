import { socialLinks } from "@/constants/mock-data/author-social-Links";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function AuthorHeader() {
  return (
    <div className=" flex flex-col md:flex-row py-10 px-6 md:px-40 items-center gap-4 w-full bg-gray-50">
      <Image
        src="/images/author.jpg"
        alt="author"
        width={150}
        height={0}
        className="rounded-full h-36 object-none object-top"
      />
      <div className="flex flex-col gap-2 items-center md:items-start">
        <h5 className="font-Bold text-xl">محدثه رضایی </h5>
        <p className="text-sm text-gray-500 w-full">
          متولد ۱۳۵۰، تحصیل‌کرده مهندسی نرم‌افزار و کارشناسی زبان و ادبیات
          انگلیسی. از سال ۱۳۷۶ روزنامه‌نگارم و راه‌اندازی نخستین صفحه فناوری
          اطلاعات در روزنامه‌های ایران، سردبیری نخستین هفته‌نامه و نخستین
          روزنامه فناوری اطلاعات ایران جزو سوابق من است.
        </p>
        <div className="flex items-center gap-4 mt-4">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src={social.iconSrc}
                alt={`${social.name} icon`}
                width={25}
                height={25}
                className=""
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthorHeader;
