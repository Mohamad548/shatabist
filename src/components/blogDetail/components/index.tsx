"use client";
import Breadcrumb from "@/components/blog/components/breadcrumbs";
import { PageLevelLocalization } from "@/constants/localization";
import { breadcrumbItems } from "@/constants/mock-data/breadcrumbs";
import Image from "next/image";
import React, { useState } from "react";
import CommentBox from "./commentBox";
import { comments } from "@/constants/mock-data/commentbox";
import ArticleBox from "./articleBox";
import Link from "next/link";

interface CommentBoxItem {
  id: number;
  starNumber: number;
  name: string;
  title: string;
  description: string;
  date: string;
  likes: number;
  dislikes: number;
}

const { blog } = PageLevelLocalization;

function BlogDetail() {
  const [visibleComments, setVisibleComments] = useState(3); // تعداد اولیه نظرات قابل نمایش

  const showMoreComments = () => {
    setVisibleComments((prev) => prev + 3); // هر بار 3 نظر بیشتر نمایش داده شود
  };
  return (
    <div className="mx-4 md:mx-20 mt-6">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-6 lg:col-span-2">
          <Breadcrumb breadcrumbItems={breadcrumbItems} className="" />
          <div className="space-y-6">
            <Image
              src="/images/phone.jpg"
              width={600}
              height={600}
              alt="phone"
              className="w-full"
            />
            <div className="space-y-3">
              <h3 className="font-Bold">اسم مقاله در اینجا</h3>
              <div className="flex items-center justify-between">
                <div className="flex gap-8">
                  <button className=" hidden md:block bg-secondary-100/30 text-emerald-500 font-semibold px-3 py-1 rounded-lg">
                    موضوع مقاله
                  </button>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/svg/calendar.svg"
                      width={20}
                      height={20}
                      alt="calender"
                    />
                    <span className="text-sm">1403/07/16</span>
                  </div>
                  <div className=" hidden md:flex items-center gap-2">
                    <Image
                      src="/svg/person.svg"
                      width={20}
                      height={20}
                      alt="calender"
                    />
                    <Link href="/">
                      <span className="text-sm">افشین کنکاش</span>
                    </Link>
                  </div>
                </div>
                <div>
                  <Image
                    src="/svg/share.svg"
                    alt="shared-icon"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <p className="leading-8">{blog.blogDetail.blogDetailParagraph}</p>
            </div>
          </div>
          <div className="space-y-12">
            <div className="w-full">
              <Image
                src="/images/phone.jpg"
                width={550}
                height={350}
                quality={100}
                alt="example"
                className="rounded-3xl mx-auto"
              />
            </div>
            <p className="leading-8">{blog.blogDetail.blogDetailParagraph2}</p>
            <div className="md:mx-20 rounded-xl bg-emerald-100/20 text-center py-11 font-Bold text-white">
              تبلیغات
            </div>
            <p className="leading-8">{blog.blogDetail.blogDetailParagraph2}</p>
          </div>
          <section className="hidden md:block border-t-2 space-y-6">
            <div className="mt-6 space-y-4">
              <h3 className="font-Bold">دیدگاه کاربران</h3>
              <div className="flex items-center justify-between">
                <div className="py-2 px-10 rounded-lg bg-blue-500 text-sm text-white">
                  TAB
                </div>
                <div className="flex items-center gap-6">
                  <p className="text-gray-400 text-sm">
                    شما هم درباره این مقاله دیدگاه ثبت کنید
                  </p>
                  <button className="py-2 px-10 rounded-lg bg-emerald-100/20 text-sm text-white">
                    ثبت دیدگاه
                  </button>
                </div>
              </div>
            </div>
            <div>
              {comments
                .slice(0, visibleComments)
                .map((comment: CommentBoxItem) => (
                  <CommentBox
                    key={comment.id}
                    commentId={comment.id}
                    starNumber={comment.starNumber}
                    name={comment.name}
                    title={comment.title}
                    description={comment.description}
                    date={comment.date}
                    likes={comment.likes}
                    dislikes={comment.dislikes}
                  />
                ))}
              {visibleComments < comments.length && (
                <button
                  onClick={showMoreComments}
                  className="text-emerald-500 font-Bold py-4 flex gap-2 items-center"
                >
                  <span>نمایش بیشتر</span>
                  <Image
                    src="/svg/arrow-left.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="-rotate-90"
                  />
                </button>
              )}
            </div>
          </section>
        </div>
        <div className="w-full lg:col-span-1 mt-10 space-y-6">
          <div className="space-y-4">
            <h3 className="font-Bold">جدید ترین مقالات</h3>
            <ArticleBox />
            <ArticleBox />
            <ArticleBox />
            <ArticleBox />
          </div>
          <div className="space-y-7">
            <Image
              src="/images/banner1.jpg"
              alt="banner-1"
              width={500}
              height={500}
              className="w-full"
            />
            <Image
              src="/images/banner2.jpg"
              alt="banner-2"
              width={500}
              height={500}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className=" p-3 text-5xl font-Bold rounded-lg text-black text-center ">
        Slider
      </div>
    </div>
  );
}
export default BlogDetail;

