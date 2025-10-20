"use client";

import { useGetMyContent } from "@/components/app/profile-user/hooks";
import React from "react";
import ContentPendingCard from "./content-pending-card";

const TabContentPending: React.FC = () => {
  const { data } = useGetMyContent();
  const { comments } = data || {};

  return (
    <div className="flex flex-col gap-4">
      {comments?.map((comment: any) => {
        const product = comment.product;
        const thumbnailImage = product.productImages.find(
          (image: any) => image.thumbnail === true,
        );

        return (
          <ContentPendingCard
            key={comment.id}
            title={product.title}
            imageUrl={thumbnailImage?.url || ""}
          />
        );
      })}
    </div>
  );
};

export default TabContentPending;
