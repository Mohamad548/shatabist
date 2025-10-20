import SingleProduct from "@/components/app/product/components";
import type { Metadata } from "next";

export default function SingleProductPage({
  params,
}: {
  params: { slug: string };
}) {
  return <SingleProduct params={params} />;
}

// Metadata داینامیک برای SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const productSlug = params.slug;

  return {
    title: `${productSlug} | شرکت شتا۲۰`,
    description: `مشاهده جزئیات محصول "${productSlug}" در فروشگاه اینترنتی شرکت شتا۲۰. خرید آنلاین با بهترین قیمت و ارسال سریع.`,
  };
}
