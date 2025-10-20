import { useLikeDislikeComment } from '@/components/app/product/hooks';
import { SmallLoading } from '@/components/base/loading/SmallLoading';
import ManageModal from '@/components/base/modal';
import { BASE_URL } from '@/constants/url';
import { getTimeAgo } from '@/utils/time';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

type CommentImage = {
  id: number;
  imageUrl: string;
  commentId: number;
  createdAt: string;
};

interface CommentBoxProps {
  commentId: number;
  starNumber: number;
  name: string;
  title: string;
  description: string;
  date: string;
  likes: number;
  dislikes: number;
  comment_images?: CommentImage[];
  productId?: number;
}

const CommentBox: React.FC<CommentBoxProps> = ({
  commentId,
  starNumber,
  name,
  title,
  description,
  date,
  likes,
  dislikes,
  productId,
  comment_images = [],
}) => {
  const [pendingAction, setPendingAction] = useState<'like' | 'dislike' | null>(
    null
  );
  const { mutate: sendReaction } = useLikeDislikeComment(productId);
  const pathname = usePathname();
  const router = useRouter();
  const token = getCookie('token');
  const handleLike = () => {
    if (!token) {
      const redirectUrl = encodeURIComponent(pathname);
      router.push(`/login?redirect=${redirectUrl}`);
      return;
    }
    setPendingAction('like');
    sendReaction(
      { isLike: true, commentId },
      {
        onSettled: () => setPendingAction(null),
      }
    );
  };

  const handleDislike = () => {
    if (!token) {
      const redirectUrl = encodeURIComponent(pathname);
      router.push(`/login?redirect=${redirectUrl}`);
      return;
    }
    setPendingAction('dislike');
    sendReaction(
      { isLike: false, commentId },
      {
        onSettled: () => setPendingAction(null),
      }
    );
  };

  return (
    <div className="flex flex-1 border text-justify rounded-xl h-50 min-w-72 justify-start flex-col gap-4 items-stretchborder-gray-200 md:border-b-gray-200 md:border-transparent p-4">
      <div className="flex gap-3 =">
        <div className="flex justify-center gap-1 bg-warning-100 py-1 px-3 rounded-md">
          <span className="text-warning-500 text-sm">{starNumber}</span>
          <Image
            src="/svg/product/star.svg"
            alt="star"
            width={20}
            height={20}
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-xs whitespace-nowrap">
            {name}
          </span>
          <span className="text-gray-400 text-xl">|</span>
          <span className="text-gray-400 text-sm whitespace-nowrap">
            {getTimeAgo(date)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-Bold">{title}</h3>
        <p className="leading-8 line-clamp-3 text-sm max-h-32">{description}</p>
      </div>
      <ManageModal
        className="fixed inset-0 z-50"
        modalBodyClass="w-full h-auto absolute bottom-0"
        fadeIn=" animate-slideUp"
        fadeOut="animate-slideDown"
        cancelLabel={
          <div className="border border-gray-600 rounded-full p-1 w-6 h-6 text-gray-800 text-xs">
            ✕
          </div>
        }
        cancelBoxClass="absolute left-2 top-2"
        triggerContent={
          <div className="md:hidden text-sm text-primary-500">مشاهده بیشتر</div>
        }
      >
        <div className="flex gap-3 =">
          <div className="flex justify-center gap-1 bg-warning-100 py-1 px-3 rounded-md">
            <span className="text-warning-500 text-sm">{starNumber}</span>
            <Image
              src="/svg/product/star.svg"
              alt="star"
              width={20}
              height={20}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-xs whitespace-nowrap">
              {name}
            </span>
            <span className="text-gray-400 text-xl">|</span>
            <span className="text-gray-400 text-sm whitespace-nowrap">
              {getTimeAgo(date)}
            </span>
          </div>
        </div>
        <p className="leading-8">{description}</p>
        <div className="flex items-center justify-end md:justify-end gap-8">
          <div className="flex gap-1 items-center">
            <span className="text-red-500">{dislikes ?? '0'}</span>
            <div
              className="relative h-4 w-4 rounded-xl overflow-hidden cursor-pointer"
              onClick={handleDislike}
            >
              {pendingAction === 'dislike' ? (
                <SmallLoading />
              ) : (
                <Image
                  src="/svg/dislike.svg"
                           fill
    style={{ objectFit: "contain" }}
                  alt="Dislike"
                  quality={100}
                />
              )}
            </div>
          </div>

          <div className="flex gap-1 items-center">
            <div
              className="relative h-4 w-4 rounded-xl overflow-hidden cursor-pointer"
              onClick={handleLike}
            >
              {pendingAction === 'like' ? (
                <SmallLoading />
              ) : (
                <Image
                  src="/svg/like.svg"
                              fill
    style={{ objectFit: "contain" }}
                  alt="Like"
                  quality={100}
                />
              )}
            </div>
            <span className="text-primary-500">{likes ?? '0'}</span>
          </div>
        </div>
        <div className="justify-start">
          {comment_images.map((img) => (
            <div key={img.id} className="relative w-16 h-16 cursor-pointer">
              <Image
                src={`${BASE_URL}${img.imageUrl}`}
                alt={`comment-image-${img.id}`}
                fill
                style={{ objectFit: 'contain' }}
                quality={100}
              />
            </div>
          ))}
        </div>
      </ManageModal>
      <div className="flex items-center justify-start md:justify-end gap-8">
        <div className="flex gap-1 items-center">
          <span className="text-red-500">{dislikes ?? '0'}</span>
          <div
            className="relative h-4 w-4 rounded-xl overflow-hidden cursor-pointer"
            onClick={handleDislike}
          >
            {pendingAction === 'dislike' ? (
              <SmallLoading />
            ) : (
              <Image
                src="/svg/dislike.svg"
                fill
                style={{ objectFit: 'contain' }}
                alt="Dislike"
                quality={100}
              />
            )}
          </div>
        </div>

        <div className="flex gap-1 items-center">
          <div
            className="relative h-4 w-4 rounded-xl overflow-hidden cursor-pointer"
            onClick={handleLike}
          >
            {pendingAction === 'like' ? (
              <SmallLoading />
            ) : (
              <Image
                src="/svg/like.svg"
                fill
                style={{ objectFit: 'contain' }}
                alt="Like"
                quality={100}
              />
            )}
          </div>
          <span className="text-primary-500">{likes ?? '0'}</span>
        </div>
      </div>

      <div className="justify-start hidden md:flex">
        {comment_images.map((img) => (
          <div key={img.id} className="relative w-16 h-16 cursor-pointer">
            <Image
              src={`${BASE_URL}${img.imageUrl}`}
              alt={`comment-image-${img.id}`}
              fill
              style={{ objectFit: 'contain' }}
              quality={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
