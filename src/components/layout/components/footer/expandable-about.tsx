"use client"
import Button from "@/components/base/button";
import { useState } from "react";

export function ExpandableAbout() {
    const [isExpanded , setIsExpanded] = useState(false)
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
      };
    return <article className="md:col-span-2 flex flex-col gap-2 justify-center">
    <h5 className="font-Bold text-sm">درباره ما</h5>
    <div className="">
      <div
        className={`relative overflow-hidden ${
          isExpanded ? "max-h-full" : "max-h-20"
        }`}
        style={{
          maskImage: isExpanded
            ? "none"
            : "linear-gradient(to bottom, black 10%, transparent)",
        }}
      >
        <p className="text-gray-800 leading-6 text-sm">
          یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند
          کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمان
          کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته
          باشد: ویژگی‌هایی که فروشگاه اینترنتی دیجی‌کالا سال‌هاست بر روی
          آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را داشته
          باشد. یکی از مهم‌ترین دغدغه‌های کاربران دیجی‌کالا با هر
          فروشگاه اینترنتی دیگری، این است که کالای خریداری شده چه زمانی
          به دستشان می‌رسد. دیجی‌کالا شیوه‌های مختلفی از ارسال را متناسب
          با فروشنده، مقصد کالا، و زمان ارسال فراهم کرده است.
        </p>
      </div>
      <Button
        className="text-green-500 font-Bold text-sm cursor-pointer mt-2 inline-block"
        onClick={toggleExpand}
      >
        {isExpanded ? "بستن" : "مشاهده بیشتر »"}
      </Button>
    </div>
  </article>
 }