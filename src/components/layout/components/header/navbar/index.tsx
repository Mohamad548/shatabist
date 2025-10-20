import LogoSearch from "@/components/layout/components/header/navbar/logo-search";
import NavItems from "@/components/layout/components/header/navbar/nav-items";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import IconSize from "@/constants/icon-size";

const HeaderIcons = dynamic(
  () => import("@/components/layout/components/header/navbar/icons"),
  { ssr: false }
);

export default function Navbar() {
  return (
    <div>
      <div className=" mt-4 md:mt-2 mx-4 flex justify-between gap-8 lg:mx-20 rounded-xl px-5 py-3 md:rounded-none md:shadow-none shadow-[0_5px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05),0_-5px_15px_-3px_rgba(0,0,0,0.1),0_-4px_6px_-2px_rgba(0,0,0,0.05)]">
        <LogoSearch />


        <div className="flex items-center gap-5">
          <HeaderIcons />
          <Link className="flex md:hidden" href="/profile-user">
            <Image
              src="/svg/user-octagon.svg"
              width={IconSize.lg}
              height={IconSize.lg}
              alt="user-octagon"
            />
          </Link>
        </div>
      </div>
      <div className="flex justify-between lg:mx-20 md:mx-5 mt-5 items-center">
        <NavItems />
        <Link
          href="tel:02144303030"
          className="hidden md:flex gap-5 text-emerald-500 bg-emerald-100/50 max-w-fit p-2 rounded-xl md:text-sm"
        >
          <div className="flex flex-col ">
            <div className="flex gap-2 justify-start">
              <span className="text-lg font-extrabold">44303030</span>
              <span className="text-lg">021</span>
            </div>
            <p className="text-sm">نیاز به مشاوره دارید؟</p>
          </div>
<Image
  src="/svg/frame.svg"
  alt="location"
  width={20}
  height={20}
  className="w-8 h-auto" // فقط width تغییر کرده، height روی auto برای حفظ نسبت
/>
        </Link>
      </div>
    </div>
  );
}
