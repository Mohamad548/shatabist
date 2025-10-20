import Image from "next/image";
import React from "react";
import Button from "../button";
import ManageModal from "../modal";
import { DeleteListModal } from "@/components/app/profile-user/components/base/profile-modals";
import { useRouter } from "next/navigation";

export interface WishlistCardProps {
  list: {
    id: number;
    title: string;
    productPurchaseList: {
      id: number;
      variant: {
        product: {
          title: string;
        };
        quantity: number;
      };
    }[];
  };
}

const WishlistCard: React.FC<WishlistCardProps> = ({ list }) => {
  const router = useRouter();
  const productCount = list.productPurchaseList.length;
  console.log(list);

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-4 md:p-5 hover:border-emerald-300 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Left Section - List Info */}
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          {/* Icon */}
          <div className="relative flex-shrink-0 h-12 w-12 md:h-14 md:w-14 bg-emerald-50 rounded-xl p-2.5 md:p-3 group-hover:bg-emerald-100 transition-colors duration-300">
            <Image
              src="/svg/profile/Frame122.svg"
              fill
              className="object-contain"
              alt="List Icon"
              quality={100}
            />
          </div>

          {/* List Details */}
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <h3 className="text-sm md:text-base font-Bold text-gray-800 truncate mb-1 group-hover:text-emerald-700 transition-colors duration-300">
              {list.title}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500 font-Medium">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-[10px] md:text-xs font-Bold text-gray-600">
                  {productCount}
                </span>
                <span>{productCount === 1 ? "محصول" : "محصول"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex gap-2 md:gap-3 items-center justify-end sm:justify-start">
          <DeleteListModal
            list={{ id: list.id.toString(), title: list.title }}
          />
          <Button
            onClick={() => {
              router.push(`/profile-user/my-list-products/${list.id}`);
            }}
            className="text-xs md:text-sm font-Bold rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 px-4 md:px-5 whitespace-nowrap transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
          >
            <span className="hidden sm:inline">مشاهده محصولات</span>
            <span className="sm:hidden">مشاهده</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
