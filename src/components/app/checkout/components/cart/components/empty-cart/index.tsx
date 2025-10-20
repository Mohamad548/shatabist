import Link from 'next/link'
import React from 'react'

function EmptyCart() {
  return (
     <div className="hidden lg:flex lg:w-1/2 p-8 flex-col justify-center">
            <div className="max-w-md mx-auto lg:mx-0 space-y-8">
              {/* Creative Typography */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className=" text-base md:text-4xl mb-2 font-light text-gray-800 leading-tight">
                    داستان شما
   </h1>
                    <span className="font-bold text-emerald-500 ">
                      اینجا شروع می‌شود
                    </span>
               
                  <div className="w-16 h-0.5 bg-emerald-500"></div>
                </div>

                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  هر خرید بزرگ با یک قدم کوچک شروع می‌شود.
                  <br />
                  آماده‌اید قدم اول را بردارید؟
                </p>
              </div>

              {/* Unique Button Layout */}
              <div className="space-y-4">
                {/* Primary Action with Number */}
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <Link
                    href="/shop"
                    className="flex-1 text-sm bg-emerald-500 text-white md:py-4 md:px-6 py-2 px-2 rounded-lg font-medium hover:bg-emerald-600 transition-all duration-300 transform hover:translate-x-1"
                  >
                    رفتن به فروشگاه
                  </Link>
                </div>

                {/* Secondary Action with Number */}
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <Link
                    href="/shop"
                    className="flex-1 text-sm bg-emerald-500 text-white md:py-4 md:px-6 py-2 px-2 rounded-lg font-medium hover:bg-emerald-600 transition-all duration-300 transform hover:translate-x-1"
                  >
                   بازگشت به صفحه اصلی
                  </Link>
                </div>

                {/* Subtle Third Option */}
               
              </div>

              {/* Unique Visual Element */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-100 ">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-white"></div>
                  {/* <div className="w-8 h-8 bg-primary-200 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-primary-200 rounded-full border-2 border-white"></div> */}
                </div>
                <span className="text-sm text-gray-600">
                  یک خرید خوب در انتظار شماست
                </span>
              </div>
            </div>
          </div>
  )
}

export default EmptyCart
