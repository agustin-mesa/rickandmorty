'use client';

import Image from 'next/image';
import { useConnectionsStore } from '@/store/connections';

export default function ConnectionButton() {
	const { charactersSelected, episodesLoading, calculateFilteredEpisodes } =
		useConnectionsStore();

	const bothCharactersSelected = charactersSelected.FIRST && charactersSelected.SECOND;
	const isDisabled = !bothCharactersSelected || episodesLoading;

	const handleConnectionClick = () => {
		if (isDisabled) return;

		calculateFilteredEpisodes();
	};

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<div className="relative">
				<Image
					src="/assets/button-plus.svg"
					alt="plus"
					width={80}
					height={80}
					draggable={false}
					className={`transition-all duration-300 select-none ${
						isDisabled
							? 'cursor-not-allowed opacity-50 grayscale'
							: 'cursor-pointer hover:scale-105 hover:brightness-95 active:scale-95'
					} `}
					onClick={handleConnectionClick}
				/>

				{episodesLoading && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#CAB580]"></div>
					</div>
				)}
			</div>

			<div className="text-center">
				<div className="text-xs text-neutral-400">
					{!bothCharactersSelected
						? 'Select both characters'
						: episodesLoading
							? 'Finding connections...'
							: 'Find connections'}
				</div>
			</div>
		</div>
	);
}
