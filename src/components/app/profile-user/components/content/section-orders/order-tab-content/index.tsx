"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/base/button";
import { useGetOrders } from "@/components/app/profile-user/hooks";
import { Order } from "@/types/types";
import { getTimeAgo } from "@/utils/time";
import { BASE_URL } from "@/constants/url";
import ShataLoading from "@/components/base/loading/shata-loading";
import { toLocalTimeString } from "@/utils/toLocalDate";
import clsxm from "@/utils/clsxm";

// Status configuration with colors and labels
const STATUS_CONFIG = {
  PENDING: {
    label: "جاری",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    emptyMessage: "هیچ سفارشی در حال پردازش نیست.",
  },
  COMPLETED: {
    label: "تکمیل شده",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    emptyMessage: "هیچ سفارشی تکمیل نشده است.",
  },
  CANCELLED: {
    label: "لغو شده",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    emptyMessage: "هیچ سفارشی لغو نشده است.",
  },
  REFUNDED: {
    label: "مرجوع شده",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
    emptyMessage: "هیچ سفارشی مرجوع نشده است.",
  },
} as const;

// InProgress status configuration for PENDING orders
const IN_PROGRESS_STATUS_CONFIG = {
  PAYMENT: {
    label: "درانتظارپرداخت",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
  },
  WRAPPING: {
    label: "بسته‌بندی‌شده",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  DELIVERED_TO_SHIPPING: {
    label: "ارسال‌شده",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
} as const;

// Default processing status for PENDING orders without inProgressStatus
const PROCESSING_STATUS_CONFIG = {
  label: "در حال پردازش",
  bgColor: "bg-amber-50",
  textColor: "text-red-700",
  borderColor: "border-amber-200",
};



interface OrderTabContentProps {
  status: keyof typeof STATUS_CONFIG;
}

const OrderTabContent: React.FC<OrderTabContentProps> = ({ status }) => {
  const { data, isPending } = useGetOrders(status);
  const statusConfig = STATUS_CONFIG[status];
  // console.log(data);

  // Loading state
  if (isPending) {
    return (
      <div className="flex justify-center items-center py-12">
        <ShataLoading size="medium" text="در حال بارگذاری..." />
      </div>
    );
  }

  // Empty state
  if (!data?.orders || data.orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 mb-6 opacity-20">
          <Image
            src="/svg/checkout/empty-cart.svg"
            width={96}
            height={96}
            alt="خالی"
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-gray-500 text-lg font-medium">
          {statusConfig.emptyMessage}
        </h3>
      </div>
    );
  }

  // Sort orders by date (newest first)
  const sortedOrders = [...data.orders].sort(
    (a: Order, b: Order) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedOrders.map((order: Order) => (
        <OrderCard key={order.id} order={order} statusConfig={statusConfig} />
      ))}
    </div>
  );
};

// Individual Order Card Component
interface OrderCardProps {
  order: Order;
  statusConfig: (typeof STATUS_CONFIG)[keyof typeof STATUS_CONFIG];
}

const OrderCard: React.FC<OrderCardProps> = ({ order, statusConfig }) => {
  // Determine the display configuration based on order status and inProgressStatus
  const getDisplayConfig = () => {
    if (order.status === "PENDING") {
      if (
        order.inProgressStatus &&
        IN_PROGRESS_STATUS_CONFIG[
          order.inProgressStatus as keyof typeof IN_PROGRESS_STATUS_CONFIG
        ]
      ) {
        return IN_PROGRESS_STATUS_CONFIG[
          order.inProgressStatus as keyof typeof IN_PROGRESS_STATUS_CONFIG
        ];
      } else {
        return PROCESSING_STATUS_CONFIG;
      }
    }
    return statusConfig;
  };

  const displayConfig = getDisplayConfig();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Order Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex lg:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span
              className={clsxm(
                "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-Bold border w-fit",
                displayConfig.bgColor,
                displayConfig.textColor,
                displayConfig.borderColor
              )}
            >
              {displayConfig.label}
            </span>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="text-xs md:text-sm font-medium">
                  شماره سفارش:
                </span>
                <span className="">{order.id}</span>
              </span>
              <span className=" text-gray-300">•</span>
              <span>
                {new Date(order.created_at).toLocaleDateString("fa-IR")}
              </span>
              <span className="hidden sm:inline text-gray-300">•</span>
              {/* <span>{toLocalTimeString(order.created_at)}</span> */}
            </div>
          </div>

          <div className="flex flex-col justify-start text-left">
            <p className="text-sm md:text-base text-gray-500">مبلغ سفارش</p>
            <p className="text-sm md:text-lg font-semibold text-gray-900">
              {(order.totalPrice / 10)?.toLocaleString()}
              <span className="text-sm font-normal text-gray-500 mr-1">
                تومانء
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 ">
        <div className="flex gap-3 overflow-x-auto pb-2 mb-6 hidden-scrollbar">
          {order.orderItems.map((item) => {
            const imageUrl = item.variant.image
              ? `${BASE_URL}${item.variant.image}`
              : "/images/Products/default-product.webp";

            return (
              <Link
                key={item.id}
                // href={`/p/${item.variant.product.slug}`}
                href={`/profile-user/orders/${order.id}`}
                className="flex-shrink-0 group"
              >
                <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden border border-gray-200 group-hover:border-gray-300 transition-colors">
                  <Image
                    src={imageUrl}
                    fill
                    className="object-contain p-2"
                    alt={item.variant.product.title || "محصول"}
                    quality={100}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 pt-4 border-t border-gray-100">
          {/* <Link
            href={`/profile/orders/invoice/${order.id}`}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <div className="w-5 h-5">
              <Image
                src="/svg/profile/receipt-item.svg"
                width={20}
                height={20}
                alt="فاکتور"
                className="w-full h-full"
              />
            </div>
            <span className="font-medium">دریافت فاکتور</span>
          </Link> */}

          <Link href={`/profile-user/orders/${order.id}`}>
            <Button className=" text-xs md:text-sm bg-emerald-500 hover:bg-emerald-600  text-white border border-emerald-500 hover:border-emerald-600 font-medium px-6 py-2.5 rounded-lg transition-all duration-200">
              جزئیات سفارش
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTabContent;
