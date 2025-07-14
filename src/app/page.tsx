'use client';

import { motion } from 'framer-motion';
import { CharacterSection } from '@/components/CharacterSection';
import { ConnectionButton } from '@/components/ConnectionButton';
import { EpisodeSection } from '@/components/EpisodeSection';
import { PageHeader } from '@/components/PageHeader';
import { CharactersRepository } from '@/repository/CharactersRepository';
import { useConnectionsStore } from '@/store/connections';
import { useEffect } from 'react';
import {
	pageVariants,
	loadingVariants,
	characterSectionsVariants,
	episodeSectionsVariants
} from './animations';

const charactersRepository = new CharactersRepository();

export default function Home() {
	const {
		charactersDataFirst,
		charactersDataSecond,
		paginationFirst,
		paginationSecond,
		setCharactersDataFirst,
		setCharactersDataSecond,
		setPaginationFirst,
		setPaginationSecond
	} = useConnectionsStore();

	useEffect(() => {
		loadCharacters(1, 'FIRST');
		loadCharacters(1, 'SECOND');
	}, []);

	const loadCharacters = async (page: number, position: 'FIRST' | 'SECOND') => {
		const setPagination = position === 'FIRST' ? setPaginationFirst : setPaginationSecond;
		const setCharactersData =
			position === 'FIRST' ? setCharactersDataFirst : setCharactersDataSecond;

		setPagination({ isLoading: true });

		try {
			const data = await charactersRepository.getCharacters(page);

			setCharactersData(data);
			setPagination({
				currentPage: page,
				totalPages: data.info.pages,
				isLoading: false
			});
		} catch (error) {
			console.error('Error loading characters:', error);
			setPagination({ isLoading: false });
		}
	};

	const handlePageChange = (page: number, position: 'FIRST' | 'SECOND') => {
		loadCharacters(page, position);
	};

	if (!charactersDataFirst || !charactersDataSecond) {
		return (
			<motion.div
				className="flex min-h-[100dvh] items-center justify-center"
				variants={loadingVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="text-center">
					<div className="text-xl font-bold text-[#CAB580]">Loading...</div>
					<div className="text-sm text-neutral-300">
						Fetching Rick and Morty characters
					</div>
				</div>
			</motion.div>
		);
	}

	return (
		<motion.div
			className="max-w-8xl mx-auto flex min-h-[100dvh] flex-col justify-center gap-4 px-8 pt-10"
			variants={pageVariants}
			initial="hidden"
			animate="visible"
		>
			<PageHeader
				title="Find connections"
				description="Click to explore episode connections between characters"
			/>

			<motion.div className="flex gap-2" variants={characterSectionsVariants}>
				<CharacterSection
					characters={charactersDataFirst.results}
					title="CHARACTER #1"
					imageSrc="/assets/table-01.svg"
					imageAlt="table-01"
					positionCharacter="FIRST"
					pagination={paginationFirst}
					onPageChange={(page) => handlePageChange(page, 'FIRST')}
				/>

				<ConnectionButton />

				<CharacterSection
					characters={charactersDataSecond.results}
					title="CHARACTER #2"
					imageSrc="/assets/table-02.svg"
					imageAlt="table-02"
					positionCharacter="SECOND"
					pagination={paginationSecond}
					onPageChange={(page) => handlePageChange(page, 'SECOND')}
				/>
			</motion.div>

			<motion.div className="flex gap-4" variants={episodeSectionsVariants}>
				<EpisodeSection
					imageSrc="/assets/table-03.svg"
					imageAlt="table-03"
					positionCharacter="FIRST"
				/>

				<EpisodeSection
					imageSrc="/assets/table-04.svg"
					imageAlt="table-04"
					positionCharacter="BETWEEN"
				/>

				<EpisodeSection
					imageSrc="/assets/table-05.svg"
					imageAlt="table-05"
					positionCharacter="SECOND"
				/>
			</motion.div>
		</motion.div>
	);
}
