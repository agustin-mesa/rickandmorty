'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface DefaultLayoutProps {
	children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [showChildren, setShowChildren] = useState(false);
	const [hideVideo, setHideVideo] = useState(false);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		video.volume = 0.3;

		const handleTimeUpdate = () => {
			const currentTime = video.currentTime;

			if (currentTime >= 4 && !showChildren) {
				setShowChildren(true);

				setTimeout(() => {
					setHideVideo(true);
				}, 800);
			}
		};

		video.addEventListener('timeupdate', handleTimeUpdate);

		return () => {
			video.removeEventListener('timeupdate', handleTimeUpdate);
		};
	}, [showChildren]);

	return (
		<>
			<img
				src="/assets/column.svg"
				alt="column-left"
				className="pointer-events-none fixed left-0 z-50 h-full object-cover select-none"
			/>
			<Image
				src="/assets/detail-01.svg"
				alt="detail-01"
				width={100}
				height={100}
				draggable={false}
				className="absolute top-4 left-0 z-40 select-none"
			/>
			<div className="fixed top-0 bottom-0 left-0 flex">
				<div className="h-full w-10 bg-neutral-700"></div>
				<div className="h-full w-6 bg-green-100/10"></div>
			</div>
			<header className="bg-header absolute inset-x-0 top-0 z-10 flex h-14 items-center justify-center">
				<Image
					src="/assets/brand/logo.svg"
					alt="logo"
					width={35}
					height={35}
					draggable={false}
					className="select-none"
				/>
			</header>
			<Image
				src="/assets/detail-02.svg"
				alt="detail-02"
				width={100}
				height={100}
				draggable={false}
				className="absolute top-4 right-0 z-40 select-none"
			/>

			<Image
				src="/assets/detail-04.svg"
				alt="detail-04"
				width={30}
				height={30}
				draggable={false}
				className="absolute top-5 right-24 z-20 select-none"
			/>
			<Image
				src="/assets/detail-03.svg"
				alt="detail-03"
				width={100}
				height={100}
				draggable={false}
				className="absolute top-0 right-0 z-10 select-none"
			/>
			<div className="fixed top-0 right-0 bottom-0 flex items-end justify-end">
				<div className="h-full w-6 bg-green-100/10"></div>
				<div className="h-full w-10 bg-neutral-700"></div>
			</div>
			<img
				src="/assets/column.svg"
				alt="column-right"
				className="pointer-events-none fixed right-0 z-30 h-full object-cover select-none"
			/>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: showChildren ? 1 : 0 }}
				transition={{
					duration: 0.8,
					ease: 'easeInOut',
					delay: showChildren ? 0.2 : 0
				}}
				className="relative z-40"
			>
				{children}
			</motion.div>

			<motion.div
				className="fixed inset-0 z-50"
				initial={{ opacity: 1 }}
				animate={{ opacity: hideVideo ? 0 : 1 }}
				transition={{
					duration: 0.5,
					ease: 'easeInOut'
				}}
				style={{ pointerEvents: hideVideo ? 'none' : 'auto' }}
			>
				<video
					ref={videoRef}
					src="/assets/videos/intro.mp4"
					className="h-full w-full object-cover"
					autoPlay
					playsInline
				/>
			</motion.div>
		</>
	);
}
