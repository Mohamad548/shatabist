import Baner from "@/components/layout/components/header/baner";
import Navbar from "@/components/layout/components/header/navbar";

export default function HeaderLayout() {
  const isHaveBaner = true;
  return (
    <div>
      <div>{isHaveBaner && <Baner />}</div>
      <div className="shadow-sm pb-0 md:pb-3">
        <Navbar />
      </div>
    </div>
  );
}
