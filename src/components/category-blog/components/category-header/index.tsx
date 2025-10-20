import React from "react";

function CategoryHeader() {
  return (
    <div className="relative flex flex-col md:flex-row py-24 px-10 items-center gap-4 w-full bg-cover bg-[url('/images/cliff.jpg')]">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative flex flex-col gap-3 items-center justify-center p-3 w-full z-10">
        <h1 className="font-bold text-3xl text-white">دسته بندی</h1>
        <h5 className="text-2xl text-white">نجوم</h5>
        <p className="w-full text-center text-white leading-8">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است
        </p>
      </div>
    </div>
  );
}

export default CategoryHeader;
