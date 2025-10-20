import React from "react";
import BlogCard, { BlogCardsItem } from "../blogCard";
function AllBlogCards({ BlogCardsInfo }: { BlogCardsInfo: BlogCardsItem[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      {BlogCardsInfo?.map((item: BlogCardsItem) => {
        return (
          <BlogCard
            key={item.id}
            id={item.id}
            thumbnail={item.thumbnail}
            title={item.title}
            subject={item.subject}
            description={item.description}
            createdAt={item.createdAt}
          />
        );
      })}
    </div>
  );
}

export default AllBlogCards;
