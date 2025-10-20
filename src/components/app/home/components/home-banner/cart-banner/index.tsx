import clsxm from "@/utils/clsxm";
import Image from "next/image";
import Link from "next/link";

type CartBannerType = {
  title?: string;
  src: string;
  className?: string;
  link?: string | null;
  color?: string;
  priority?: boolean;
};

export default function CartBanner({ src, title, className, link, color, priority }: CartBannerType) {
  return (
    <Link
      href={link || '/'}
      className={clsxm('', className)}
      style={color ? { backgroundColor: color } : undefined}
    >
      <div className="relative w-full aspect-[700/265]">
        <Image
          src={src}
          alt={title || ''}
          fill
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          sizes="(max-width: 768px) 100vw, 700px"
          quality={100}
          priority={priority}
        />
      </div>
    </Link>
  );
}
