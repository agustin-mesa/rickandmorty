'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { CHARACTER_LIST_ANIMATIONS } from '@/components/CharacterList/animations';

interface CharacterListWrapperProps {
	children: ReactNode;
}

export default function CharacterListWrapper({ children }: CharacterListWrapperProps) {
	return (
		<motion.div
			variants={CHARACTER_LIST_ANIMATIONS.characterListVariants}
			initial="hidden"
			animate="visible"
			className="contents"
		>
			{Array.isArray(children) ? (
				children.map((child, index) => (
					<motion.div
						key={index}
						variants={CHARACTER_LIST_ANIMATIONS.characterListItemVariants}
					>
						{child}
					</motion.div>
				))
			) : (
				<motion.div variants={CHARACTER_LIST_ANIMATIONS.characterListItemVariants}>
					{children}
				</motion.div>
			)}
		</motion.div>
	);
}
