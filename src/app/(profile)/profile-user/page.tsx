import Dashboard from '@/components/app/profile-user/components/content/section-dashboard';

import clsxm from '@/utils/clsxm';
import SideBar from '@/components/app/profile-user/components/side-bar';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'داشبورد | شرکت شتا۲۰',
  description: 'پنل کاربری شما در شتا۲۰ برای مدیریت سفارش‌ها و اطلاعات شخصی.',
};
const DashboardPage = () => {
  return (
    <div className="flex flex-col">
      <SideBar className={clsxm('md:hidden block')} vipUser={true} />
      <Dashboard vipUser={true} />
    </div>
  );
};

export default DashboardPage;
