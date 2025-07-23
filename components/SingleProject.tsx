import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

interface Project {
	id: number;
	slug: string;
	title: string;
	description: string;
	images: string[];
}

interface SingleProjectProps {
	currentProject: Project;
	prevProject?: Project;
	nextProject?: Project;
}

const SingleProject = ({
	currentProject,
	prevProject,
	nextProject,
}: SingleProjectProps) => {
	return (
		<div className='flex flex-col min-h-screen relative w-full'>
			<nav className='flex items-center justify-between w-full lg:w-[70%] xl:w-[50%] mx-auto md:p-4 gap-2 md:gap-7 sticky top-0 z-10 backdrop-blur-lg rounded-full'>
				<Link href={`/projects/${prevProject?.slug || ""}`}>
					<button className='text-sm flex gap-2 items-center bg-white text-black py-2 px-4 rounded-lg shadow-md cursor-pointer'>
						<IoIosArrowRoundBack />
						<span className='hidden md:flex'>Previous</span>
					</button>
				</Link>
				<div className='bg-white rounded-[5px] w-full h-[30px] relative flex overflow-hidden items-center justify-center'>
					<div className='bg-black/30 w-[50%] h-full absolute left-0 top-0'></div>
					<span className='w-full text-center text-black text-xs md:text-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10'>
						{currentProject.title}
					</span>
				</div>
				<Link href={`/projects/${nextProject?.slug || ""}`}>
					<button className='text-sm flex gap-2 items-center bg-white text-black py-2 px-4 rounded-lg shadow-md cursor-pointer'>
						<span className='hidden md:flex'>Next</span>
						<IoIosArrowRoundForward />
					</button>
				</Link>
			</nav>
			<section className='flex flex-col items-center justify-center min-h-screen gap-4 -mt-[100px]'>
				<h1 className='text-[40px] md:text-[7rem] font-bold text-center w-full'>
					{currentProject.title}
				</h1>
				<p className='text-sm md:text-lg text-center'>
					{currentProject.description}
				</p>
			</section>
			<section className='flex flex-wrap items-center justify-center gap-4 py-[4rem]'>
				{currentProject.images.map((image, index) => (
					<div
						className='h-[70vw] md:h-[40vw] w-[40vw] bg-white rounded-[8px] relative overflow-hidden'
						key={index}>
						<Image
							src={image}
							alt=''
							key={index}
							fill
							className='object-cover'
						/>
					</div>
				))}
			</section>
			<section className='flex flex-col items-center justify-center min-h-screen gap-4'>
				<p className='text-sm md:text-lg text-center'>Next Project</p>
				<h1 className='text-[40px] md:text-[7rem] font-bold text-center w-full'>
					{nextProject?.title}
				</h1>
				<div className='bg-white rounded-full w-[60%] mx-auto h-[2px] relative flex overflow-hidden items-center justify-center'>
					<div className='bg-yellow-500 w-[50%] h-full absolute left-0 top-0'></div>
				</div>
			</section>
		</div>
	);
};

export default SingleProject;
