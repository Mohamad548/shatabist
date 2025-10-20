import React from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import clsxm from "@/utils/clsxm";

interface PaginationProductsProps {
  total: number;
  page: number;
  limit?: number;
}

const PaginationProducts: React.FC<PaginationProductsProps> = ({
  total,
  page,
  limit = 16,
}) => {
  const currentPage = page;
  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  const maxVisiblePages = 5;

  const buildHref = (p: number) => {
    const query: string[] = [];

    // فقط زمانی limit را اضافه کن که با مقدار پیش‌فرض فرق داشته باشد
    if (p !== 1) query.push(`page=${p}`);
    else query.push("page=1");

    if (limit !== 16) query.push(`limit=${limit}`);

    return `?${query.join("&")}`;
  };

  // محاسبه محدوده صفحات
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage === totalPages) startPage = Math.max(1, endPage - maxVisiblePages + 1);

  const pages: JSX.Element[] = [];
  for (let p = startPage; p <= endPage; p++) {
    pages.push(
      <Link
        key={p}
        href={buildHref(p)}
        className={clsxm(
          "min-w-[36px] h-10 px-3 flex items-center justify-center text-sm font-medium rounded-md transition-colors duration-200 border",
          currentPage === p
            ? "bg-emerald-500 text-white border-emerald-500"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        )}
      >
        {p}
      </Link>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
      <div className="flex items-center gap-2">
        {/* صفحه قبل */}
        <Link
          href={buildHref(Math.max(1, currentPage - 1))}
          className={clsxm(
            "w-10 h-10 flex items-center justify-center rounded-md border transition-colors duration-200",
            currentPage === 1
              ? "bg-gray-100 text-gray-400 border-gray-300 pointer-events-none"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          )}
        >
          <FaChevronRight />
        </Link>

        {/* شماره صفحه موبایل */}
        <span className="md:hidden text-sm font-medium text-gray-700">
          {currentPage} / {totalPages}
        </span>

        {/* شماره صفحات دسکتاپ */}
        <div className="hidden md:flex items-center gap-2">{pages}</div>

        {/* صفحه بعد */}
        <Link
          href={buildHref(Math.min(totalPages, currentPage + 1))}
          className={clsxm(
            "w-10 h-10 flex items-center justify-center rounded-md border transition-colors duration-200",
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 border-gray-300 pointer-events-none"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          )}
        >
          <FaChevronLeft />
        </Link>
      </div>

      {/* اطلاعات صفحه دسکتاپ */}
      <span className="hidden md:inline-block text-sm text-gray-700 ml-4">
        صفحه {currentPage} از {totalPages} ({total} محصول)
      </span>
    </div>
  );
};

export default PaginationProducts;
