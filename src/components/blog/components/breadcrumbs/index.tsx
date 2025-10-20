import React from "react";
import Image from "next/image";
import IconSize from "@/constants/icon-size";
import Link from "next/link";

interface BreadcrumbItem {
  href: string;
  label: string;
  iconSrc?: string;
}

interface BreadcrumbProps {
  breadcrumbItems: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ breadcrumbItems, className = "" }: BreadcrumbProps) => {
  return (
    <nav className={`flex mr-4 md:mr-0 ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index !== 0 && (
              <Image
                src="/svg/arrow-left.svg"
                alt="Arrow Icon"
                width={IconSize.md}
                height={IconSize.md}
                className="text-gray-400 mr-2"
              />
            )}
            <Link
              href={item.href}
              className={`text-gray-700 hover:text-gray-900 inline-flex items-center ${
                index === 0 ? "" : "mr-1 md:mr-2"
              }`}
            >
              {item.iconSrc && (
                <Image
                  src={item.iconSrc}
                  alt={item.label}
                  width={IconSize.md}
                  height={IconSize.md}
                  className=""
                />
              )}
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
