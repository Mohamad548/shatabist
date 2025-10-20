"use client";

import Button from "@/components/base/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

const ShareProduct = () => {
	const pathname = usePathname();
	const [fullUrl, setFullUrl] = useState("");
	const [copied, setCopied] = useState(false);

	// مطمئن شو مقدار کامل URL فقط روی کلاینت ساخته بشه
	useEffect(() => {
		if (typeof window !== "undefined") {
			setFullUrl(window.location.origin + pathname);
		}
	}, [pathname]);

	const handleCopy = () => {
		if (typeof window !== "undefined" && fullUrl) {
			navigator.clipboard.writeText(fullUrl);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	return (
		<div className="flex flex-col items-center p-4 border rounded-lg shadow-md w-80 bg-white">
			<h3 className="text-lg font-semibold mb-3">اشتراک‌گذاری</h3>
			<div className="relative h-40 w-64">
				<Image
					className="p-3"
					src="/images/share link illustration.avif"
			             fill
    style={{ objectFit: "contain" }}
					alt="اشتراک گذاری"
					quality={100}
				/>
			</div>
			<p className="text-sm text-gray-600 mb-4">
				این کالا را با دوستان خود به اشتراک بگذارید!
			</p>
			<div className="flex gap-4 mb-4">
				<Link
					href={`https://wa.me/?text=${encodeURIComponent(fullUrl)}`}
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-col items-center text-green-500"
					scroll={false}
				>
					<FaWhatsapp size={24} />
					<span className="text-xs mt-1">واتساپ</span>
				</Link>
				<Link
					href={`https://t.me/share/url?url=${encodeURIComponent(fullUrl)}`}
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-col items-center text-blue-500"
					scroll={false}
				>
					<FaTelegram size={24} />
					<span className="text-xs mt-1">تلگرام</span>
				</Link>
				<Link
					href={`https://www.instagram.com/?url=${encodeURIComponent(fullUrl)}`}
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-col items-center text-pink-500"
					scroll={false}
				>
					<FaInstagram size={24} />
					<span className="text-xs mt-1">اینستاگرام</span>
				</Link>
				<Link
					href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}`}
					target="_blank"
					rel="noopener noreferrer"
					className="flex flex-col items-center text-blue-400"
					scroll={false}
				>
					<FaTwitter size={24} />
					<span className="text-xs mt-1">توییتر</span>
				</Link>
			</div>
			<Button
				onClick={handleCopy}
				className="flex items-center justify-center gap-2 font-semibold text-sm text-emerald-500 py-3 w-full border-2 border-emerald-500 rounded-md hover:text-white hover:bg-emerald-500 transition-all"
				disabled={!fullUrl}
			>
				<MdContentCopy size={20} />
				{copied ? "کپی شد!" : "کپی لینک"}
			</Button>
		</div>
	);
};

export default ShareProduct;
