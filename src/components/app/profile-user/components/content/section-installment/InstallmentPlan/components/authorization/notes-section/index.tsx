import React from "react";
const NotesSection = () => {
  const notes = [
    "اطلاعات هویتی صاحب چک، کدملی و شماره موبایل (جهت تاییدیه) باید تطابقت داشته باشند.",
    "پس از تکمیل فرم و ارسال درخواست، ظرف حداکثر یک روز کاری همکاران ما با شما تماس می‌گیرند.",
    "لازمه‌ی بررسی و اخذ وضعیت اعتباری شما از سوی سامانه‌ی مشاوره رتبه‌بندی اعتباری ایرانیان؛ ارسال تاییدیه از سوی درخواست‌کننده می‌باشد.",
    "در صورت داشتن رتبه‌ی اعتباری «ضعیف» و «خیلی ضعیف» (از C1 تا E3)، درخواست‌کننده موظف به ارائه‌ی چک صیادی دیگری (به اسم شخص دیگر) نیز بصورت ضمانت می‌باشد.",
  ];
  return (
    <div className="border-gray-200 border bg-gray-50 rounded-md p-4 text-gray-800">
      <h3 className="font-bold text-base">
        لطفاً قبل از ارسال درخواست، به نکات زیر توجه فرمائید:
      </h3>
      <ul className="list-inside space-y-2 mt-2 text-sm font-regular">
        {notes.map((note, index) => (
          <li key={index} className="text-gray-600">
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesSection;