// <div className="grid grid-cols-1 mx-4 lg:grid-cols-3 md:mx-40 gap-8 mt-6">
//       <div className="grid lg:col-span-2">
//         <div className="space-y-6">
//           <Breadcrumb breadcrumbItems={breadcrumbItems} className="" />
//           <div className="space-y-6">
//             <Image
//               src={"/images/phone.jpg"}
//               width={600}
//               height={600}
//               alt="phone"
//               className="w-full"
//             />
//             <div className="space-y-3">
//               <h3 className="font-Bold">اسم مقاله در اینجا</h3>
//               <div className="flex items-center justify-between">
//                 <div className="flex gap-8">
//                   <button className=" hidden md:block bg-secondary-100/30 text-primary-500 font-semibold px-3 py-1 rounded-lg">
//                     موضوع مقاله
//                   </button>
//                   <div className="flex items-center gap-2">
//                     <Image
//                       src={"/svg/calendar.svg"}
//                       width={20}
//                       height={20}
//                       alt="calender"
//                     />
//                     <span className="text-sm">1403/07/16</span>
//                   </div>
//                   <div className=" hidden md:flex items-center gap-2">
//                     <Image
//                       src={"/svg/person.svg"}
//                       width={20}
//                       height={20}
//                       alt="calender"
//                     />
//                     <span className="text-sm">افشین کنکاش</span>
//                   </div>
//                 </div>
//                 <div>
//                   <Image
//                     src={"/svg/share.svg"}
//                     alt="shared-icon"
//                     width={20}
//                     height={20}
//                   />
//                 </div>
//               </div>
//               <p className="leading-8">{blog.blogDetail.blogDetailParagraph}</p>
//             </div>
//           </div>
//           <div className="space-y-12">
//             <div className="w-full">
//               <Image
//                 src={"/images/phone.jpg"}
//                 width={550}
//                 height={350}
//                 quality={100}
//                 alt="example"
//                 className="rounded-3xl mx-auto"
//               />
//             </div>
//             <p className="leading-8">{blog.blogDetail.blogDetailParagraph2}</p>
//             <div className="md:mx-20 rounded-xl bg-primary-100/20 text-center py-11 font-Bold text-white">
//               تبلیغات
//             </div>
//             <p className="leading-8">{blog.blogDetail.blogDetailParagraph2}</p>
//           </div>
//           <section className="hidden lg:block border-t-2 space-y-6">
//             <div className="mt-6 space-y-4">
//               <h3 className="font-Bold">دیدگاه کاربران</h3>
//               <div className="flex items-center justify-between">
//                 <div className="py-2 px-10 rounded-lg bg-blue-500 text-sm text-white">
//                   TAB
//                 </div>
//                 <div className="flex items-center gap-6">
//                   <p className="text-gray-400 text-sm">
//                     شما هم درباره این مقاله دیدگاه ثبت کنید
//                   </p>
//                   <button className="py-2 px-10 rounded-lg bg-primary-100/20 text-sm text-white">
//                     ثبت دیدگاه
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="">
//               {comments?.map((comment: CommentBoxItem) => {
//                 return (
//                   <CommentBox
//                     key={comment.id}
//                     id={comment.id}
//                     starNumber={comment.starNumber}
//                     name={comment.name}
//                     title={comment.title}
//                     description={comment.description}
//                     date={comment.date}
//                     likes={comment.likes}
//                     dislikes={comment.dislikes}
//                   />
//                 );
//               })}
//               <button className="text-primary-500 font-Bold py-4 flex gap-2 items-center">
//                 <span>نمایش بیشتر</span>
//                 <Image
//                   src={"/svg/arrow-left.svg"}
//                   alt=""
//                   width={20}
//                   height={20}
//                   className="-rotate-90"
//                 />
//               </button>
//             </div>
//           </section>
//         </div>
//         <div className="p-3 text-5xl font-Bold rounded-lg text-black text-center">
//           Slider
//         </div>
//       </div>
//       <div className="w-full lg:col-span-1 mt-10 space-y-6">
//         <div className="space-y-4">
//           <h3 className="font-Bold">جدید ترین مقالات</h3>
//           <ArticleBox />
//           <ArticleBox />
//           <ArticleBox />
//           <ArticleBox />
//         </div>
//         <div className="space-y-7">
//           <Image
//             src={"/images/banner1.jpg"}
//             alt="banner-1"
//             width={500}
//             height={500}
//             className="w-full"
//           />
//           <Image
//             src={"/images/banner2.jpg"}
//             alt="banner-2"
//             width={500}
//             height={500}
//             className="w-full"
//           />
//         </div>
//       </div>
//     </div>
