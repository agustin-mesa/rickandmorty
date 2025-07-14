import { helpers } from '@/utils/helpers';
import Image from 'next/image';

interface CharacterImageProps {
	className?: string;
	src: string;
	alt: string;
	size?: number;
}

export default function CharacterImage({ src, alt, className, size = 40 }: CharacterImageProps) {
	return (
		<div
			className={helpers.cn(
				'relative z-10 border border-neutral-700 bg-neutral-200 p-1 pb-4',
				className
			)}
		>
			<Image
				src={src}
				alt={alt}
				width={size}
				height={size}
				draggable={false}
				className="border border-neutral-700 select-none max-xl:!h-14 max-xl:!w-14"
			/>
		</div>
	);
}
