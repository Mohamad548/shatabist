// "use client";
// import MobileDetect from "mobile-detect";
// import { GetServerSidePropsContext } from "next";
// import { useContext, useEffect, useState } from "react";

// import SSRMobileDetection from "@/@core/ssr-mobile-detection-context";

// export const useIsMobile = () => {
// 	const isSsrMobile = useContext(SSRMobileDetection);
// 	const { width: windowWidth } = useWindowSize();
// 	const isBrowserMobile = !!windowWidth && windowWidth < 992;

// 	return isSsrMobile || isBrowserMobile;
// };

// export const getIsSsrMobile = (context: GetServerSidePropsContext) => {
// 	const md = new MobileDetect(context.req.headers["user-agent"] as string);

// 	return Boolean(md.mobile());
// };

// export const useWindowSize = () => {
// 	const [windowSize, setWindowSize] = useState<{
// 		width?: number;
// 		height?: number;
// 	}>({
// 		width: undefined,
// 		height: undefined,
// 	});

// 	useEffect(() => {
// 		function handleResize() {
// 			if (typeof window !== "undefined") {
// 				setWindowSize({
// 					width: window.innerWidth,
// 					height: window.innerHeight,
// 				});
// 			}
// 		}
// 		if (typeof window !== "undefined") {
// 			window.addEventListener("resize", handleResize);
// 			handleResize();
// 			return () => window.removeEventListener("resize", handleResize);
// 		}
// 	}, []);

// 	return windowSize;
// };
