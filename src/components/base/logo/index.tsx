import Image from "next/image";
import clsxm from "@/utils/clsxm";
import Link from "next/link";
import { routes } from "@/constants/routes";

interface LogoType {
  src: string;
  alt: string;
  className?: string;
  cardImageSize?: string;
}

export default function Logo({ src, alt, className, cardImageSize }: LogoType) {
  return (
    <Link href={routes.home} className={clsxm("relative", cardImageSize)}>
      <Image
        className=" rounded-lg"
                fill
    style={{ objectFit: "contain" }}
        alt={alt}
        quality={100}
        src={src}
      />
    </Link>
  );
}
