"use client";

import React, { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const Layout = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState<"dark" | "light">("dark");

	useEffect(() => {
		const currentTheme =
			document.documentElement.getAttribute("data-theme") || "dark";
		setTheme(currentTheme as "dark" | "light");
	}, []);

	const handleThemeToggle = () => {
		const html = document.documentElement;
		const currentTheme = html.getAttribute("data-theme");
		const newTheme = currentTheme === "dark" ? "light" : "dark";
		html.setAttribute("data-theme", newTheme);
		setTheme(newTheme as "dark" | "light");
	};

	return (
		<div className='relative'>
			{children}
			<button
				className='fixed bottom-7 right-4 flex items-center gap-2 p-2 bg-white text-background rounded-full toggle cursor-pointer'
				onClick={handleThemeToggle}
				type='button'>
				{theme === "dark" ? <FiSun /> : <FiMoon />}
			</button>
		</div>
	);
};

export default Layout;
