"use client";

import React from "react";
import CommentCard from "./comment-card";
import { useGetMyContent } from "@/components/app/profile-user/hooks";

const TabContentMyComments: React.FC = () => {
  const { data } = useGetMyContent();
  const { comments } = data || {};


  return (
    <div className="flex flex-col gap-8">
      {comments?.map((comment: any) => {
        // پیدا کردن تصویر thumbnail برای هر کامنت
        const thumbnailImage = comment.product.productImages.find(
          (image: any) => image.thumbnail
        );

        return (
          <div key={comment?.id}>
            <CommentCard
              content={comment?.content}
              rate={comment?.rate}
              createdAt={comment?.createdAt}
              commentImages={comment?.commment_images}
              productTitle={comment?.product?.title}
              productImage={thumbnailImage ? thumbnailImage?.url : ""}
              productLink={comment?.product?.slug}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TabContentMyComments;
