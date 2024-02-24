import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

const courierPrime = localFont({
	src: [
		{
			path: './Courier_Prime/CourierPrime-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: './Courier_Prime/CourierPrime-BoldItalic.ttf',
			weight: '700',
			style: 'italic',
		},
		{
			path: './Courier_Prime/CourierPrime-Italic.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: './Courier_Prime/CourierPrime-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
	],
})

export const metadata: Metadata = {
	title: "Typeometer",
	description: "Find out your typing speed and accuracy!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={courierPrime.className}>{children}</body>
		</html>
	);
}