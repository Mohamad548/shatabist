import clsxm from '@/utils/clsxm';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
type statusOrdersType = {
  className?: string;
};
function StatusOrders({ className }: statusOrdersType) {
  return (
    <div className={clsxm('w-full flex flex-col gap-9 md:hidden', className)}>
      <div className="w-full border border-gray-200 rounded-md p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <div className=" relative w-14 h-14">
            <Image
              src="/svg/profile/Frame20.svg"
              fill
              style={{ objectFit: 'contain' }}
              alt=""
              quality={100}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-base text-gray-800">
              سفارش جاری
            </h3>
            <h4 className="font-Medium text-sm text-gray-500">2 سفارش</h4>
          </div>
        </div>
        <Link href="/" className=" relative w-8 h-8">
          <Image
            src="/svg/profile/Button1.svg"
                      fill
    style={{ objectFit: "contain" }}
            alt=""
            quality={100}
          />
        </Link>
      </div>
      <div className="w-full border  border-gray-200 rounded-md p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <div className=" relative w-14 h-14">
            <Image
              src="/svg/profile/Frame21.svg"
              fill
              style={{ objectFit: 'contain' }}
              alt=""
              quality={100}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-base text-gray-800">
              سفارش تحویل شده
            </h3>
            <h4 className="font-Medium text-sm text-gray-500">18 سفارش</h4>
          </div>
        </div>
        <Link href="/" className=" relative w-8 h-8">
          <Image
            src="/svg/profile/Button1.svg"
                      fill
    style={{ objectFit: "contain" }}
            alt=""
            quality={100}
          />
        </Link>
      </div>
    </div>
  );
}

export default StatusOrders;
