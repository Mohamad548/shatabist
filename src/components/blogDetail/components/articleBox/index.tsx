import Image from "next/image";
import React from "react";

function ArticleBox() {
  return (
    <div className="border border-gray-200 px-4 py-2 rounded-md flex gap-2 items-center w-full">
      <Image
        src="/images/phone.jpg"
        alt=""
        width={120}
        height={0}
        className="rounded-lg"
      />

      <div className="space-y-4 w-full">
        <h3 className="text-xs font-Bold">اسم مقاله در اینجا</h3>
        <div className="flex gap-2 items-center justify-between w-full flex-wrap">
          <span className="hidden md:block bg-secondary-100/30 text-primary-500 font-Bold px-3 py-1 rounded-lg w-fit text-xs">
            موضوع مقاله
          </span>
          <div className="flex items-center gap-2">
            <Image
              src="/svg/calendar.svg"
              width={15}
              height={0}
              alt="calender"
            />
            <span className="text-xs">01/01/01</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleBox;
