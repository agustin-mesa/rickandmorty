'use client';

import { motion } from 'framer-motion';
import { CharacterList } from '@/components/CharacterList';
import { UiPagination } from '@/components/ui/UiPagination';
import { Character } from '@/repository/CharactersRepository';
import { PaginationInfo } from '@/store/connections';
import {
	characterListVariants,
	paginationVariants
} from '@/components/CharacterSection/animations';

interface CharacterSectionContentProps {
	characters: Character[];
	positionCharacter: 'FIRST' | 'SECOND';
	pagination: PaginationInfo;
	onPageChange: (page: number) => void;
}

export default function CharacterSectionContent({
	characters,
	positionCharacter,
	pagination,
	onPageChange
}: CharacterSectionContentProps) {
	return (
		<>
			<motion.div
				className="z-50 grid max-h-[40vh] grid-cols-2 gap-4 overflow-y-auto px-4 max-xl:grid-cols-1"
				variants={characterListVariants}
			>
				<CharacterList characters={characters} positionCharacter={positionCharacter} />
			</motion.div>

			<motion.div variants={paginationVariants}>
				<UiPagination
					currentPage={pagination.currentPage}
					totalPages={pagination.totalPages}
					onPageChange={onPageChange}
					isLoading={pagination.isLoading}
				/>
			</motion.div>
		</>
	);
}
