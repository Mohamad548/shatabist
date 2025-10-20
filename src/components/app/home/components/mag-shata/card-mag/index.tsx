"use client";
import Button from "@/components/base/button";
import { IRenderItemProps } from "@/components/base/slider/type-slider";
import { PageLevelLocalization } from "@/constants/localization";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CartMagShataProps extends Omit<IRenderItemProps, "imageSrc"> {
  imageSrc?: string[];
}

function CartMagShata({
  imageSrc = [],
  description,
  name,
  date,
}: CartMagShataProps) {
  const { home: magShata } = PageLevelLocalization;

  return (
    <Link
      href={`/mag/${name}`}
      className="block rounded-md transition-all duration-300 hover:bg-black hover:text-white group"
    >
      <div className="relative w-full">
        <Image
          src={imageSrc[0]}
          alt={`${name}`}
          layout="responsive"
          width={700}
          height={475}
          objectFit="contain"
          quality={100}
          className="p-4"
        />
      </div>
      <h3 className="font-Bold p-4">{name}</h3>
      <p className="pr-4 font-regular text-sm text-gray-900 group-hover:text-white">
        {description}
      </p>
      <div className="flex justify-between">
        <div className="p-4 font-Bold text-sm">{date}</div>
        <Button className="pl-4 py-4">{magShata.magShata.more}</Button>
      </div>
    </Link>
  );
}

export default CartMagShata;
