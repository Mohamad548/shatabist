'use client';
import Image from 'next/image';
import React from 'react';
import NotificationsCard from '@/components/base/notifications-card';
import HeadContentProfile from '@/components/base/head-content-profile';
import { useUserNotifications } from '../../../hooks';
import ShataLoading from '@/components/base/loading/shata-loading';

// تایپ داده‌های broadcast
interface Broadcast {
  id: number;
  title: string;
  broadCastType: string;
  adminId: number;
  content: string;
  createdAt: string;
  updatedAt: string | null;
}

function Notifications() {
  const { data, isPending } = useUserNotifications();

  return (
    <div className="border rounded-md border-gray-200 p-6 absolute bg-white top-44 bottom-0 right-0 left-0 md:static">
      <HeadContentProfile HeadTapClass="flex gap-2" imageClassName="md:hidden">
        <div className="flex justify-between w-full">
          <h3 className="font-bold text-base text-gray-800">اعلانات</h3>
          <div className="flex gap-2 cursor-pointer">
            <div className="relative w-5 h-5">
              <Image
                src="/svg/profile/notification.svg"
                fill
                style={{ objectFit: 'contain' }}
                alt="Notification Icon"
                quality={100}
              />
            </div>
            <h3 className="font-medium text-sm text-primary-500">
              تغییر همه به مطالعه شده
            </h3>
          </div>
        </div>
      </HeadContentProfile>

      {/* بررسی وضعیت بارگذاری */}
      {isPending ? (
        <ShataLoading
          size="medium"
          showText={true}
          text="در حال بارگذاری اعلانات..."
        />
      ) : (
        data?.broadCasts?.map((broadcast: Broadcast) => (
          <NotificationsCard key={broadcast.id} broadcast={broadcast} />
        ))
      )}
    </div>
  );
}

export default Notifications;
