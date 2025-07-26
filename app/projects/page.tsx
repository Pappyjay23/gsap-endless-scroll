"use client";

import { projects } from "@/data/projects";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const Projects = () => {
	useGSAP(() => {
		const title = document.querySelector("#projects h1");
		const links = document.querySelectorAll("#projects .project-link");

		gsap.fromTo(
			title,
			{
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 1,
				ease: "power4.inOut",
			}
		);

		gsap.to(links, {
			opacity: 1,
			y: 0,
			duration: 1.3,
			delay: 0.5,
			ease: "power4.inOut",
			stagger: 0.075,
		});
	});
	return (
		<div
			id='projects'
			className='flex flex-col items-center justify-center min-h-screen p-4 gap-4'>
			<h1 className='text-2xl font-bold my-8'>Projects</h1>
			<div className='flex flex-col gap-3 items-start'>
				{projects.map((project) => (
					<div key={project.id} className='w-full overflow-hidden'>
						<Link
							href={`/projects/${project.slug}`}
							className='project-link flex items-center gap-2 p-4 bg-white rounded-[10px] transition-all duration-300 ease-in-out translate-y-full'>
							<IoIosArrowRoundForward />
							<span>{project.title}</span>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Projects;
