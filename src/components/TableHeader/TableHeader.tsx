interface TableHeaderProps {
	title: string;
	imageSrc: string;
	imageAlt: string;
}

export default function TableHeader({ title, imageSrc, imageAlt }: TableHeaderProps) {
	return (
		<div className="relative flex flex-col items-center justify-center">
			<img
				src={imageSrc}
				alt={imageAlt}
				className="pointer-events-none h-full w-full object-cover select-none"
			/>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<h1 className="text-title text-2xl font-bold max-md:text-xl">{title}</h1>
			</div>
		</div>
	);
}
