"use client";
import React, { useMemo, useRef } from "react";
import { useGetOrdersByUserId } from "@/components/app/profile-user/hooks";
import { toLocalDateString, toLocalTimeString } from "@/utils/toLocalDate";
import type { OrderItem as OrderItemType } from "@/types/types";

interface InvoicePageProps {
  params: { orderId: string };
}

export default function InvoicePage({ params }: InvoicePageProps) {
  const { orderId } = params;

  const { data: orders, isPending } = useGetOrdersByUserId(orderId);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const {
    buyerFullName,
    buyerNationalId,
    buyerPhone,
    buyerAddressLine,
    buyerPostalCode,
    orderIdLabel,
    trackId,
    orderDateLabel,
    orderTimeLabel,
    items,
    originalSubtotal,
    subtotal,
    discountTotal,
    taxAmount,
    shippingCost,
    grandTotal,
    totalUnitPrices,
  } = useMemo(() => {
    const userProfile = orders?.user?.profile;
    const address = orders?.userAddress;
    const itemList: OrderItemType[] =
      (orders?.orderItems as OrderItemType[]) ?? [];
    const { computedOriginalSubtotal, computedSubtotal, totalUnitPrices } =
      itemList.reduce(
        (
          acc: {
            computedOriginalSubtotal: number;
            computedSubtotal: number;
            totalUnitPrices: number;
          },
          it: OrderItemType
        ) => {
          const qty = it.quantity || 0;
          const originalCandidate = Number(
            (it as any)?.variant?.customerPrice ?? it.price ?? 0
          );
          const specialCandidateRaw = (it as any)?.variant
            ?.customerSpecialPrice;
          const specialCandidate = Number(
            specialCandidateRaw ?? originalCandidate
          );
          const unitOriginal =
            Number.isFinite(originalCandidate) && originalCandidate > 0
              ? originalCandidate
              : Number(it.price || 0);
          const unitDiscounted =
            Number.isFinite(specialCandidate) &&
            specialCandidate > 0 &&
            specialCandidate < unitOriginal
              ? specialCandidate
              : unitOriginal;
          acc.computedOriginalSubtotal += unitOriginal * qty;
          acc.computedSubtotal += unitDiscounted * qty;
          acc.totalUnitPrices += unitOriginal;
          return acc;
        },
        { computedOriginalSubtotal: 0, computedSubtotal: 0, totalUnitPrices: 0 }
      );
    const packagingType = orders?.packagingType;
    const packagingCost =
      packagingType === "ECONOMIC"
        ? 15000
        : packagingType === "IRON"
          ? 30000
          : 0;
    const wrappingCost = Number(orders?.wrapping?.cost ?? 0);
    const isPickup = orders?.deliveryType === "PICKUP_IN_STORE";
    const shipCost = isPickup ? 0 : Number(orders?.shipping?.price ?? 0);
    const computedDiscountTotal = Math.max(
      0,
      computedOriginalSubtotal - computedSubtotal
    );
    const computedTax = Math.round(computedSubtotal * 0.1);
    const computedGrand =
      computedSubtotal + packagingCost + wrappingCost + shipCost + computedTax;
    return {
      buyerFullName: userProfile
        ? `${userProfile.first_name ?? ""} ${userProfile.last_name ?? ""}`.trim()
        : "",
      buyerNationalId: userProfile?.national_id ?? "-",
      buyerPhone: orders?.user?.phone_number ?? "-",
      buyerAddressLine: address?.details
        ? `${address?.province?.name ?? ""}، ${address?.city?.name ?? ""}، ${address.details}`
        : "-",
      buyerPostalCode: address?.postalCode ?? "-",
      orderIdLabel: orders?.id ?? "-",
      trackId: orders?.payments?.[0]?.trackId ?? "-",
      orderDateLabel: orders?.created_at
        ? toLocalDateString(orders.created_at)
        : "-",
      orderTimeLabel: orders?.created_at
        ? toLocalTimeString(orders.created_at)
        : "-",
      items: itemList,
      originalSubtotal: computedOriginalSubtotal,
      subtotal: computedSubtotal,
      discountTotal: computedDiscountTotal,
      taxAmount: computedTax,
      shippingCost: shipCost,
      grandTotal: computedGrand,
      totalUnitPrices: totalUnitPrices,
    };
  }, [orders]);

  const handleDownloadPdf = () => {
    // Create a new window/tab for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("لطفاً مسدودکننده پاپ‌آپ را غیرفعال کنید");
      return;
    }

    // Get the invoice content
    const invoiceContent = invoiceRef.current?.innerHTML || "";

    // Create the HTML structure for the print window
    const printHTML = `
      <!DOCTYPE html>
      <html dir="rtl" lang="fa">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>فاکتور سفارش ${orderId}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;200;300;400;500;600;700;800;900&display=swap');
            
            * {
              font-family: 'Vazirmatn', sans-serif !important;
            }
            
            @media print {
              body { 
                margin: 0; 
                padding: 20px;
                background: white !important;
                color: black !important;
              }
              
              .no-print { 
                display: none !important; 
              }
              
              .print-break { 
                page-break-after: always; 
              }
              
              .print-break-inside { 
                page-break-inside: avoid; 
              }
              
              /* Ensure colors print correctly */
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }
              
              /* Optimize table for print */
              table {
                border-collapse: collapse !important;
                width: 100% !important;
              }
              
              th, td {
                border: 1px solid #333 !important;
                padding: 8px !important;
                font-size: 12px !important;
              }
              
              /* Adjust font sizes for print */
              h1, h2, h3, h4 {
                font-size: 14px !important;
                margin: 5px 0 !important;
              }
              
              .text-xs { font-size: 10px !important; }
              .text-sm { font-size: 11px !important; }
              .text-base { font-size: 12px !important; }
              .text-lg { font-size: 13px !important; }
              .text-xl { font-size: 14px !important; }
              
              /* Hide mobile layout on print */
              .lg\\:hidden {
                display: none !important;
              }
              
              /* Show desktop layout on print */
              .hidden.lg\\:block {
                display: block !important;
              }
              
              /* Adjust margins and padding for print */
              .p-4, .p-6, .p-8 {
                padding: 10px !important;
              }
              
              .m-4, .m-6, .m-8 {
                margin: 5px !important;
              }
            }
            
            @page {
              size: A4;
              margin: 15mm;
            }
          </style>
        </head>
        <body class="bg-white text-black">
          <div class="max-w-full mx-auto">
            ${invoiceContent}
          </div>
          
          <script>
            window.onload = function() {
              // Wait a bit for styles to load
              setTimeout(function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                }
              }, 1000);
            }
          </script>
        </body>
      </html>
    `;

    // Write the HTML to the new window
    printWindow.document.write(printHTML);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-6 text-right ">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-slate-800 tracking-tight">
            فاکتور فروش ({orderId})
          </h1>
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none no-print"
            onClick={handleDownloadPdf}
            disabled={isPending}
          >
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              چاپ / ذخیره PDF
            </span>
          </button>
        </div>

        {isPending ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg text-slate-600">در حال بارگذاری...</p>
          </div>
        ) : (
          <div
            ref={invoiceRef}
            className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden print-break-inside"
          >
            {/* Invoice Header */}

            {/* Top Section */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 lg:gap-6 ">
                {/* Labels Column - Hidden on mobile, visible on large screens */}
                <div className="hidden lg:flex lg:col-span-1 flex-col gap-3">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4 flex items-center justify-center flex-1 shadow-sm">
                    <p className="-rotate-90 font-bold text-emerald-700 text-sm whitespace-nowrap">
                      فروشنده
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 flex items-center justify-center flex-1 shadow-sm">
                    <p className="-rotate-90 font-bold text-blue-700 text-sm whitespace-nowrap">
                      خریدار
                    </p>
                  </div>
                </div>

                {/* Information Cards */}
                <div className="col-span-1 lg:col-span-5 flex flex-col gap-3">
                  {/* Seller Information */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-4 sm:p-6 shadow-lg flex-1 flex flex-col justify-center">
                    <div className="lg:hidden mb-4">
                      <h3 className="text-lg font-bold text-emerald-700 mb-2">
                        اطلاعات فروشنده
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          فروشنده:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm whitespace-nowrap">
                          شرکت نوآوران فن آوا
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          شناسه ملی:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          ۱۰۳۲۰۳۵۵۸۷
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          شماره ثبت:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          ۲۳۳۴۵
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          شناسه اقتصادی:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          ۱۰۳۲۰۳۵۵۸۷
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          نشانی:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          تهران ، توحید ، پلاک ۲۸
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          کدپستی:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          ۱۰۳۲۰۳۵۵۸۷
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          شماره تلفن:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          ۱۰۳۲۰۳۵۵۸۷
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Buyer Information */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6 shadow-lg flex-1 flex flex-col justify-center">
                    <div className="lg:hidden mb-4">
                      <h3 className="text-lg font-bold text-blue-700 mb-2">
                        اطلاعات خریدار
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          خریدار:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          {buyerFullName || "-"}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          شناسه ملی:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          {buyerNationalId}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          شماره ثبت:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          -
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          شناسه اقتصادی:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          -
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          نشانی:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          {buyerAddressLine}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          کدپستی:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          {buyerPostalCode}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          شماره تلفن:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          {buyerPhone}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Vendor info for pickup or delivery */}
                </div>

                {/* Invoice Details */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-3">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 sm:p-6 shadow-lg flex-1 flex flex-col justify-center">
                    <h4 className="text-purple-700 font-bold text-lg mb-4">
                      جزئیات فاکتور
                    </h4>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          شماره فاکتور:
                        </p>
                        <p className="text-slate-800 font-bold text-sm bg-purple-100 px-3 py-1 rounded-lg">
                          {String(orderIdLabel)}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          شماره پیگیری:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          {trackId}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          تاریخ:
                        </p>
                        <p className="text-slate-800 font-semibold text-sm">
                          {orderDateLabel} - {orderTimeLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-rose-50 to-red-50 border-2 border-rose-200 rounded-xl p-4 sm:p-6 shadow-lg flex-1 flex flex-col justify-center">
                    <h4 className="text-rose-700 font-bold text-lg mb-4">
                      اطلاعات مالیاتی
                    </h4>
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          شماره مالیاتی:
                        </p>
                        <p className="text-slate-800 font-mono font-semibold text-xs bg-rose-100 px-3 py-1 rounded-lg">
                          A11*5KE*DDC...YFVCEF
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          سریال منطقه مالیاتی:
                        </p>
                        <p className="text-slate-800 font-mono font-semibold text-xs">
                          S-۵۴۱۰۰۰۰۰۰۱۰
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
                        <p className="text-slate-600 font-medium text-sm mb-1 sm:mb-0">
                          سریال پایانه فروشگاهی:
                        </p>
                        <p className="text-slate-800 font-mono font-semibold text-xs">
                          A-۵۴۱۰۰۰۰۰۰۱۰
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Products Table */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto rounded-xl shadow-lg border border-slate-200">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-100 to-slate-200">
                      <th className="border border-slate-300 p-3 text-slate-700 font-bold text-xs">
                        ردیف
                      </th>
                      <th className="border border-slate-300 p-3 text-slate-700 font-bold text-xs">
                        شناسه کالا
                      </th>
                      <th className="border border-slate-300 p-3 text-slate-700 font-bold text-xs">
                        شرح کالا یا خدمت
                      </th>
                      <th className="border border-slate-300 p-3 text-slate-700 font-bold text-xs">
                        شرکت یا سازمان
                      </th>
                      <th className="border border-slate-300 p-3 text-slate-700 font-bold text-xs">
                        رنگ
                      </th>
                      <th className="border border-slate-300 p-3 text-slate-700 font-bold text-xs">
                        تعداد
                      </th>
                      <th className="border border-slate-300 p-3 text-slate-700 font-bold text-xs">
                        مبلغ واحد (ریال)
                      </th>
                      <th className="border border-slate-300 p-3 text-slate-700 font-bold text-xs">
                        مبلغ کل (ریال)
                      </th>
                      <th className="border border-slate-300 p-3 text-slate-700 font-bold text-xs">
                        مبلغ کل پس از تخفیف (ریال)
                      </th>
                      <th className="border border-slate-300 p-3 text-slate-700 font-bold text-xs">
                        جمع مالیات و عوارض (ریال)
                      </th>
                      <th className="border border-slate-300 p-3 text-slate-700 font-bold text-xs">
                        جمع کل پس از تخفیف (ریال)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it: OrderItemType, idx: number) => {
                      const qty = it.quantity ?? 0;
                      const originalCandidate = Number(
                        (it as any)?.variant?.customerPrice ?? it.price ?? 0
                      );
                      const specialCandidateRaw = (it as any)?.variant
                        ?.customerSpecialPrice;
                      const specialCandidate = Number(
                        specialCandidateRaw ?? originalCandidate
                      );
                      const unitOriginal =
                        Number.isFinite(originalCandidate) &&
                        originalCandidate > 0
                          ? originalCandidate
                          : Number(it.price || 0);
                      const unitDiscounted =
                        Number.isFinite(specialCandidate) &&
                        specialCandidate > 0 &&
                        specialCandidate < unitOriginal
                          ? specialCandidate
                          : unitOriginal;
                      const rowTotalBeforeDiscount = unitOriginal * qty;
                      const rowTotalAfterDiscount = unitDiscounted * qty;
                      const discountAmount = Math.max(
                        0,
                        rowTotalBeforeDiscount - rowTotalAfterDiscount
                      );
                      const rowTax = Math.round(rowTotalAfterDiscount * 0.1);
                      const productTitle = it.variant?.product?.title ?? "-";
                      const orgName = it.variant?.stock?.name ?? "-";
                      return (
                        <tr
                          key={it.id ?? `${idx}`}
                          className="hover:bg-slate-50 transition-colors duration-200 odd:bg-gray-50/50"
                        >
                          <td className="border border-slate-300 p-3 text-center text-sm font-semibold text-slate-700">
                            {idx + 1}
                          </td>
                          <td className="border border-slate-300 p-3 text-center text-xs font-mono text-slate-600">
                            {it.variantId ?? "-"}
                          </td>
                          <td className="border border-slate-300 p-3 text-center text-sm font-medium text-slate-800">
                            <div className="flex flex-col items-center gap-1">
                              <span>{productTitle}</span>
                              <span className="text-xs text-slate-500">
                                {it.serialNumber ?? "-"}
                              </span>
                            </div>
                          </td>
                          <td className="border border-slate-300 p-3 text-center text-sm text-slate-600">
                            {orgName}
                          </td>
                          <td className="border border-slate-300 p-3 text-center text-sm font-semibold">
                            <div className="flex items-center justify-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{
                                  backgroundColor:
                                    (it as any)?.variant?.color?.color ||
                                    "#gray",
                                }}
                              ></div>
                              <span className="text-slate-700">
                                {(it as any)?.variant?.color?.mainColor || "-"}
                              </span>
                            </div>
                          </td>
                          <td className="border border-slate-300 p-3 text-center text-sm font-bold text-blue-600">
                            {qty}
                          </td>
                          <td className="border border-slate-300 p-3 text-center text-sm font-semibold text-emerald-600">
                            {unitOriginal.toLocaleString("fa-IR")}
                          </td>
                          <td className="border border-slate-300 p-3 text-center text-sm font-semibold text-slate-700">
                            {rowTotalBeforeDiscount.toLocaleString("fa-IR")}
                          </td>
                          <td className="border border-slate-300 p-3 text-center text-sm font-bold text-green-600">
                            {rowTotalAfterDiscount.toLocaleString("fa-IR")}
                          </td>
                          <td className="border border-slate-300 p-3 text-center text-sm font-semibold text-orange-600">
                            {rowTax.toLocaleString("fa-IR")}
                          </td>
                          <td className="border border-slate-300 p-3 text-center text-sm font-bold text-purple-600">
                            {rowTotalAfterDiscount.toLocaleString("fa-IR")}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-gradient-to-r from-slate-200 to-slate-300 font-bold ">
                      <td
                        className="border border-slate-400 p-3 text-center text-sm font-bold text-slate-800"
                        colSpan={4}
                      >
                        جمع کل
                      </td>
                      <td className="border border-slate-400 p-3 text-center text-sm text-slate-600">
                        -
                      </td>
                      <td className="border border-slate-400 p-3 text-center text-sm font-bold text-blue-700">
                        {items.reduce(
                          (s: number, it: OrderItemType) =>
                            s + (it.quantity ?? 0),
                          0
                        )}
                      </td>
                      <td className="border border-slate-400 p-3 text-center text-sm font-bold text-green-700">
                        {totalUnitPrices.toLocaleString("fa-IR")}
                      </td>
                      <td className="border border-slate-400 p-3 text-center text-sm font-bold text-slate-800">
                        {originalSubtotal.toLocaleString("fa-IR")}
                      </td>
                      <td className="border border-slate-400 p-3 text-center text-sm font-bold text-green-700">
                        {subtotal.toLocaleString("fa-IR")}
                      </td>
                      <td className="border border-slate-400 p-3 text-center text-sm font-bold text-orange-700">
                        {taxAmount.toLocaleString("fa-IR")}
                      </td>
                      <td className="border border-slate-400 p-3 text-center text-sm font-bold text-purple-700">
                        {subtotal.toLocaleString("fa-IR")}
                      </td>
                    </tr>
                    {/* Additional Cost Rows */}
                    <tr className="bg-slate-100">
                      <td
                        className="border border-slate-400 p-3 text-left text-sm font-semibold text-slate-700 "
                        colSpan={10}
                      >
                        هزینه بسته‌بندی
                      </td>
                      <td className="border border-slate-400 p-3 text-center text-sm font-bold text-amber-600">
                        {(() => {
                          const type = (orders as any)?.packagingType as
                            | "ECONOMIC"
                            | "IRON"
                            | "NOPACK"
                            | undefined;
                          const val =
                            type === "ECONOMIC"
                              ? 15000
                              : type === "IRON"
                                ? 30000
                                : 0;
                          return val.toLocaleString("fa-IR");
                        })()}
                      </td>
                    </tr>
                    {/* Wrapping row (if any) */}
                    {(orders as any)?.wrapping?.cost ? (
                      <tr className="bg-slate-100">
                        <td
                          className="border border-slate-400 p-3 text-left text-sm font-semibold text-slate-700"
                          colSpan={10}
                        >
                          هزینه کادوپیچی
                        </td>
                        <td className="border border-slate-400 p-3 text-center text-sm font-bold text-pink-600">
                          {Number((orders as any).wrapping.cost).toLocaleString(
                            "fa-IR"
                          )}
                        </td>
                      </tr>
                    ) : null}
                    {/* Shipping or Pickup row */}
                    <tr className="bg-slate-100">
                      <td
                        className="border border-slate-400 p-3 text-left text-sm font-semibold text-slate-700"
                        colSpan={10}
                      >
                        {orders?.deliveryType === "PICKUP_IN_STORE"
                          ? `تحویل حضوری - ${orders?.vendor?.title} (${orders?.vendor?.workTime})`
                          : `هزینه ارسال - ${orders?.shipping?.name}`}
                      </td>
                      <td className="border border-slate-400 p-3 text-center text-sm font-bold text-blue-600">
                        {orders?.deliveryType === "PICKUP_IN_STORE"
                          ? "۰"
                          : Number(orders?.shipping?.price ?? 0).toLocaleString(
                              "fa-IR"
                            )}
                      </td>
                    </tr>
                    <tr className="bg-gradient-to-r from-green-100 to-emerald-100 font-bold border-2 border-green-300">
                      <td
                        className="border border-green-400 p-4 text-left text-lg font-bold text-green-800"
                        colSpan={10}
                      >
                        جمع کل پس از کسر تخفیف (ریال)
                      </td>
                      <td className="border border-green-400 p-4 text-center text-lg font-bold text-green-800">
                        {grandTotal.toLocaleString("fa-IR")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Layout */}
              <div className="lg:hidden space-y-4 bg-red-300">
                {items.map((it: OrderItemType, idx: number) => {
                  const qty = it.quantity ?? 0;
                  const originalCandidate = Number(
                    (it as any)?.variant?.customerPrice ?? it.price ?? 0
                  );
                  const specialCandidateRaw = (it as any)?.variant
                    ?.customerSpecialPrice;
                  const specialCandidate = Number(
                    specialCandidateRaw ?? originalCandidate
                  );
                  const unitOriginal =
                    Number.isFinite(originalCandidate) && originalCandidate > 0
                      ? originalCandidate
                      : Number(it.price || 0);
                  const unitDiscounted =
                    Number.isFinite(specialCandidate) &&
                    specialCandidate > 0 &&
                    specialCandidate < unitOriginal
                      ? specialCandidate
                      : unitOriginal;
                  const rowTotalBeforeDiscount = unitOriginal * qty;
                  const rowTotalAfterDiscount = unitDiscounted * qty;
                  const rowTax = Math.round(rowTotalAfterDiscount * 0.1);
                  const productTitle = it.variant?.product?.title ?? "-";
                  const orgName = it.variant?.stock?.name ?? "-";

                  return (
                    <div
                      key={it.id ?? `${idx}`}
                      className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                          ردیف {idx + 1}
                        </span>
                        <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          {it.variantId ?? "-"}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-slate-800 mb-3 text-center">
                        {productTitle}
                      </h4>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">شرکت:</span>
                          <span className="font-semibold text-slate-800">
                            {orgName}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">رنگ:</span>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{
                                backgroundColor:
                                  (it as any)?.variant?.color?.color || "#gray",
                              }}
                            ></div>
                            <span className="font-semibold text-slate-800">
                              {(it as any)?.variant?.color?.mainColor || "-"}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">تعداد:</span>
                          <span className="font-bold text-blue-600">{qty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">قیمت واحد:</span>
                          <span className="font-semibold text-emerald-600">
                            {unitOriginal.toLocaleString("fa-IR")} ریال
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">قیمت کل:</span>
                          <span className="font-bold text-green-600">
                            {rowTotalAfterDiscount.toLocaleString("fa-IR")} ریال
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">مالیات:</span>
                          <span className="font-semibold text-orange-600">
                            {rowTax.toLocaleString("fa-IR")} ریال
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Mobile Summary */}
                <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-4 sm:p-6 shadow-lg">
                  <h4 className="text-lg font-bold text-slate-800 mb-4 text-center">
                    خلاصه سفارش
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">تعداد کل اقلام:</span>
                      <span className="font-bold text-blue-700">
                        {items.reduce(
                          (s: number, it: OrderItemType) =>
                            s + (it.quantity ?? 0),
                          0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">جمع اقلام:</span>
                      <span className="font-bold text-green-700">
                        {subtotal.toLocaleString("fa-IR")} ریال
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">هزینه بسته‌بندی:</span>
                      <span className="font-bold text-amber-600">
                        {(() => {
                          const type = (orders as any)?.packagingType as
                            | "ECONOMIC"
                            | "IRON"
                            | "NOPACK"
                            | undefined;
                          const val =
                            type === "ECONOMIC"
                              ? 15000
                              : type === "IRON"
                                ? 30000
                                : 0;
                          return val.toLocaleString("fa-IR");
                        })()}{" "}
                        ریال
                      </span>
                    </div>
                    {(orders as any)?.wrapping?.cost ? (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">هزینه کادوپیچی:</span>
                        <span className="font-bold text-pink-600">
                          {Number((orders as any).wrapping.cost).toLocaleString(
                            "fa-IR"
                          )}{" "}
                          ریال
                        </span>
                      </div>
                    ) : null}
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">هزینه ارسال:</span>
                      <span className="font-bold text-blue-600">
                        {orders?.deliveryType === "PICKUP_IN_STORE"
                          ? "۰"
                          : Number(orders?.shipping?.price ?? 0).toLocaleString(
                              "fa-IR"
                            )}{" "}
                        ریال
                      </span>
                    </div>
                    <div className="border-t-2 border-green-300 pt-3 mt-3">
                      <div className="flex justify-between text-lg font-bold text-green-800">
                        <span>جمع کل نهایی:</span>
                        <span>{grandTotal.toLocaleString("fa-IR")} ریال</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom Section - Signatures */}
            <div className="p-4 sm:p-6 lg:p-8 border-t-2 border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 min-h-[120px] flex flex-col justify-between">
                  <h4 className="text-slate-700 font-bold text-sm mb-4 text-center">
                    مهر و امضای فروشنده
                  </h4>
                  <div className="flex-1 border-t-2 border-dashed border-slate-300 mt-4"></div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 min-h-[120px] flex flex-col justify-between">
                  <h4 className="text-slate-700 font-bold text-sm mb-4 text-center">
                    تاریخ تحویل
                  </h4>
                  <div className="flex-1 border-t-2 border-dashed border-slate-300 mt-4"></div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 min-h-[120px] flex flex-col justify-between">
                  <h4 className="text-slate-700 font-bold text-sm mb-4 text-center">
                    ساعت تحویل
                  </h4>
                  <div className="flex-1 border-t-2 border-dashed border-slate-300 mt-4"></div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 min-h-[120px] flex flex-col justify-between">
                  <h4 className="text-slate-700 font-bold text-sm mb-4 text-center">
                    مهر و امضای خریدار
                  </h4>
                  <div className="flex-1 border-t-2 border-dashed border-slate-300 mt-4"></div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-8 text-center">
                <p className="text-xs text-slate-500 bg-slate-100 inline-block px-4 py-2 rounded-lg">
                  برگرفته از شتا 20{" "}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
