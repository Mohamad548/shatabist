'use client';

import Image from 'next/image';
import { SmallLoading } from '@/components/base/loading/SmallLoading';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import {
  useAddToFavorites,
  useDeleteUserFavorite,
  useUserFavorite,
} from '@/components/app/profile-user/hooks';
import { useColorStore } from '@/stores/colorStore';
import clsxm from '@/utils/clsxm';

export default function FavoriteButton({ className }: { className?: string }) {
  const { selectedVariantId } = useColorStore();
  const { data } = useUserFavorite();
  const { mutate: deleteFavorite, isPending: isPendingDelete } =
    useDeleteUserFavorite();
  const { mutate: addToFavorites, isPending: isPendingAdd } =
    useAddToFavorites();

  const pathname = usePathname();
  const router = useRouter();
  const token = getCookie('token');

  const isLoadingFavorite = isPendingAdd || isPendingDelete;

  const toggleFavorite = () => {
    if (!token) {
      const redirectUrl = encodeURIComponent(pathname);
      router.push(`/login?redirect=${redirectUrl}`);
      return;
    }

    const isFavorite = data?.userFavorites?.some(
      (fav: { variantId: number }) => fav.variantId === selectedVariantId
    );

    if (isFavorite) {
      deleteFavorite(selectedVariantId);
    } else {
      addToFavorites(selectedVariantId);
    }
  };

  const isFavorite = data?.userFavorites?.some(
    (fav: { variantId: number }) => fav.variantId === selectedVariantId
  );

  return (
    <div
      className={clsxm(
        'relative h-11 w-11 cursor-pointer md:bg-gray-100 md:hover:bg-gray-200',
        className
      )}
      onClick={toggleFavorite}
    >
      {isLoadingFavorite ? (
        <div className="flex items-center justify-center h-full">
          <SmallLoading />
        </div>
      ) : (
        <Image
          className="p-3"
          src={isFavorite ? '/svg/heartRed.svg' : '/svg/heart.svg'}
          fill
          style={{ objectFit: 'contain' }}
          alt="علاقه‌مندی"
          quality={100}
        />
      )}
    </div>
  );
}
