'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserPurchases } from '@/components/app/profile-user/hooks';
import { useCreateUserPurchase } from '@/components/app/profile-user/hooks';
import Button from '@/components/base/button';
import ManageModal from '@/components/base/modal';
import Image from 'next/image';
import { useColorStore } from '@/stores/colorStore';
import { useStore } from '@/stores/useFavoriteItemStore';
import { useAddToPurchaseList } from '@/components/app/profile-user/hooks';
import ShataLoading from '@/components/base/loading/shata-loading';
import { toast } from 'react-hot-toast';
import { DeleteListModal } from '@/components/app/profile-user/components/base/profile-modals';

type FormData = {
  newListName: string;
};

export default function AddToListButton() {
  const { selectedVariantId } = useColorStore();
  const { mutate: addToPurchaseList, isPending: isAddingToList } =
    useAddToPurchaseList();
  const { selectedItem, setSelectedItem } = useStore();
  const [isNewListVisible, setIsNewListVisible] = useState(false);

  const { data, isPending: isLoadingLists } = useUserPurchases();
  const { mutate: createUserPurchase, isPending: isCreatingList } =
    useCreateUserPurchase();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const handleConfirm = (closeModal: () => void) => {
    if (!selectedVariantId || selectedItem === null) {
      toast.error('لطفاً ابتدا یک لیست انتخاب کنید');
      return;
    }

    addToPurchaseList(
      { listId: selectedItem, variantId: selectedVariantId },
      {
        onSuccess: () => {
          toast.success('محصول با موفقیت به لیست اضافه شد ✅');
          closeModal();
          setSelectedItem(null);
        },
        onError: () => {
          toast.error('خطا در افزودن محصول ❌');
        },
      }
    );
  };

  const handleRadioChange = (id: number) => {
    setSelectedItem(id);
  };

  const handleAddNewList = () => {
    setIsNewListVisible(true);
  };

  const onSubmit = (formData: FormData) => {
    if (formData.newListName.trim() === '') {
      return;
    }

    const newPurchaseData = {
      title: formData.newListName,
    };

    createUserPurchase(newPurchaseData, {
      onSuccess: () => {
        toast.success('لیست جدید با موفقیت ایجاد شد ✅');
        reset();
        setIsNewListVisible(false);
      },
      onError: () => {
        toast.error('خطا در ایجاد لیست ❌');
      },
    });
  };

  const hasLists = data?.userPurchasesList && data.userPurchasesList.length > 0;

  return (
    <li className="border-b md:border-b-0 md:rounded-lg md:bg-gray-100 md:hover:bg-gray-200 cursor-pointer transition-all duration-300">
      <ManageModal
        triggerContent={
          <div className="flex gap-2 items-center ">
            {' '}
            <div className="relative h-11 w-11">
              <Image
                className="p-2.5"
                src="/svg/note-add.svg"
                fill
                style={{ objectFit: 'contain' }}
                alt="افزودن به لیست خرید"
                quality={100}
              />
            </div>
            <p className="text-sm md:hidden text-gray-700 p-2">
              افزودن به لیست خرید
            </p>
          </div>
        }
        actionLabel={isAddingToList ? 'در حال افزودن...' : 'افزودن به لیست'}
        actionBtnClass="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed w-full py-3 rounded-lg text-white font-Bold text-sm md:text-base transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
        cancelLabel={
          <button
            type="button"
            className="absolute left-4 top-4 md:left-5 md:top-5 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="بستن"
          >
            <Image
              src="/svg/profile/close-circle.svg"
              alt="close-modal"
              width={28}
              height={28}
              className="group-hover:opacity-70 transition-opacity"
            />
          </button>
        }
        cancelBoxClass="absolute"
        actionBoxClass="px-4 md:px-5 pb-4 md:pb-5"
        onConfirm={(closeModal) => handleConfirm(closeModal)}
        requireAuth={true}
        modalBodyClass="w-[90vw] max-w-md md:max-w-lg gap-0 p-0"
        fadeIn="animate-slideUp"
        fadeOut="animate-slideDown"
        className="inset-0 z-50 absolute md:fixed top-[-200%] md:top-0  items-end md:items-center"
        confirmLoading={isAddingToList}
      >
        <div className="px-4 md:px-5 pt-4 md:pt-5 pb-3 md:pb-4">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-4 md:mb-5">
            <div className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 bg-emerald-50 rounded-lg flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 11L12 14L22 4"
                  stroke="#08A70A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                  stroke="#08A70A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-Bold text-gray-800">
                افزودن به لیست
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 font-Medium">
                انتخاب لیست خرید
              </p>
            </div>
          </div>

          {/* Loading State */}
          {isLoadingLists ? (
            <div className="py-6">
              <ShataLoading
                size="medium"
                showText={true}
                text="در حال بارگذاری..."
              />
            </div>
          ) : hasLists ? (
            <>
              {/* Lists Section */}
              <div className="space-y-1.5 mb-3 max-h-[280px] overflow-y-auto custom-scrollbar">
                {data.userPurchasesList.map(
                  (item: { id: number; title: string }) => {
                    const isSelected = selectedItem === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleRadioChange(item.id)}
                        className={`
                          flex items-center gap-2.5 p-2.5 md:p-3 rounded-lg border cursor-pointer
                          transition-all duration-200 group relative
                          ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                          }
                        `}
                      >
                        <div className="relative flex-shrink-0">
                          <input
                            id={item.id.toString()}
                            type="radio"
                            name="purchaseList"
                            className="peer sr-only"
                            checked={isSelected}
                            onChange={() => handleRadioChange(item.id)}
                          />
                          <div
                            className={`
                              w-4 h-4 rounded-full border-2 flex items-center justify-center
                              transition-all duration-200
                              ${
                                isSelected
                                  ? 'border-emerald-500 bg-emerald-500'
                                  : 'border-gray-300 bg-white group-hover:border-emerald-400'
                              }
                            `}
                          >
                            {isSelected && (
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2 6L5 9L10 3"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <label
                          htmlFor={item.id.toString()}
                          className={`
                            flex-1 cursor-pointer text-sm font-Medium
                            transition-colors duration-200
                            ${
                              isSelected
                                ? 'text-emerald-700'
                                : 'text-gray-700 group-hover:text-gray-900'
                            }
                          `}
                        >
                          {item.title}
                        </label>
                        <div
                          className="flex-shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DeleteListModal
                            list={{
                              id: item.id.toString(),
                              title: item.title,
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {/* Divider */}
              <div className="relative mb-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-white text-xs text-gray-500 font-Medium">
                    یا
                  </span>
                </div>
              </div>
            </>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-4 px-4 mb-3">
              <div className="relative w-16 h-16 mb-3 opacity-50">
                <Image
                  src="/svg/profile/Frame122.svg"
                  alt="empty list"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-sm font-Bold text-gray-700 mb-1 text-center">
                هنوز لیستی ندارید
              </h4>
              <p className="text-xs text-gray-500 text-center mb-3 font-Medium">
                لیست خرید خود را ایجاد کنید
              </p>
            </div>
          )}

          {/* Create New List Section */}
          {!isNewListVisible ? (
            <button
              onClick={handleAddNewList}
              disabled={isCreatingList}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-emerald-500 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 hover:border-emerald-300 rounded-lg font-Bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>ایجاد لیست جدید</span>
            </button>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-2.5 animate-slideUp"
            >
              <div>
                <input
                  {...register('newListName', {
                    required: 'نام لیست الزامی است',
                    minLength: {
                      value: 2,
                      message: 'حداقل 2 کاراکتر',
                    },
                    maxLength: {
                      value: 50,
                      message: 'حداکثر 50 کاراکتر',
                    },
                  })}
                  type="text"
                  id="newListName"
                  className={`
                    w-full border-2 rounded-lg py-2.5 px-3 
                    text-sm font-Medium 
                    transition-all duration-200
                    ${
                      errors.newListName
                        ? 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-100'
                        : 'border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-100'
                    }
                    placeholder:text-gray-400
                    disabled:bg-gray-50 disabled:cursor-not-allowed
                    outline-none
                  `}
                  placeholder="نام لیست جدید..."
                  disabled={isCreatingList}
                  autoFocus
                />
                {errors.newListName && (
                  <p className="text-xs text-red-500 mt-1 font-Medium">
                    {errors.newListName.message}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isCreatingList}
                  className="flex-1 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-Bold text-sm rounded-lg transition-all duration-200"
                >
                  {isCreatingList ? 'در حال ایجاد...' : 'ایجاد'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsNewListVisible(false);
                    reset();
                  }}
                  disabled={isCreatingList}
                  className="px-4 py-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 font-Medium text-sm rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  انصراف
                </button>
              </div>
            </form>
          )}
        </div>
      </ManageModal>

      {/* Custom Scrollbar Styles
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #08a70a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #056406;
        }
      `}</style> */}
    </li>
  );
}
