'use client';
import { AddFeedbackModal } from '@/components/app/profile-user/components/base/profile-modals';
import Button from '@/components/base/button';
import RadioBox from '@/components/base/radioBox';
import CommentBox from '@/components/blogDetail/components/commentBox';
import { useCommentStatsStore } from '@/stores/comment-stats-store';
import { SectionProps } from '@/types/types';
import clsxm from '@/utils/clsxm';
import { getCommentStats } from '@/utils/comment-stats';
import Image from 'next/image';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useGetProductComments } from '../../../hooks';
import ManageModal from '@/components/base/modal';
import ShataLoading from '@/components/base/loading/shata-loading';
import IconSize from '@/constants/icon-size';
import { PageLevelLocalization } from '@/constants/localization';

function ReviewTab({ sectionRef, product }: SectionProps) {
  const commentSorting = [
    {
      id: 1,
      name: 'جدید‌ترین',
    },
    {
      id: 2,
      name: 'مفیدترین',
    },
    {
      id: 3,
      name: 'بیشترین امتیاز',
    },
    {
      id: 4,
      name: 'کمترین امتیاز',
    },
  ];
  const sortMap: Record<
    number,
    'newest' | 'highest_likes' | 'highest_rate' | 'lowest_rate'
  > = {
    1: 'newest',
    2: 'highest_likes',
    3: 'highest_rate',
    4: 'lowest_rate',
  };

  const [showAll, setShowAll] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(1);

  const handleToggle = () => setShowAll((prev) => !prev);
  const handleOptionChange = (id: number) => setSelectedOption(id);

  const methods = useForm();
  const {
    data: commentsData,
    isLoading,
    error,
  } = useGetProductComments(product?.id || 0, sortMap[selectedOption ?? 1]);

  const comments = commentsData?.data?.comments ?? [];
  const stats = getCommentStats(comments);

  useCommentStatsStore.getState().setStats(stats);

  const getClassNameLabel = (id: number) => {
    return clsxm(
      'transition-all px-2 py-1 duration-300 ease-in-out text-sm cursor-pointer',
      selectedOption === id
        ? 'md:bg-emerald-500 md:text-white rounded-md font-Medium'
        : 'font-regular text-gray-600'
    );
  };
  const { products: ItemsFilterAndSort } = PageLevelLocalization;
  return (
    <section ref={sectionRef} className="flex flex-col gap-10">
      {isLoading ? (
        <ShataLoading
          size="medium"
          showText={true}
          text="در حال بارگذاری دیدگاه‌ها..."
        />
      ) : error ? (
        <p className="text-red-500">خطا در دریافت دیدگاه‌ها</p>
      ) : Array.isArray(comments) && comments.length > 0 ? (
        <>
          {/* همان محتوای فعلی، فقط با comments جایگزین product.comments */}
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-4">
              <p className="font-Bold">امتیاز محصول</p>
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap items-center gap-3 0">
                  <div className="flex items-start gap-1 bg-warning-100 w-fit py-1 px-2 rounded-md">
                    <span className="text-warning-500 text-sm">
                      {stats?.averageRate}
                    </span>
                    <Image
                      src="/svg/product/star.svg"
                      alt="star"
                      width={20}
                      height={20}
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    از مجموع {comments.length} امتیاز
                  </p>
                </div>
              </div>
            </div>
            <ManageModal
              classNameModale=""
              className="fixed inset-0 z-50 w-full"
              modalBodyClass="w-full h-1/4 bottom-0 left-0 right-0 absolute rounded-none overflow-scroll"
              triggerClass="w-full"
              fadeIn=" animate-slideUp"
              fadeOut="animate-slideDown"
              cancelLabel={
                <div className="border border-gray-600 rounded-full p-1 w-6 h-6 text-gray-800 text-xs">
                  ✕
                </div>
              }
              
              cancelBoxClass="absolute left-5 top-5"
              triggerContent={
                <div
                  aria-label="باز کردن مرتب‌سازی"
                  className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-emerald-50 text-emerald-700 shadow-primary hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-[0.99] transition"
                >
                  <Image
                    alt={ItemsFilterAndSort.sorting.name}
                    src={ItemsFilterAndSort.sorting.src}
                    width={IconSize.lg}
                    height={IconSize.lg}
                  />
                  <h3 className="font-Medium text-xs text-gray-800 ">
                    {ItemsFilterAndSort.sorting.name}
                  </h3>
                </div>
              }
            >
              <div className="flex md:py-4 flex-col md:flex-row">
                <div className="hidden md:flex md:pr-4 items-center">
                  <Image
                    alt=""
                    src="/svg/products/sort.svg"
                    width={20}
                    height={20}
                  />
                  <h2 className="font-Medium text-sm pr-2">مرتب سازی</h2>
                  <span className="px-4 text-gray-200">|</span>
                </div>
                {commentSorting.map((sortOption) => (
                  <RadioBox
                    key={sortOption.id}
                    id={sortOption.id}
                    name={sortOption.name}
                    selectedOption={selectedOption}
                    onChange={handleOptionChange}
                    classNameParentSorting="py-2"
                    type="radio"
                    classNameCheckmark="md:hidden"
                    classNameLabel={getClassNameLabel(sortOption.id)}
                  />
                ))}
              </div>
            </ManageModal>
          </div>

          <div className=" w-full border flex items-center justify-center gap-6 border-gray-300 rounded-md  py-2 px-4 ">
            <p className="text-gray-400 text-xs md:text-sm text-center mb-1">
              شما هم درباره این مقاله دیدگاه ثبت کنید
            </p>
            <FormProvider {...methods}>
              <AddFeedbackModal
                className="py-2 px-10 rounded-lg w-full  bg-emerald-500 text-sm text-white"
                id={product?.id}
              />
            </FormProvider>
          </div>
          <div className="flex md:hidden w-full justify-between">
            <ManageModal
              triggerContent={
                <div className="flex justify-between w-full">
                  <p className="text-sm  font-Bold">دیدگاه کاربران</p>
                  <Button className="text-emerald-500 text-sm font-Bold">
                    مشاهده همه
                  </Button>
                </div>
              }
              classNameModale="w-full"
              className="fixed inset-0 z-50 w-full"
              modalBodyClass="w-full h-full rounded-none overflow-scroll  "
              triggerClass="w-full"
              fadeIn=" animate-slideUp"
              fadeOut="animate-slideDown"
              cancelLabel={
                <div className="border border-gray-600 rounded-full p-1 w-6 h-6 text-gray-800 text-xs">
                  ✕
                </div>
              }
              cancelBoxClass="absolute left-2 top-2"
            >
              <div className=" space-y-5 mt-5">
                {' '}
                {comments
                  ?.slice(0, showAll ? comments.length : 3)
                  ?.map((comment: any) => {
                    const name =
                      typeof comment?.user?.profile?.first_name === 'undefined'
                        ? 'کاربر'
                        : `${comment.user.profile.first_name} ${comment.user.profile.last_name}`;

                    return (
                      <CommentBox
                        key={comment?.id}
                        commentId={comment?.id}
                        starNumber={comment?.rate}
                        productId={comment?.productId}
                        name={name}
                        title={comment?.title}
                        description={comment?.content}
                        date={comment?.createdAt}
                        likes={comment?.likeCount}
                        dislikes={comment?.dislikeCount}
                        comment_images={comment?.commment_images}
                      />
                    );
                  })}
              </div>
            </ManageModal>
          </div>

          <div className="flex hidden-scrollbar items-stretch md:flex-col gap-3 overflow-x-auto">
            {comments
              ?.slice(0, showAll ? comments.length : 3)
              ?.map((comment: any) => {
                const name =
                  typeof comment?.user?.profile?.first_name === 'undefined'
                    ? 'کاربر'
                    : `${comment.user.profile.first_name} ${comment.user.profile.last_name}`;

                return (
                  <CommentBox
                    key={comment?.id}
                    commentId={comment?.id}
                    starNumber={comment?.rate}
                    productId={comment?.productId}
                    name={name}
                    title={comment?.title}
                    description={comment?.content}
                    date={comment?.createdAt}
                    likes={comment?.likeCount}
                    dislikes={comment?.dislikeCount}
                    comment_images={comment?.commment_images}
                  />
                );
              })}

            <Button
              onClick={handleToggle}
              className="text-emerald-700 hidden font-Bold py-4 md:flex gap-2 items-center"
            >
              {showAll ? 'نمایش کمتر' : 'نمایش بیشتر »'}
            </Button>
          </div>
        </>
      ) : (
        <div className="flex">
          <div className="w-1/2 bg-white p-4 rounded-xl  border-gray-200 text-right">
            <h2 className="text-xl font-bold mb-2 text-gray-800">دیدگاه‌ها</h2>
            <div className="border-b-2 border-red-500 w-20 mb-4"></div>
            <div className="flex items-start flex-col gap-2 mb-2">
              <span className="text-sm text-gray-500">
                هنوز امتیازی ثبت نشده است
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-gray-400 text-xl">
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              شما هم درباره این کالا دیدگاه ثبت کنید
            </p>

            <FormProvider {...methods}>
              <AddFeedbackModal
                className="py-2 px-10 rounded-lg w-4/6 bg-emerald-500 text-sm text-white"
                id={product?.id}
              />
            </FormProvider>

            <p className="text-xs text-gray-500 mt-4 flex w-2/3 items-center gap-1">
              <span>
                با ثبت دیدگاه بر روی کالاهای خریداری شده 5 امتیاز در دیجی‌کلاب
                دریافت کنید
              </span>
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-lg text-gray-800 mb-4">
              شما هم می‌توانید در مورد این کالا نظر دهید.
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              اگر این محصول را قبلاً از شتا20 خریده باشید، دیدگاه شما به عنوان
              خریدار ثبت خواهد شد. همچنین در صورت تمایل می‌توانید به صورت ناشناس
              نیز دیدگاه خود را ثبت کنید.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReviewTab;
