'use client';

import { motion } from 'framer-motion';
import { CharacterSection } from '@/components/CharacterSection';
import { ConnectionButton } from '@/components/ConnectionButton';
import { EpisodeSection } from '@/components/EpisodeSection';
import { CharactersRepository, CharactersResponse } from '@/repository/CharactersRepository';
import { useConnectionsStore } from '@/store/connections';
import { useEffect } from 'react';
import { pageVariants, characterSectionsVariants, episodeSectionsVariants } from '@/app/animations';

interface MainWrapperProps {
	initialCharactersFirst: CharactersResponse;
	initialCharactersSecond: CharactersResponse;
}

const charactersRepository = new CharactersRepository();

export default function MainWrapper({
	initialCharactersFirst,
	initialCharactersSecond
}: MainWrapperProps) {
	const {
		charactersDataFirst,
		charactersDataSecond,
		paginationFirst,
		paginationSecond,
		filteredEpisodes,
		setCharactersDataFirst,
		setCharactersDataSecond,
		setPaginationFirst,
		setPaginationSecond
	} = useConnectionsStore();

	useEffect(() => {
		if (initialCharactersFirst && !charactersDataFirst) {
			setCharactersDataFirst(initialCharactersFirst);
			setPaginationFirst({
				currentPage: 1,
				totalPages: initialCharactersFirst.info.pages,
				isLoading: false
			});
		}

		if (initialCharactersSecond && !charactersDataSecond) {
			setCharactersDataSecond(initialCharactersSecond);
			setPaginationSecond({
				currentPage: 1,
				totalPages: initialCharactersSecond.info.pages,
				isLoading: false
			});
		}
	}, [initialCharactersFirst, initialCharactersSecond]);

	const loadCharacters = async (page: number, position: 'FIRST' | 'SECOND') => {
		const setPagination = position === 'FIRST' ? setPaginationFirst : setPaginationSecond;
		const setCharactersData =
			position === 'FIRST' ? setCharactersDataFirst : setCharactersDataSecond;

		setPagination({ isLoading: true });

		try {
			const data = await charactersRepository.getCharacters({ page });

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

	const hasSearchResults =
		filteredEpisodes.firstCharacterOnly.length > 0 ||
		filteredEpisodes.secondCharacterOnly.length > 0 ||
		filteredEpisodes.shared.length > 0;

	const charactersFirst = charactersDataFirst || initialCharactersFirst;
	const charactersSecond = charactersDataSecond || initialCharactersSecond;

	if (!charactersFirst || !charactersSecond) {
		return (
			<div className="flex min-h-[50vh] items-center justify-center">
				<div className="text-center">
					<div className="text-title text-xl font-bold">Loading...</div>
					<div className="text-sm text-neutral-300">
						Fetching Rick and Morty characters
					</div>
				</div>
			</div>
		);
	}

	return (
		<motion.div className="contents" variants={pageVariants} initial="hidden" animate="visible">
			<motion.div className="flex gap-2 max-md:flex-col" variants={characterSectionsVariants}>
				<CharacterSection
					characters={charactersFirst.results}
					title="CHARACTER #1"
					imageSrc="/assets/table-01.svg"
					imageAlt="table-01"
					positionCharacter="FIRST"
					pagination={paginationFirst}
					onPageChange={(page) => handlePageChange(page, 'FIRST')}
				/>

				<ConnectionButton className="max-md:hidden" />

				<CharacterSection
					characters={charactersSecond.results}
					title="CHARACTER #2"
					imageSrc="/assets/table-02.svg"
					imageAlt="table-02"
					positionCharacter="SECOND"
					pagination={paginationSecond}
					onPageChange={(page) => handlePageChange(page, 'SECOND')}
				/>

				<ConnectionButton className="hidden max-md:flex" />
			</motion.div>

			{hasSearchResults && (
				<motion.div
					className="flex gap-4 max-md:flex-col"
					variants={episodeSectionsVariants}
				>
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
			)}
		</motion.div>
	);
}
