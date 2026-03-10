import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/pagination";

import React from "react";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { Providers } from "@/src/app/_providers/Providers";
import "@/src/shared/styles/reset.scss";
import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";

import "./globals.scss";

const montserrat = localFont({
	src: [
		{
			path: "../../public/fonts/Montserrat-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/Montserrat-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/Montserrat-SemiBold.ttf",
			weight: "600",
			style: "normal",
		},
	],
	variable: "--font-montserrat",
});

export const metadata: Metadata = {
	title: "Тайтл лайоут",
	description: "Дескрипшн лайоут",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="ru" className={montserrat.variable}>
			<body>
				<Providers>
					<Header />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
