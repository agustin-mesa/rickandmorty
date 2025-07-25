'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useConnectionsStore } from '@/store/connections';
import { CONNECTION_BUTTON_ANIMATIONS } from './animations';
import { helpers } from '@/utils/helpers';

interface ConnectionButtonProps {
	className?: string;
}

export default function ConnectionButton({ className }: ConnectionButtonProps) {
	const { charactersSelected, episodesLoading, calculateFilteredEpisodes } =
		useConnectionsStore();

	const bothCharactersSelected = charactersSelected.FIRST && charactersSelected.SECOND;
	const isDisabled = !bothCharactersSelected || episodesLoading;

	const handleConnectionClick = () => {
		if (isDisabled) return;

		calculateFilteredEpisodes();
	};

	return (
		<motion.div
			className={helpers.cn('flex flex-col items-center justify-center gap-2', className)}
			variants={CONNECTION_BUTTON_ANIMATIONS.connectionButtonVariants}
			initial="hidden"
			animate="visible"
			data-testid="connection-button"
		>
			<div className="relative">
				<motion.div
					variants={CONNECTION_BUTTON_ANIMATIONS.buttonImageVariants}
					initial="initial"
					animate={isDisabled ? 'disabled' : 'enabled'}
					onClick={handleConnectionClick}
					data-testid="connection-button-action"
				>
					<Image
						src="/assets/button-plus.svg"
						alt="plus"
						width={80}
						height={80}
						draggable={false}
						className="cursor-pointer select-none"
					/>
				</motion.div>

				<AnimatePresence>
					{episodesLoading && (
						<motion.div
							className="absolute inset-0 flex items-center justify-center"
							variants={CONNECTION_BUTTON_ANIMATIONS.loadingSpinnerVariants}
							initial="initial"
							animate="visible"
							exit="hidden"
						>
							<div className="border-title size-8 animate-spin rounded-full border-b-2"></div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<motion.div
				className="text-center"
				variants={CONNECTION_BUTTON_ANIMATIONS.buttonTextVariants}
				initial="initial"
				animate={episodesLoading ? 'loading' : 'visible'}
				data-testid="connection-button-text"
			>
				<motion.div
					className="text-xs text-neutral-400"
					variants={
						bothCharactersSelected ? CONNECTION_BUTTON_ANIMATIONS.pulseVariants : {}
					}
					animate={bothCharactersSelected && !episodesLoading ? 'pulse' : 'initial'}
				>
					{!bothCharactersSelected
						? 'Select both characters'
						: episodesLoading
							? 'Finding connections...'
							: 'Find connections'}
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
