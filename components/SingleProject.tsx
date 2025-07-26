import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
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
	const isTransitioning = useRef(false);
	const updateFooterProgress = useRef(false);
	const router = useRouter();

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);

		const nav = document.querySelector(".nav");
		const navProgressBar = document.querySelector(".nav-progress-bar");
		const heroDescription = document.querySelector(".hero-description");
		const footer = document.querySelector(".footer");
		const footerDescription = document.querySelector(".footer-description");
		const footerProgressBar = document.querySelector(".footer-progress-bar");
		const footerProgressBarContainer = document.querySelector(
			".footer-progress-bar-container"
		);

		gsap.set(nav, {
			y: -100,
			opacity: 0,
		});

		gsap.to(nav, {
			y: 0,
			opacity: 1,
			duration: 1,
			delay: 1,
			ease: "power2.out",
		});

		const navScrollTrigger = ScrollTrigger.create({
			trigger: document.body,
			start: "top top",
			end: "bottom bottom",
			onUpdate: (self) => {
				if (navProgressBar) {
					gsap.set(navProgressBar, {
						width: `${self.progress * 100}%`,
					});
				}
			},
		});

		gsap.set(heroDescription, {
			opacity: 0,
		});

		gsap.to(heroDescription, {
			opacity: 1,
			duration: 1,
			delay: 1,
			ease: "power2.out",
		});

		const footerScrollTrigger = ScrollTrigger.create({
			trigger: footer,
			start: "top top",
			end: `+=${window.innerHeight * 3}px`,
			pin: true,
			pinSpacing: true,
			onEnter: () => {
				updateFooterProgress.current = true;
				if (nav && !isTransitioning.current) {
					gsap.to(nav, {
						y: -100,
						opacity: 0,
						duration: 0.5,
						ease: "power2.in",
					});
				}
			},
			onLeaveBack: () => {
				if (nav && !isTransitioning.current) {
					gsap.to(nav, {
						y: 0,
						opacity: 1,
						duration: 0.5,
						ease: "power2.out",
					});
				}
			},
			onUpdate: (self) => {
				if (footerProgressBar && updateFooterProgress.current) {
					gsap.set(footerProgressBar, {
						scaleX: self.progress,
					});
				}

				if (self.progress >= 1 && !isTransitioning.current) {
					isTransitioning.current = true;
					updateFooterProgress.current = false;

					const tl = gsap.timeline();
					tl.set(footerProgressBar, {
						scaleX: 1,
					});

					tl.to(
						[footerProgressBarContainer, footerProgressBar, footerDescription],
						{
							opacity: 0,
							duration: 0.5,
							ease: "power2.inOut",
						}
					);

					tl.call(() => {
						router.push(`/projects/${nextProject?.slug || ""}`);
					});
				}
			},
		});

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<div className='flex flex-col items-center min-h-screen relative w-full'>
			<nav className='nav flex items-center justify-between w-full lg:w-[70%] xl:w-[50%] mx-auto md:p-4 gap-2 md:gap-7 fixed top-5 z-10 backdrop-blur-lg rounded-full'>
				<Link href={`/projects/${prevProject?.slug || ""}`}>
					<button className='text-sm flex gap-2 items-center bg-white text-black py-2 px-4 rounded-lg shadow-md cursor-pointer'>
						<IoIosArrowRoundBack />
						<span className='hidden md:flex'>Previous</span>
					</button>
				</Link>
				<div className='bg-white rounded-[5px] w-full h-[30px] relative flex overflow-hidden items-center justify-center'>
					<div className='nav-progress-bar bg-black/30 h-full absolute left-0 top-0'></div>
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
			<section className='flex flex-col items-center justify-center min-h-screen gap-4'>
				<p className='text-sm md:text-lg text-center opacity-0'>
					Current Project
				</p>
				<h1 className='text-[40px] md:text-[7rem] font-bold text-center w-full'>
					{currentProject.title}
				</h1>
				<p className='text-sm md:text-lg text-center hero-description'>
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
			<section className='footer flex flex-col items-center justify-center min-h-screen gap-4 w-full'>
				<p className='text-sm md:text-lg text-center footer-description'>
					Next Project
				</p>
				<h1 className='text-[40px] md:text-[7rem] font-bold text-center w-full'>
					{nextProject?.title}
				</h1>
				<div className='footer-progress-bar-container bg-white rounded-full w-[60%] mx-auto h-[2px] relative flex overflow-hidden items-center justify-center'>
					<div className='footer-progress-bar bg-yellow-500 w-full h-full absolute left-1/2 top-0 -translate-x-1/2 scale-x-0 origin-center'></div>
				</div>
			</section>
		</div>
	);
};

export default SingleProject;
