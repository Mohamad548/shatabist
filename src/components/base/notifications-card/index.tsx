import Image from 'next/image';
import React from 'react';
import Button from '../button';
import { MessagesModal } from '@/components/app/profile-user/components/base/profile-modals';

interface Broadcast {
  title: string;
  content: string;
  createdAt: string;
}

function NotificationsCard({ broadcast }: { broadcast: Broadcast }) {
  const { title, content, createdAt } = broadcast;

  // فرمت کردن تاریخ
  const timeAgo = new Date(createdAt).toLocaleDateString('fa-IR');

  return (
    <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-6 w-6">
            <Image
              src="/svg/profile/notification.svg"
              fill
              style={{ objectFit: 'contain' }}
              alt="Notification Icon"
              quality={100}
            />
          </div>
          <h3 className="font-bold text-base text-gray-800">{title}</h3>
        </div>
        <div className="flex items-center">
          <Button className="bg-red-400/30 py-1 px-2 rounded-md text-red-500">
            جدید
          </Button>
          <span className="text-gray-200 h-4 mx-3">|</span>
          <h3 className="font-regular text-sm text-gray-400 ">{timeAgo}</h3>
        </div>
      </div>
      <p className="font-regular text-gray-700 text-sm">{content}</p>
      <div className="flex justify-start items-center gap-2">
        <MessagesModal />
      </div>
    </div>
  );
}

export default NotificationsCard;
