"use client";

import { useParams } from "next/navigation";
import React from "react";
import SingleProject from "@/components/SingleProject";
import { projects } from "@/data/projects";

const Project = () => {
	const params = useParams<{ slug: string }>();

	const currentProject = projects.find(
		(project) => project.slug === params.slug
	);

	if (!currentProject) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen p-4 gap-4'>
				Project not found
			</div>
		);
	}

	const currentIndex = projects.findIndex(
		(project) => project.slug === params.slug
	);
	const nextIndex = (currentIndex + 1) % projects.length;
	const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

	const nextProject = projects[nextIndex];
	const prevProject = projects[prevIndex];

	return (
		<div className='flex flex-col items-center justify-center min-h-screen p-4 gap-4'>
			<SingleProject
				currentProject={currentProject}
				prevProject={prevProject}
				nextProject={nextProject}
			/>
		</div>
	);
};

export default Project;
