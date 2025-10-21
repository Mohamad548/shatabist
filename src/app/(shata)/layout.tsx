import AccessMenu from "@/layout/main-layout/access-menu/inedx";
import Footer from "@/layout/main-layout/footer";
import Header from "@/layout/main-layout/header";
import { Toaster } from "react-hot-toast";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="pb-20 md:pb-0">{children}</main>
      <Toaster position="top-center" reverseOrder={false} />
      <AccessMenu />
      <Footer />
    </>
  );
};

export default MainLayout;
