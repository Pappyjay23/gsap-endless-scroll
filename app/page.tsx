import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

const Home = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4 gap-4'>
			<Image
				className='dark:invert'
				src='/next.svg'
				alt='Next.js logo'
				width={180}
				height={38}
				priority
			/>

			<p>Check out some of our projects</p>

			<Link href="/projects">
				<button className='flex gap-2 items-center bg-white text-black py-2 px-4 rounded-lg shadow-md cursor-pointer'>
					Projects <MdOutlineArrowOutward />
				</button>
			</Link>
		</div>
	);
};

export default Home;
