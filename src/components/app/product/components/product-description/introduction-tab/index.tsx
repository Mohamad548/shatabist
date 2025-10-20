"use client";

import Button from "@/components/base/button";
import { SectionProps } from "@/types/types";
import React, { useState } from "react";

function IntroductionTab({ sectionRef, product }: SectionProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const descriptionHtml = product?.description || "";

  // اگر طول رشته بیشتر از 300 بود، دکمه نمایش بیشتر نمایش داده شود
  const shouldShowToggle = descriptionHtml.length >= 300;

  return (
    <section ref={sectionRef} className="flex flex-col gap-3">
      <p className="font-Bold text-lg">{product?.title}</p>

      <div
        className={`text-sm leading-6 transition-all duration-300 ${
          expanded ? "" : "line-clamp-6"
        }`}
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />

      {shouldShowToggle && (
        <Button
          onClick={toggleExpanded}
          className="flex justify-start text-emerald-700 text-sm font-Bold"
        >
          {expanded ? "نمایش کمتر «" : "نمایش بیشتر »"}
        </Button>
      )}
    </section>
  );
}

export default IntroductionTab;
