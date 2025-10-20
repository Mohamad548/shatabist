import Button from '@/components/base/button';
import ManageModal from '@/components/base/modal';
import Image from 'next/image';
import Link from 'next/link';
import AddToList from './itemes/add-to-list';
import ShareProduct from './itemes/share-product';
import FavoriteButton from './itemes/favorite-button';
import { useColorStore } from '@/stores/colorStore';
import { useStore } from '@/stores/useFavoriteItemStore';
import { useAddToPurchaseList } from '@/components/app/profile-user/hooks';
import AddToListButton from './itemes/add-to-list';
import Iframe from './itemes/iframe';

interface AddToPurchaseListParams {
  listId: number;
  variantId: number;
}

interface ToolBarItem {
  id: number;
  src: string;
  content: string;
  href?: string;
}

export const toolsBar: ToolBarItem[] = [
  {
    id: 3,
    src: '/svg/check.svg',
    content: 'مقایسه با محصولات مشابه',
    href: '/compare',
  },
  { id: 4, src: '/svg/chart.svg', content: 'نمودار فروش' },
];

function ToolsBar({
  productId,
  iframe,
}: {
  productId?: number;
  iframe?: string | null;
}) {
  const { selectedItem } = useStore();
  const { selectedVariantId } = useColorStore();
  const { mutate: addToPurchaseList } = useAddToPurchaseList();

  // Generate compare link with product ID
  const compareLink = productId ? `/compare?product=${productId}` : '/compare';

  const handleConfirm = (closeModal: () => void) => {
    if (!selectedVariantId || selectedItem === null) return;

    const dataList: AddToPurchaseListParams = {
      listId: selectedItem,
      variantId: selectedVariantId,
    };

    addToPurchaseList(dataList, {
      onSuccess: () => closeModal(),
    });
  };

  return (
    <ul className="hidden md:top-5 2xl:top-14 mr-5 md:mr-2 2xl:mr-7  md:w-11 text-center gap-2 md:flex md:flex-col z-10">
      <li
        title="افزودن به علاقه مندی ها"
        className="rounded-xl  overflow-hidden cursor-pointer"
      >
        <FavoriteButton />
      </li>

      {toolsBar.map((item) => (
        <li
          key={item.id}
          className="rounded-xl  bg-gray-100  cursor-pointer hover:bg-gray-200"
        >
          {item.href ? (
            // Handle compare button with navigation
            <Link
              href={item.id === 3 ? compareLink : item.href}
              className="block"
            >
              <div className="relative h-11 w-11" title={item.content}>
                <Image
                  className="p-3"
                  src={item.src}
                          fill
    style={{ objectFit: "contain" }}
                  alt={item.content}
                  quality={100}
                />
              </div>
            </Link>
          ) : (
            // Handle other buttons with modal
            <ManageModal
              triggerContent={
                <div className="relative h-11 w-11">
                  <Image
                    className="p-3"
                    src={item.src}
                              fill
    style={{ objectFit: "contain" }}
                    alt={item.content}
                    quality={100}
                  />
                </div>
              }
              className="fixed inset-0 z-50"
            >
              {item.id === 5 && iframe ? (
                <div className="w-[90vw] md:w-[70vw] max-w-4xl rounded-lg overflow-hidden shadow-2xl">
                  <div dangerouslySetInnerHTML={{ __html: iframe }} />
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-xl">
                  <p className="text-sm text-gray-700">{item.content}</p>
                </div>
              )}
            </ManageModal>
          )}
        </li>
      ))}
    {iframe && <Iframe iframe={iframe} />}
      <AddToListButton />

      <li className="rounded-xl bg-gray-100  border-gray-300 cursor-pointer hover:bg-gray-200">
        <ManageModal
          triggerContent={
            <div className="relative h-11 w-11">
              <Image
                className="p-3"
                src="/svg/Share2.svg"
                            fill
    style={{ objectFit: "contain" }}
                alt="اشتراک گذاری"
                quality={100}
              />
            </div>
          }
          className="fixed inset-0 z-50"
        >
      
          <ShareProduct />
        </ManageModal>
      </li>
    </ul>
  );
}

export default ToolsBar;
