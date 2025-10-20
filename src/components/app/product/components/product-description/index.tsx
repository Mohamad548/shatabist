"use client";
import React, { useEffect, useRef } from "react";
import { stickyNavItem } from "@/constants/mock-data/stickynav-label";
import ProductActionBox from "../base/product-action-box";
import InformationTab from "./information-tab";
import IntroductionTab from "./introduction-tab";
import QuestionTab from "./question-tab";
import ReviewTab from "./review-tab";
import { ProductType } from "@/components/base/product-card/type";
import { useScrollStore } from "@/stores/product-scroll-store";

interface ProductDescriptionProps {
  productId?: number;
  productColors?: any;
  product?: ProductType;
}

function ProductDescription({
  productId,
  productColors,
  product,
}: ProductDescriptionProps) {
  // ✅ اول اینجا useRef تعریف کن
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({
    intro: null,
    info: null,
    review: null,
    question: null,
  });

  const setSectionRef = useScrollStore((state) => state.setSectionRef);
  const scrollToSection = useScrollStore((state) => state.scrollToSection);
  const activeId = useScrollStore((state) => state.activeId);
  const setActiveId = useScrollStore((state) => state.setActiveId);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        typeof window !== "undefined" ? window.scrollY + 100 : 0;

      let current = "intro";

      Object.entries(sectionRefs.current).forEach(([id, el]) => {
        if (el) {
          const offsetTop = el.offsetTop;
          if (scrollPosition >= offsetTop) {
            current = id;
          }
        }
      });

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // اجرای اولیه هنگام لود
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [setActiveId]);

  const setRef = (id: string, el: HTMLElement | null) => {
    sectionRefs.current[id] = el;
    setSectionRef(id, el);
  };

  return (
    <section className="w-full flex flex-col justify-between lg:flex-row">
      <div className="w-full flex flex-col gap-20 lg:w-4/5">
        <div className="w-full sticky top-0 z-10 bg-gray-25 border-2 border-gray-200 rounded-xl overflow-x-auto">
          <ul className="flex gap-5 p-2">
            {stickyNavItem.map((item) => (
              <li
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`cursor-pointer px-3 py-2 whitespace-nowrap ${
                  activeId === item.id
                    ? "font-Bold text-white bg-emerald-600 rounded-lg"
                    : ""
                }`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <IntroductionTab
          sectionRef={(el: HTMLElement | null) => setRef("intro", el)}
          product={product}
        />
        <InformationTab
          productProperties={product?.productProperties ?? []}
          sectionRef={(el) => setRef("info", el)}
        />
        <ReviewTab
          sectionRef={(el: HTMLElement | null) => setRef("review", el)}
          product={product}
        />
        <QuestionTab
          sectionRef={(el: HTMLElement | null) => setRef("question", el)}
          product={product}
        />
      </div>

      <div className="md:mr-2 fixed shadow-primary md:shadow-none md:w-1/4 md:max-w-80 w-full  bottom-0 z-20  md:relative right-0 left-0">
        <ProductActionBox
          productId={productId}
          productColors={productColors}
          className="md:sticky top-1 border p-4 md:pb-10 md:rounded-md border-gray-200 bg-white"
        />
      </div>
    </section>
  );
}

export default ProductDescription;
