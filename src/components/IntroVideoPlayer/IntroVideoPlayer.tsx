'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface IntroVideoPlayerProps {
	children: React.ReactNode;
}

export default function IntroVideoPlayer({ children }: IntroVideoPlayerProps) {
	const [showChildren, setShowChildren] = useState(false);
	const [hideGif, setHideGif] = useState(false);
	const [isGifLoaded, setIsGifLoaded] = useState(false);

	useEffect(() => {
		if (!showChildren && isGifLoaded) {
			setTimeout(() => {
				setShowChildren(true);
				setHideGif(true);
			}, 4500);
		}
	}, [showChildren, isGifLoaded]);

	const handleGifLoad = () => {
		setIsGifLoaded(true);
	};

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
				className="fixed inset-0 z-50 bg-black"
				initial={{ opacity: 1 }}
				animate={{ opacity: hideGif ? 0 : 1 }}
				transition={{
					duration: 0.5,
					ease: 'easeInOut'
				}}
				style={{ pointerEvents: hideGif ? 'none' : 'auto' }}
			>
				<motion.div
					className="h-full w-full"
					initial={{ opacity: 0 }}
					animate={{ opacity: isGifLoaded ? 1 : 0 }}
					transition={{
						duration: 0.8,
						ease: 'easeInOut'
					}}
				>
					<Image
						src="/assets/intro.gif"
						alt="intro"
						className="h-full w-full object-cover"
						width={100}
						height={100}
						draggable={false}
						fetchPriority="high"
						onLoad={handleGifLoad}
					/>
				</motion.div>
			</motion.div>
		</>
	);
}
