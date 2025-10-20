import Sidebar from "@/components/app/profile-user/components/side-bar";
import AccessMenu from "@/layout/main-layout/access-menu/inedx";
import Footer from "@/layout/main-layout/footer";
import Header from "@/layout/main-layout/header";
import clsxm from "@/utils/clsxm";
import { ReactNode } from "react";
const ProfileUser = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="flex md:mt-10 md:mx-20 lg:mx-40 pb-20 md:pb-0">
        <Sidebar vipUser={true} className={clsxm("hidden md:block ")} />
        <div className=" md:mr-6 w-full md:w-3/5  lg:w-2/3">{children}</div>
        <AccessMenu />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ProfileUser;
