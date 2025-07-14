'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface IntroVideoPlayerProps {
	children: React.ReactNode;
}

export default function IntroVideoPlayer({ children }: IntroVideoPlayerProps) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [showChildren, setShowChildren] = useState(false);
	const [hideGif, setHideGif] = useState(false);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.3;
		}
	}, []);

	useEffect(() => {
		if (!showChildren) {
			setTimeout(() => {
				setShowChildren(true);
				setHideGif(true);
			}, 4500);
		}
	}, [showChildren]);

	return (
		<>
			{showChildren && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						duration: 0.8,
						ease: 'easeInOut',
						delay: 0.2
					}}
					className="relative z-40"
				>
					{children}
				</motion.div>
			)}

			<motion.div
				className="fixed inset-0 z-50"
				initial={{ opacity: 1 }}
				animate={{ opacity: hideGif ? 0 : 1 }}
				transition={{
					duration: 0.5,
					ease: 'easeInOut'
				}}
				style={{ pointerEvents: hideGif ? 'none' : 'auto' }}
			>
				<Image
					src="/assets/intro.gif"
					alt="intro"
					className="h-full w-full object-cover"
					width={100}
					height={100}
					draggable={false}
					fetchPriority="high"
				/>
			</motion.div>
			<audio ref={audioRef} src="/sounds/intro-music.mp3" autoPlay />
		</>
	);
}
