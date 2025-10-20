import IconSize from "@/constants/icon-size";
import { MenuItem } from "@/constants/mock-data/navbar";
import clsxm from "@/utils/clsxm";
import Image from "next/image";
import Link from "next/link";

export default function MenuItems() {
  return (
    <>
      {MenuItem.map((menu, index) => {
        return (
          <Link
            href={menu.link}
            key={index}
            className={clsxm("font-medium md:flex gap-2 pt-1 hidden ")}
          >
            {!!menu.src && (
              <Image
                src={menu.src}
                width={IconSize.lg}
                height={IconSize.lg}
                alt="menu"
              />
            )}
            <div>
              <div>{menu.name}</div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
