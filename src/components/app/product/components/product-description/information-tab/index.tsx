"use client";
import Button from "@/components/base/button";
import { ProductProperty } from "@/components/base/product-card/type";
import React, { useState } from "react";

type SectionProps = {
  sectionRef: (el: HTMLElement | null) => void;
  productProperties?: ProductProperty[]; // اگر به ویژگی‌های خاص نیاز ندارید
};

function InformationTab({ sectionRef, productProperties = [] }: SectionProps) {
  const [showAll, setShowAll] = useState(false); // کنترل وضعیت نمایش همه ویژگی‌ها

  const handleToggle = () => setShowAll((prev) => !prev); // تغییر وضعیت نمایش
  const visibleProperties = productProperties
    ?.sort((a, b) => a.priorityIndex - b.priorityIndex)
    .slice(0, showAll ? productProperties.length : 5);

  return (
    <section ref={sectionRef} className="flex flex-col gap-3">
      {visibleProperties.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-2 px-4 py-2 bg-gray-100 rounded-lg"
        >
          <p className="font-Bold">{item?.property_value?.property?.title}</p>
          <p className="text-sm">{item?.property_value?.description}</p>
        </div>
      ))}

      {productProperties.length > 5 && (
        <Button
          onClick={handleToggle}
          className="text-emerald-700 hidden font-Bold py-4 md:flex gap-2 items-center"
        >
          {showAll ? "نمایش کمتر" : "نمایش بیشتر »"}
        </Button>
      )}
    </section>
  );
}

export default InformationTab;
