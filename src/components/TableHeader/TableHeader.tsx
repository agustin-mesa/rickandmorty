import { motion } from 'framer-motion';
import { tableHeaderVariants, tableImageVariants, tableTitleVariants } from './animations';

interface TableHeaderProps {
	title: string;
	imageSrc: string;
	imageAlt: string;
}

export default function TableHeader({ title, imageSrc, imageAlt }: TableHeaderProps) {
	return (
		<motion.div
			className="relative flex flex-col items-center justify-center"
			variants={tableHeaderVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.img
				src={imageSrc}
				alt={imageAlt}
				className="pointer-events-none h-full w-full object-cover select-none"
				variants={tableImageVariants}
				whileHover="hover"
			/>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<motion.h1
					className="text-2xl font-bold text-[#CAB580]"
					variants={tableTitleVariants}
				>
					{title}
				</motion.h1>
			</div>
		</motion.div>
	);
}
