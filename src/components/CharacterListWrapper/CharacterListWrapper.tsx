'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import {
	characterListVariants,
	characterListItemVariants
} from '@/components/CharacterList/animations';

interface CharacterListWrapperProps {
	children: ReactNode;
}

export default function CharacterListWrapper({ children }: CharacterListWrapperProps) {
	return (
		<motion.div
			variants={characterListVariants}
			initial="hidden"
			animate="visible"
			className="contents"
		>
			{Array.isArray(children) ? (
				children.map((child, index) => (
					<motion.div key={index} variants={characterListItemVariants}>
						{child}
					</motion.div>
				))
			) : (
				<motion.div variants={characterListItemVariants}>{children}</motion.div>
			)}
		</motion.div>
	);
}
