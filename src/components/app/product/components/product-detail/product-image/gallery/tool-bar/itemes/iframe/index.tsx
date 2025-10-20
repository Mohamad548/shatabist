'use client';
import ManageModal from '@/components/base/modal';
import clsxm from '@/utils/clsxm';
import Image from 'next/image';

export default function Iframe({
  iframe,
  className,
}: {
  iframe?: string;
  className?: string;
}) {
  return (
    <li className="border-b md:border-b-0 md:rounded-lg md:bg-gray-100 md:hover:bg-gray-200 cursor-pointer">
      <ManageModal
        triggerContent={
          <div className="flex gap-2 items-center">
            <div className="relative h-11 w-11">
              <Image
                className="p-2.5"
                src="/svg/play.svg"
                fill
                style={{ objectFit: 'contain' }}
                alt="مشاهده ویدیو"
                quality={100}
              />
            </div>
            <p className="text-sm md:hidden text-gray-700 p-2">مشاهده ویدیو</p>
          </div>
        }
        actionBtnClass="w-full"
        requireAuth={true}
        modalBodyClass={clsxm('w-full md:w-auto', className)}
        fadeIn="animate-slideUp"
        fadeOut="animate-slideDown"
        className="inset-0 z-50 absolute md:fixed top-[-200%] md:top-0 items-end md:items-center"
      >
        {iframe ? (
          <div className="w-[90vw] md:w-[70vw] max-w-4xl rounded-lg overflow-hidden shadow-2xl">
            <div dangerouslySetInnerHTML={{ __html: iframe }} />
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-sm text-gray-700">کلیک موجود نیست</p>
          </div>
        )}
      </ManageModal>
    </li>
  );
}
