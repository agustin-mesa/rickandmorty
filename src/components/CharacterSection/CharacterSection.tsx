import { motion } from 'framer-motion';
import { CharacterList } from '@/components/CharacterList';
import { UiPagination } from '@/components/ui/UiPagination';
import { TableHeader } from '@/components/TableHeader';
import { Character } from '@/repository/CharactersRepository';
import { PaginationInfo } from '@/store/connections';
import { characterListVariants, paginationVariants } from './animations';

interface CharacterSectionProps {
	characters: Character[];
	title: string;
	imageSrc: string;
	imageAlt: string;
	positionCharacter: 'FIRST' | 'SECOND';
	pagination: PaginationInfo;
	onPageChange: (page: number) => void;
}

export default function CharacterSection({
	characters,
	title,
	imageSrc,
	imageAlt,
	positionCharacter,
	pagination,
	onPageChange
}: CharacterSectionProps) {
	return (
		<div className="flex flex-1 flex-col gap-2">
			<TableHeader title={title} imageSrc={imageSrc} imageAlt={imageAlt} />

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
		</div>
	);
}
