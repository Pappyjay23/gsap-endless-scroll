import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import ReactLenis from "lenis/react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Endless Scroll Navigation",
	description: "Endless Scroll Navigation with Dynamic Routing",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' data-theme='dark'>
			<ReactLenis root>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
					<Layout>{children}</Layout>
				</body>
			</ReactLenis>
		</html>
	);
}
