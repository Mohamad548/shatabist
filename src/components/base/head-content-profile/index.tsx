'use client';
import clsxm from '@/utils/clsxm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type HeadContentProfileProps = {
  imageClassName?: string;
  HeadTapClass?: string;
  children: ReactNode;
};

const HeadContentProfile = ({
  imageClassName,
  HeadTapClass,
  children,
}: HeadContentProfileProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    // صفحه را به بالا اسکرول نمی‌کنیم تا SSR-safe باشد، فقط مسیر را تغییر می‌دهیم
    router.push('/profile-user');
  };

  return (
    <div className={HeadTapClass}>
      <div
        className={clsxm(
          'relative w-6 h-6 cursor-pointer md:hidden',
          imageClassName
        )}
        onClick={handleBackClick} // فراخوانی تابع بازگشت در اینجا
      >
        <Image
          src="/svg/arrow-right.svg"
          fill
          style={{ objectFit: 'contain' }}
          alt="back"
          quality={100}
        />
      </div>
      {children}
    </div>
  );
};

export default HeadContentProfile;
