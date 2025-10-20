import { ProductType } from "@/components/base/product-card/type";
import IconSize from "@/constants/icon-size";
import Image from "next/image";
import Link from "next/link";
interface IProps {
  product: ProductType;
}
export default function ProductHeader({ product }: IProps) {
  return (
    <div className="flex mt-6 gap-4 items-center whitespace-nowrap overflow-scroll hidden-scrollbar text-gray-400 font-regular text-sm ">
<Link href="/" className=" relative w-6 h-6 flex-shrink-0">
  <Image
    src="/svg/product/home-2.svg"
    alt="home"
             fill
    style={{ objectFit: "contain" }}
    quality={100}
  />
</Link>
      <Image
        src="/svg/product/arrow-left.svg"
        alt="home"
        width={8}
        height={8}
      />
      {product?.category?.parent?.parent?.slug && (
        <>
          <Link href={`/pcat/${product?.category?.parent?.parent?.slug}`}>
            {product?.category?.parent?.parent?.title}
          </Link>

          <Image
            src="/svg/product/arrow-left.svg"
            alt="home"
            width={8}
            height={8}
          />
        </>
      )}
      <Link 
        href={`/pcat/${product?.category?.parent?.parent?.slug}/${product?.category?.parent?.slug}`}
      >
        {product?.category?.parent?.title}
      </Link>
      <Image
        src="/svg/product/arrow-left.svg"
        alt="home"
        width={8}
        height={8}
      />
      <Link
        href={`/pcat/${product?.category?.parent?.parent?.slug}/${product?.category?.parent?.slug}/${product?.category?.slug}`}
      >
        {product?.category?.title}
      </Link>
    </div>
  );
}
