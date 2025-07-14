import { motion } from 'framer-motion';
import { pageHeaderVariants, titleVariants, descriptionVariants } from './animations';

interface PageHeaderProps {
	title: string;
	description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
	return (
		<motion.div
			className="flex flex-col justify-center"
			variants={pageHeaderVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.h1
				className="text-center text-xl font-bold text-[#CAB580]"
				variants={titleVariants}
			>
				{title}
			</motion.h1>
			<motion.p
				className="text-center text-sm text-neutral-300"
				variants={descriptionVariants}
			>
				{description}
			</motion.p>
		</motion.div>
	);
}
