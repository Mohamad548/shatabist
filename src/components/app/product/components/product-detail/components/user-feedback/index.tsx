import { useLikeDislikeComment } from "@/components/app/product/hooks";
import { SmallLoading } from "@/components/base/loading/SmallLoading";
import clsxm from "@/utils/clsxm";
import Image from "next/image";
import React, { useState } from "react";
interface UserFeedbackProps {
  userName: string;
  date: string;
  description: string;
  rating: number;
  likes: number;
  dislikes: number;
  commentTitle: string;
  opacity?: boolean; // optional prop to control the visibility of the feedback block
  commentId?: number | undefined;
  productId?: number;
}
function UserFeedback({
  userName,
  date,
  description,
  rating,
  likes,
  commentTitle,
  dislikes,
  opacity,
  commentId,
  productId,
}: UserFeedbackProps) {
  const [pendingAction, setPendingAction] = useState<"like" | "dislike" | null>(
    null,
  );

  const { mutate: sendReaction } = useLikeDislikeComment(productId);

  const handleLike = () => {
    if (!commentId) return; // چک کردن وجود commentId
    setPendingAction("like");
    sendReaction(
      { isLike: true, commentId },
      {
        onSettled: () => setPendingAction(null),
      },
    );
  };

  const handleDislike = () => {
    if (!commentId) return; // چک کردن وجود commentId
    setPendingAction("dislike");
    sendReaction(
      { isLike: false, commentId, },
      {
        onSettled: () => setPendingAction(null),
      },
    );
  };

  return (
    <div
      className={clsxm(
        "flex absolute transition-all duration-500 -bottom-[10%] z-10 left-0 right-0 flex-col gap-5 md:ml-20  md:static flex-1 md:h-[500px]   pb-14 text-white bg-black/80 pt-4 px-4 rounded-md",
        opacity
          ? " opacity-0 pointer-events-none md:opacity-100"
          : "md:opacity-100",
      )}
    >
      <div className="flex select-none items-center gap-4">
        <div className="flex items-center bg-warning-100 px-1 rounded-md">
          <h3 className="text-warning-500 font-regular text-sm pt-1">
            {rating}
          </h3>
          <div className="relative h-4 w-4 rounded-xl overflow-hidden">
            <Image
              src="/svg/star.svg"
                     fill
    style={{ objectFit: "contain" }}
              alt="Rating Star"
              quality={100}
            />
          </div>
        </div>
        <h3 className="font-regular text-sm">{userName}</h3>
        <span>|</span>
        <h3 className="font-light text-sm">{date}</h3>
      </div>
      <h3 className="font-semibold select-none text-base"> {commentTitle} </h3>
      <div className="custom-scrollbar-container">
        <p className="text-sm select-none text-justify custom-scrollbar px-2 rounded-md">
          {description}{" "}
        </p>
      </div>
      <div className="flex justify-end gap-5 absolute bottom-5 left-5 md:left-24   w-full y-16">
        <div className="flex items-center gap-2 cursor-pointer px-1 rounded-md">
          <h3 className="font-regular text-sm pt-1">{dislikes}</h3>
          <div
            onClick={handleDislike}
            className="relative h-6 w-6 rounded-xl overflow-hidden"
          >
            {pendingAction === "dislike" ? (
              <SmallLoading />
            ) : (
              <Image
                src="/svg/dislike-white.svg"
                        fill
    style={{ objectFit: "contain" }}
                alt="Dislike"
                quality={100}
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 cursor-pointer px-1 rounded-md">
          <div
            className="relative h-6 w-6 rounded-xl overflow-hidden"
            onClick={handleLike}
          >
            {pendingAction === "like" ? (
              <SmallLoading />
            ) : (
              <Image
                src="/svg/like-white.svg"
                 fill
    style={{ objectFit: "contain" }}
                alt="Like"
                quality={100}
              />
            )}
          </div>
          <h3 className="font-regular text-sm pt-1">{likes}</h3>
        </div>
      </div>
    </div>
  );
}

export default UserFeedback;
