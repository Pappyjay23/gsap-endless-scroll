"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

const Home = () => {
	useGSAP(() => {
		const image = document.querySelector("#home .logo");
		const description = document.querySelector("#home p");
		const button = document.querySelector("#home button");

		gsap.fromTo(
			image,
			{
				opacity: 0,
				scale: 0.1,
			},
			{
				opacity: 1,
				scale: 1,
				duration: 1,
				ease: "power4.inOut",
			}
		);
		gsap.fromTo(
			description,
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 1,
				delay: 0.5,
				ease: "power4.inOut",
			}
		);
		gsap.fromTo(
			button,
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 1,
				delay: 0.5,
				ease: "power4.inOut",
			}
		);
	});
	return (
		<div
			id='home'
			className='flex flex-col items-center justify-center min-h-screen p-4 gap-4'>
			<Image
				className='logo opacity-0'
				src='/next.svg'
				alt='Next.js logo'
				width={180}
				height={38}
				priority
			/>

			<p className='opacity-0'>Check out some of our projects</p>

			<Link href='/projects'>
				<button className='flex gap-2 items-center bg-white text-black py-2 px-4 rounded-lg shadow-md cursor-pointer opacity-0'>
					Projects <MdOutlineArrowOutward />
				</button>
			</Link>
		</div>
	);
};

export default Home;
