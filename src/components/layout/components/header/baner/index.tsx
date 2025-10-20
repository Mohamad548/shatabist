import { PageLevelLocalization } from "@/constants/localization";

const { home: homeLocalization } = PageLevelLocalization;
export default function Baner() {
  return (
    <div
      role="alert"
      className="flex items-center justify-center gap-2 px-4 py-3 text-yellow-800 bg-red-500 border-b border-yellow-200"
    >
      <span className="font-Bold lg:text-lg text-xs text-white">
        {homeLocalization.amazingDiscount}
      </span>
    </div>
  );
}
