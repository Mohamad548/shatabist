import Compare from "@/components/app/compare/components";
import React from "react";

interface ComparePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ComparePage = ({ searchParams }: ComparePageProps) => {
  const productId = searchParams.product
    ? Array.isArray(searchParams.product)
      ? searchParams.product[0]
      : searchParams.product
    : undefined;

  return <Compare initialProductId={productId} />;
};

export default ComparePage;
