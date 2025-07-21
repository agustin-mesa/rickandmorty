import { helpers } from '@/utils/helpers';
import Image from 'next/image';

interface TableHeaderProps {
	title: string;
	imageSrc: string;
	imageAlt: string;
	onFiltersClick?: () => void;
	hasActiveFilters?: boolean;
}

export default function TableHeader({
	title,
	imageSrc,
	imageAlt,
	onFiltersClick,
	hasActiveFilters = false
}: TableHeaderProps) {
	return (
		<div className="relative flex flex-col items-center justify-center">
			<img
				src={imageSrc}
				alt={imageAlt}
				className="pointer-events-none size-full object-cover select-none"
			/>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<h1 className="text-title text-2xl font-bold max-md:text-xl">{title}</h1>
			</div>

			{onFiltersClick && (
				<button
					onClick={onFiltersClick}
					className={helpers.cn(
						'absolute top-2 right-2 flex size-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 hover:scale-105 max-md:size-4'
					)}
					title="Toggle Filters"
				>
					<Image src="/assets/icons/filter.svg" alt="filter" width={20} height={20} />
					{hasActiveFilters && (
						<div className="bg-accent-secondary absolute -top-1 -right-1 size-3 rounded-full">
							<div className="bg-accent-secondary size-full animate-pulse rounded-full"></div>
						</div>
					)}
				</button>
			)}
		</div>
	);
}
