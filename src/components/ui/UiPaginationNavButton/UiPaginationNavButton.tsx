import { helpers } from '@/utils/helpers';

interface UiPaginationNavButtonProps {
	onClick: () => void;
	disabled: boolean;
	direction: 'previous' | 'next';
}

export default function UiPaginationNavButton({
	onClick,
	disabled,
	direction
}: UiPaginationNavButtonProps) {
	const symbol = direction === 'previous' ? '‹' : '›';

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={helpers.cn(
				'flex h-8 w-8 items-center justify-center rounded border border-neutral-700 text-sm font-bold transition-all',
				!disabled
					? 'bg-[#FFEFD8] text-neutral-800 hover:bg-[#FFE0B4] active:scale-95'
					: 'cursor-not-allowed bg-neutral-500 text-neutral-400'
			)}
		>
			{symbol}
		</button>
	);
}
