import { Metadata } from "next";
import { usePathname, useSearchParams } from "next/navigation";

const defaultMeta = {
  title: "Shata20 - فروشگاه موبایل شما",
  siteName: "شتا 20",
  description:
    "Shata20 فروشگاه یکپارچه موبایل شما است که دستگاه های موبایل و لوازم جانبی گوناگون را ارائه می دهد. مجموعه ما را کاوش کنید و دستگاه موبایل ایده آل خود را پیدا کنید.",
  url: "https://www.shata20.com",
  type: "website",
  robots: "index, follow",
};

export const metadata: Metadata = {
  title: defaultMeta.title,
  description: defaultMeta.description,
  robots: defaultMeta.robots,
  openGraph: {
    title: defaultMeta.title,
    description: defaultMeta.description,
    siteName: defaultMeta.siteName,
  },
  twitter: {
    title: defaultMeta.title,
    description: defaultMeta.description,
  },
};
function getCanonicalAddress(
  url: string,
  asPath: string,
  pageQuery: string,
): string {
  const corrrectPath = asPath?.split("?");
  const [path, query] = corrrectPath;
  return `${url}${`${path}${pageQuery ? `?page=${pageQuery}` : ""}`}`;
}
export default function Meta() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get("page") as string;
  return (
    <>
      <meta property="og:url" content={`${defaultMeta.url}${pathname}`} />
      <meta name="robots" content={defaultMeta?.robots} />
      <link
        rel="canonical"
        href={getCanonicalAddress(defaultMeta.url, pathname, pageQuery)}
      />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:type" content={defaultMeta.type} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="250" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={defaultMeta.title} />
      <meta name="twitter:site" content="@shata20" />
      <meta name="twitter:description" content={defaultMeta.description} />
      <meta name="twitter:creator" content="@shata20" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
      <meta name="google" content="notranslate" key="notranslate" />
    </>
  );
}
