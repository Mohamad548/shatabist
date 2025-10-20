import ContactWrapperNoSSR from '@/components/base/map/map-client';
import { contactInfoData } from '@/constants/mock-data/contactbox';
import { socialIcons } from '@/constants/mock-data/socialicons';
import Image from 'next/image';
import Link from 'next/link';

function Contact() {
  return (
    <div className="bg-gray-50 py-12 md:py-20 ">
      <div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-gray-200">
          <div className="flex flex-col md:flex-row justify-center items-center">
            {/* Contact Information Section */}
            <div className="p-8 sm:p-12">
              <h1 className="text-2xl font-Bold tracking-tight text-gray-900 md:text-5xl">
                با ما در ارتباط باشید
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                تیم ما آماده کمک به شماست. برای هرگونه سوال یا پشتیبانی با ما
                تماس بگیرید.
              </p>

              <div className="mt-12 space-y-8">
                {contactInfoData?.map((item, index) => (
                  <div
                    key={`CONTACT_INFO_${item.label}_${index}`}
                    className="flex items-start gap-5"
                  >
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-100/20 text-emerald-500">
                      <Image
                        src={item.iconSrc}
                        alt={item.label}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.label}
                      </h3>
                      <p className="text-md font-medium tracking-wide text-gray-600">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 border-t border-gray-200 pt-8">
                <h3 className="mb-6 text-xl font-bold text-gray-800">
                  شبکه های اجتماعی ما
                </h3>
                <div className="flex items-center gap-5">
                  {socialIcons.map((item) => (
                    <Link
                      href="#"
                      key={item.id}
                      className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 p-3 transition-all duration-300 ease-in-out hover:bg-emerald-500"
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={24}
                        height={24}
                        className="transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* Map Section */} 
            <div className='w-2/3 pl-8'>     <ContactWrapperNoSSR  /></div>
       
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
