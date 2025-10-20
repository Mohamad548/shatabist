import { SetStateAction, useState, useEffect } from 'react';
import { useSearchResults } from './hooks';
import { useRouter } from 'next/navigation';
import Input from '@/components/base/input';
import { localization } from '@/constants/localization';
import Link from 'next/link';
import Image from 'next/image';
import { ProductCard } from '@/components/base/product-card';
import { ProductType } from '@/components/base/product-card/type';
import { calculateFinalPrice } from '@/utils/priceUtils';
import Button from '@/components/base/button';
import { BASE_URL } from '@/constants/url';
import ShataLoading from '@/components/base/loading/shata-loading';
import { getThumbnailImageUrl } from '@/utils/get-thumbnail-image-url';

type PreviousSearchProps = {
  searchTerm: string;
  closeModal?: () => void;
  onDelete?: (term: string) => void;
};

const PreviousSearch = ({
  searchTerm,
  closeModal,
  onDelete,
}: PreviousSearchProps) => {
  const handleDelete = () => {
    onDelete?.(searchTerm);
  };

  return (
    <div className="flex gap-4 border rounded-md py-1 px-2">
      <Link
        href={`/search/${searchTerm}`}
        className="flex items-center gap-2"
        onClick={closeModal}
      >
        <h3>{searchTerm}</h3>
      </Link>
      <div className="relative h-5 w-5 cursor-pointer" onClick={handleDelete}>
        <Image
          src="/svg/close-square1.svg"
          fill
          style={{ objectFit: 'contain' }}
          alt="delete"
          quality={100}
        />
      </div>
    </div>
  );
};

type SearchBoxProps = {
  closeModal?: () => void;
};

export default function SearchBox({ closeModal }: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [searchQueries, setSearchQueries] = useState<string[]>([]);
  const { data, isLoading, error } = useSearchResults(query);
  const router = useRouter();

  const products: ProductType[] = data ?? [];
  const partner = false;

  // بارگذاری جستجوهای پیشین از localStorage
  useEffect(() => {
    const storedQueries = JSON.parse(
      localStorage.getItem('searchQueries') || '[]'
    );
    setSearchQueries(storedQueries);
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.length >= 3) {
      router.push(`/search/${searchQuery}`);
    }
  };

  const handleSaveSearchQuery = (searchQuery: string) => {
    const storedQueries: string[] = JSON.parse(
      localStorage.getItem('searchQueries') || '[]'
    );

    const alreadyExists = storedQueries.includes(searchQuery);
    if (!alreadyExists) {
      const updatedQueries = [...storedQueries, searchQuery];
      localStorage.setItem('searchQueries', JSON.stringify(updatedQueries));
      setSearchQueries(updatedQueries);
    }
  };

  return (
    <div className="relative w-full md:mr-20 overflow-scroll col-span-2 hidden-scrollbar">
      <Input
        placeholder={localization.search}
        iconSrc="/svg/search-normal.svg"
        inputClassName="md:flex py-2 rounded-xl pr-10 pl-4 w-full bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors duration-200"
        iconClass="bottom-3 block mr-1"
        parentClassName="relative w-11/12 md:w-full"
        onChange={(e: { target: { value: SetStateAction<string> } }) => {
          setQuery(e.target.value);
        }}
        value={query}
        onKeyDown={(e: { key: string }) => {
          if (e.key === 'Enter') {
            handleSearch(query);
            handleSaveSearchQuery(query);
            closeModal?.();
          }
        }}
        autoFocus
      />

      {isLoading && (
        <ShataLoading
          size="medium"
          showText={true}
          text="در حال بارگذاری محصولات..."
        />
      )}

      {error && <p className="text-red-500 mt-2">خطا در دریافت داده‌ها</p>}

      {products.length > 0 ? (
        <ul className="z-10 w-full bg-white mt-1 flex flex-col md:flex-row gap-5 md:overflow-x-auto p-2">
          {products.map((product) => {
            const { finalPrice, discountText, initialPrice } =
              calculateFinalPrice(product?.productVariants ?? [], partner);
            const imageUrl = getThumbnailImageUrl(product?.productImages);

            return (
              <li key={product.id} className="flex-shrink-0 md:max-w-64 w-full">
                <ProductCard
                  initialPrice={initialPrice}
                  imageSrc={imageUrl || '/images/Products/default-product.webp'}
                  price={finalPrice}
                  discount={discountText}
                  name={product.title}
                  slug={product.slug}
                  withLink={true}
                  description={product.short_description}
                  classNameCard="p-4 md:flex md:flex-col min-w-20 md:gap-3 hover:shadow-emerald grid gap-x-4 grid-cols-4 grid-rows-2 border-b md:border-b-0"
                  cardImageSize="w-24 h-24 md:w-60 md:h-52"
                  onClick={() => {
                    handleSaveSearchQuery(query);
                    closeModal?.();
                  }}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        !isLoading && <p className="mt-5">محصولی برای نمایش یافت نشد.</p>
      )}

      <div className="mt-8">
        <h3>بیشترین جستجو ها</h3>
        <div className="flex gap-4 mt-4 cursor-pointer overflow-scroll hidden-scrollbar">
          {[
            'گوشی موبایل اپل',
            'گوشی موبایل سامسونگ',
            'گوشی موبایل شیائومی',
            'گوشی موبایل آنر',
          ].map((term) => (
            <Link
              key={term}
              href={`/pcat/mobile-phone/${term.split(' ').pop()}`}
              className="border rounded-md py-1 px-2 whitespace-nowrap"
              onClick={closeModal}
            >
              {term}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex gap-6">
          <h3>جستجو های پیشین</h3>
          <h3
            className="text-red-400 font-regular text-sm cursor-pointer"
            onClick={() => {
              localStorage.removeItem('searchQueries');
              setSearchQueries([]);
            }}
          >
            حذف همه
          </h3>
        </div>
        <div className="flex gap-4 mt-4 cursor-pointer">
          {searchQueries.length ? (
            searchQueries.map((searchTerm, index) => (
              <PreviousSearch
                key={index}
                searchTerm={searchTerm}
                closeModal={closeModal}
                onDelete={(term) => {
                  const updated = searchQueries.filter((q) => q !== term);
                  setSearchQueries(updated);
                  localStorage.setItem(
                    'searchQueries',
                    JSON.stringify(updated)
                  );
                }}
              />
            ))
          ) : (
            <p>هیچ جستجویی یافت نشد.</p>
          )}
        </div>
      </div>

      <Button
        className="py-3 w-11/12 rounded-md m-3 md:hidden bg-emerald-500 text-white text-base font-Bold fixed bottom-0 mx-auto"
        onClick={() => {
          handleSearch(query);
          handleSaveSearchQuery(query);
          closeModal?.();
        }}
      >
        جستجو
      </Button>
    </div>
  );
}
