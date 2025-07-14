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
				'flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-neutral-700 text-sm font-bold transition-all',
				!disabled
					? 'bg-card hover:bg-card-hover text-neutral-800 active:scale-95'
					: 'cursor-not-allowed bg-neutral-500 text-neutral-400'
			)}
		>
			<span
				className={helpers.cn('transition-all', {
					'hover:rotate-180': direction === 'previous',
					'hover:rotate-0': direction === 'next',
					'cursor-not-allowed': disabled
				})}
			>
				{symbol}
			</span>
		</button>
	);
}
