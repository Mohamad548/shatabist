"use client";

import Button from "@/components/base/button";
import Input from "@/components/base/input";

export default function Newsletter() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm">با ثبت ایمیل در خبرنامه ما عضو شوید</h3>
      <div className="flex justify-between gap-3">
        <Input
          placeholder="ایمیل"
          type="email"
          parentClassName="w-4/5"
          inputClassName="border rounded-md py-2.5 px-3.5 w-full"
        />
        <Button className="bg-emerald-500/95 text-white px-6 py-2 rounded-md">ثبت</Button>
      </div>
    </div>
  );
} 