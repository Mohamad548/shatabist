import { footerLinks } from '@/constants/mock-data/footer-links';
import { socialIcons } from '@/constants/mock-data/socialicons';
import Image from 'next/image';
import Link from 'next/link';
import { ExpandableAbout } from './expandable-about';
import Newsletter from './newsletter';
import FooterLocationModal from './FooterLocationModal';
import Accordion from '@/components/base/accordion';

export default function FooterLayout() {
  return (
    <>
      <footer className="grid grid-cols-3 gap-6 mt-16 mx-4 lg:mx-40 pb-20 md:pb-0 border-t-2 border-gray-200 pt-10">
        <section className="col-span-3 flex justify-between items-center">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <Image
              src="/images/brand.jpg"
              alt="shata-brand"
              fill
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              sizes="(max-width: 768px) 100vw, 96px"
            />
          </div>
          <div className="flex md:hidden items-center gap-2 px-2">
            <Image src="/svg/call-calling.svg" alt="location" width={20} height={20} />
            <div className="flex flex-col p-2 bg-emerald-100/20 text-emerald-500 rounded-lg">
              <span className="text-sm font-bold">44303030 - 021</span>
              <span className="text-sm font-regular">ساعت کاری: همه روزه 9 تا 18</span>
            </div>
          </div>
        </section>

        <section className="col-span-3 md:grid grid-cols-3 border-b-2 border-b-gray-200 pb-6 flex flex-col-reverse md:flex-col">
          <div className="flex flex-col md:flex-row gap-4 col-span-2">
            <div className="hidden md:flex flex-row gap-4 w-full">
              {footerLinks.map((section, index) => (
                <article key={index} className="p-4 flex flex-col gap-4 w-1/2">
                  <h3 className="text-md font-semibold">{section.title}</h3>
                  <ul className="grid grid-cols-2 gap-4">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <Link href={link.href} className="text-gray-500 hover:text-gray-400 text-sm">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="hidden md:flex items-center gap-2 px-2">
              <Image src="/svg/call-calling.svg" alt="location" width={20} height={20} />
              <div className="flex flex-col p-2 bg-emerald-100/20 text-emerald-500 rounded-lg">
                <span className="text-[14.5px] font-bold">66564136 - 021</span>
                <span className="text-[14px] font-bold">44303030 - 021</span>
                <span className="text-sm font-regular">ساعت کاری: همه روزه 9 تا 18</span>
              </div>
            </div>

           <div className="flex items-center gap-2">
  <div className="relative w-6 h-6">
    <Image
      src="/svg/locations.svg"
      alt="location"
      fill
      style={{ objectFit: 'contain' }} // نسبت تصویر حفظ می‌شود
      sizes="24px"
    />
  </div>
  <div className="flex flex-col p-2 gap-2 bg-emerald-100/20 text-emerald-500 rounded-lg">
    <p className="text-sm">
      خیابان توحید، خیابان اردبیل، پلاک ۱۰، واحد ۱۵ - کدپستی: 1457894768
    </p>
    <FooterLocationModal />
  </div>
</div>

            <div className="flex flex-wrap items-center gap-2">
              <Image src="/svg/medax.svg" alt="location" width={35} height={35} />
              <span className="text-sm">شبکه‌های اجتماعی :</span>
              <div className="flex gap-3">
                {socialIcons.map((item) => (
                  <Image
                    key={item.id}
                    src={item.src}
                    alt={item.alt}
                    width={30}
                    height={30}
                    className="transition-all bg-emerald-100/20 hover:bg-emerald-100/40 p-1 cursor-pointer rounded-xl flex items-center justify-center duration-300 hover:border-emerald-200/50 hover:shadow-md hover:scale-110"
                  />
                ))}
              </div>
            </div>

            <div className="md:hidden w-full mt-5">
              {footerLinks.map((section, index) => (
                <Accordion
                  key={index}
                  title={<span className="text-md font-semibold">{section.title}</span>}
                  itemLast={index}
                  itemRange={footerLinks.length - 1}
                >
                  <ul className="grid grid-cols-2 gap-4">
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <Link href={link.href} className="text-gray-500 hover:text-gray-400 text-sm">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              ))}
            </div>

            <Newsletter />
          </div>
        </section>

        <section className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 p-10 md:p-2">
          <ExpandableAbout />
          <div className="md:col-span-1 flex justify-center items-center gap-3 lg:gap-10">
            {[ '/images/symbol-2.jpg', '/images/symbol-1.jpg', '/images/symbol-3.jpg' ].map((src, i) => (
              <div key={i} className="relative w-24 h-24">
                <Image
                  src={src}
                  alt={`symbol-${i+1}`}
                  fill
                  style={{ objectFit: 'contain', width: '100%', height: '100%', cursor: i === 0 ? 'pointer' : 'default' }}
                  sizes="96px"
                  quality={100}
                  {...(i === 0 && { priority: true })}
                  {...(i === 0 && { referrerPolicy: 'origin' })}
                />
              </div>
            ))}
          </div>
        </section>
      </footer>

      <div className="bg-gray-50 col-span-3 text-gray-500 text-xs py-2 text-center mt-6">
        © تمامی حقوق این سایت متعلق به شتا20 می باشد و تمامی حقوق آن محفوظ می باشد
      </div>
    </>
  );
}
