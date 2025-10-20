import { servicesItemHome } from "@/constants/mock-data/services";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function HomeServices() {
  return (
    <div className="w-full justify-items-center  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3  lg:gap-16 py-16 md:px-40 ">
      {servicesItemHome &&
        servicesItemHome.map((item) => (
          <Link
            href="/"
            key={item.id}
            className="flex flex-col justify-center items-center w-40"
          >
            <div className="relative flex w-10 h-10 md:w-20 md:h-20  ">
              <Image
                className=""
                alt={item.name}
                src={item.src}
                layout="responsive"
                width={80}
                height={80}
                objectFit="contain"
                quality={100}
              />
            </div>
            <div className="flex gap-2 flex-col mt-1">
              <h3 className="text-xs md:text-sm font-Bold text-center ">{item.name}</h3>
              <p className="font-regular text-xs md:text-sm text-center text-gray-700">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default HomeServices;
